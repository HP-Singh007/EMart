import React, { useContext, useEffect, useRef, useState } from 'react'
import {Context,server} from '../index'
import '../styles/Payment.css'
import Navbar2 from '../components/Product Grid/Navbar2'
import ComponentStepper from '../components/Order/ComponentStepper'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe,  useElements } from '@stripe/react-stripe-js'
import { CalendarDays, CreditCardIcon } from 'lucide-react'
import { VpnKey } from '@mui/icons-material'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const {user} = useContext(Context);
  const [paymentData,setPaymentData]= useState({});
  const [shippingInfo,setShippingInfo]= useState({});
  const [cartInfo,setCartInfo]= useState({});
  const [orderItems,setOrderItems]= useState({});
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const order = {
      shippingInfo:{
          address:shippingInfo.address,
          pinCode:shippingInfo.pin,
          city:shippingInfo.city,
          state:shippingInfo.state,
          country:shippingInfo.country,
          phoneNo:shippingInfo.phone
      },
      orderItems,
      price:{
        itemPrice:paymentData.priceAfterDiscount,
        tax:paymentData.gst,
        shippingCost:paymentData.shippingCost,
        totalPrice:paymentData.priceAfterDiscount+paymentData.gst+paymentData.shippingCost
      }
  }


  const placeOrder=async()=>{
    try{
      if(orderItems.length){
        const {data} = await axios.post(`${server}/orders/new`,order,{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        })
  
        toast.success(data.message);
        console.log(data);
  
      }
    }
    catch(err){
      console.log(err.response.data.message);
    }
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    payBtn.current.disabled = true;

    const paymentInfo = {
      amount:paymentData.netAmount*100,
      name:user.name,
      shippingInfo
    }
    
    try{
      const {data} = await axios.post(`${server}/payment/process`,paymentInfo,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })

      const client_secret = data.client_secret;

      if(!stripe || !elements){return;}

      const result = await stripe.confirmCardPayment(client_secret,{
        payment_method:{
          card:elements.getElement(CardNumberElement),
          billing_details:{
            name:user.name,
            email:user.email,
            address:{
              line1:shippingInfo.address,
              city:shippingInfo.city,
              state:shippingInfo.state,
              postal_code:shippingInfo.pin,
              country:shippingInfo.country
            }
          }
        }
      })

      if(result.error){
        payBtn.current.disabled = false;
        toast.error(result.error.message);
        console.log(result.error.message)
      }
      else{
        if(result.paymentIntent.status === "succeeded"){
          order.paymentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status
          }

          placeOrder();
          navigate('/payment/success');
        }
        else{
          payBtn.current.disabled = false;
          toast.error("There is some error while processing payment");
        }
      }

    }
    catch(error){
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  }

  useEffect(()=>{
    let payData = {};
    if(sessionStorage.getItem("paymentInfo")){
      payData = JSON.parse(sessionStorage.getItem("paymentInfo"));
      setPaymentData(payData);
    }

    if(localStorage.getItem("ShippingInfo")){
      setShippingInfo(JSON.parse(localStorage.getItem("ShippingInfo")));
    }

    let cartItems = [];
    if(localStorage.getItem("cartItems")){
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
      setCartInfo(cartItems);
      
      const cart=[];
      cartItems.map((item)=>{
        const cartItem = {
          productId:item.id,
          name:item.name,
          price:Math.round(item.price - item.discount*item.price/100 + payData.gst/item.quantity),
          quantity:item.quantity
        }
        cartItem.price && cart.push(cartItem);
      })
      setOrderItems(cart);
    }
    
  },[])

  return (
    <>
      <Navbar2/>
      <div id='paymentPage'>
        <ComponentStepper activeStep={2}/>
        <form onSubmit={(e)=>submitHandler(e)}>
          <p className='largeFont'>Payment</p>
          <div>
            <CreditCardIcon/>
            <CardNumberElement className='paymentInfo'/>
          </div>
          <div>
            <CalendarDays />
            <CardExpiryElement className='paymentInfo'/>
          </div>
          <div>
            <VpnKey/>
            <CardCvcElement className='paymentInfo'/>
          </div>
          <input ref={payBtn} type="submit" value={`Pay ₹${paymentData.netAmount}`} />
        </form>
      </div>
    </>
  )
}

export default Payment
