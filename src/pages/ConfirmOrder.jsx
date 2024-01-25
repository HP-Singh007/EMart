import React, { useContext, useEffect, useState } from 'react'
import Navbar2 from '../components/Product Grid/Navbar2'
import '../styles/ConfirmOrder.css'
import ComponentStepper from '../components/Order/ComponentStepper'
import { calculatePrice } from '../App'
import {Context} from '../index'
import { Link } from 'react-router-dom'
import OrderItem from '../components/Order/OrderItem'

const ConfirmOrder = () => {
    const {user} = useContext(Context);
    const [shippingInfo,setShippingInfo] = useState({});
    const [cartInfo,setCartInfo] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [priceAfterDiscount,setPriceAfterDiscount] = useState(0);
    const [saved,setSaved] = useState(0);
    const [gst,setGst] = useState(0);
    const [shippingCost,setShippingCost] = useState(0);

    const paymentHandler=()=>{
      const data={
        totalPrice,
        priceAfterDiscount,
        saved,
        gst,
        shippingCost,
        netAmount:priceAfterDiscount+gst+shippingCost
      }
      sessionStorage.setItem("paymentInfo",JSON.stringify(data));
    }

    useEffect(()=>{
        setShippingInfo(localStorage.getItem("ShippingInfo")?(
            JSON.parse(localStorage.getItem("ShippingInfo"))
        ):{})    
        let cart = [];
        if(localStorage.getItem("cartItems"))  {
          cart =JSON.parse(localStorage.getItem("cartItems"));
        }  
        setCartInfo(cart);
        let total = 0;
        let totalSaved=0;
        cart.map((item)=>{
            let discountedPrice = calculatePrice(item.price,item.discount);
            total+= discountedPrice*item.quantity;
            totalSaved+= (item.price - discountedPrice)*item.quantity;
        })
        setPriceAfterDiscount(total);
        setSaved(totalSaved);
        setTotalPrice(total+totalSaved);
        setGst(Math.round(total*10/100));
        setShippingCost(30);
    },[])

  return (
    <>
      <Navbar2/>
      <div id="confirmOrderPage">
        <ComponentStepper activeStep={1}/>
        <div id="confirmOrderMid">
          <div id='confirmOrderLeft'>
              <div>
                  <p className='headingFont'>Shipping Info</p>
                  <p><b>NAME : </b>{user.name}</p>
                  <p><b>PHONE : </b>{shippingInfo.phone}</p>
                  <p><b>ADDRESS : </b>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`}</p>
              </div>
              <div id="confirmOrderCartInfo">
                <p className='headingFont'>Order Items</p>
                {
                  cartInfo.map((item)=>{
                    return <OrderItem {...item}/>
                  })
                }
              </div>
          </div>
          <div id='confirmOrderRight'>
            <p className='headingFont'>ORDER SUMMARY</p>
            <table>
              <tr>
                <td><b>No. of Products : </b></td>
                <td>{cartInfo.length}</td>
              </tr>
              <tr>
                <td><b>Total Price : </b></td>
                <td>&#8377;{totalPrice}</td>
              </tr>
              <tr>
                <td><b>Shipping Charges : </b></td>
                <td>&#8377;{shippingCost}</td>
              </tr>
              <tr>
                <td><b>GST : </b></td>
                <td>&#8377;{gst}</td>
              </tr>
              <tr id='totalRow'>
                <td><b>Subtotal : </b></td>
                <td>&#8377;{totalPrice+shippingCost+gst}</td>
              </tr>
              <tr>
                <td><b>Total Savings : </b></td>
                <td>-&#8377;{saved}</td>
              </tr>
              <tr id='totalRow'>
                <td><b>Net Amount : </b></td>
                <td>&#8377;{priceAfterDiscount+shippingCost+gst}</td>
              </tr>
            </table>
            <Link to='/order/payment' onClick={paymentHandler}>Proceed To payment</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder
