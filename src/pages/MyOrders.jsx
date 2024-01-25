import React, { useEffect, useState } from 'react'
import {server} from '../index'
import Navbar2 from '../components/Product Grid/Navbar2'
import '../styles/MyOrders.css'
import Heading from '../components/Product Grid/Heading'
import Collapsible from 'react-collapsible';
import MyOrderCollapsible from '../components/Order/MyOrderCollapsible';
import axios from 'axios';
import { Link } from 'react-router-dom'

const MyOrders = () => {

  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    axios.get(`${server}/orders/me/all`,{
      withCredentials:true
    })
    .then((res)=>{
      setOrders(res.data.orders);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])

  return (
    <>
      <Navbar2/>
      <div id="myOrdersPage">
        <Heading heading={"My Orders"}/>
        {orders.length>0?(
          <>
            <div id="orderHeading">
              <div className='orderId'>Order ID</div>
              <div className='orderRest'>Item Qty</div>
              <div className='orderRest'>Payment Status</div>
              <div className='orderRest'>Order Status</div>
              <div className='orderRest'>Amount</div>
              <span>&nbsp;&nbsp;&nbsp;</span>
            </div>

            {
              orders && orders.map((item)=>{
                return(
                  <Collapsible trigger={<MyOrderCollapsible {...item}/>}>
                    <div id='orderCollapse'>
                      <div id='orderCollapseLeft'>
                        {
                          item.orderItems && item.orderItems.map((product)=>{
                            return(
                            <div id="orderCollapseProduct">
                              <div>{product.productId}</div>
                              <span>{product.name}</span>
                              <p>{product.quantity}N X {product.price}</p>
                              <p>= &#8377;{product.quantity*product.price}</p>
                            </div>
                            )
                          })
                        }
                      </div>
                      <div id='orderCollapseRight'>
                        <p>
                          <b>Address: </b>{item.shippingInfo.address}, {item.shippingInfo.city}, {item.shippingInfo.state} , {item.shippingInfo.country}
                        </p>
                        <p><b>Phone : </b>{item.shippingInfo.phoneNo}</p>
                        <p><b>Paid On : </b>{new Date(item.paidAt).toLocaleDateString('en-GB')}</p>
                        {
                          (item.deliveredAt)?(
                            <p><b>Delivered On : </b>{new Date(item.deliveredAt).toLocaleDateString('en-GB')}</p>
                          ):<></>
                        }
                      </div>
                    </div>
                  </Collapsible>
                )
              })
            }
          </>
        ):(
        <div id='emptyCart'>
          <span class="material-symbols-outlined">
              shopping_cart_off
          </span>
          <p>No Order Placed Yet</p>
          <Link to='/products'>View Products</Link>
      </div>
        )
      }
      </div>
    </>
  )
}

export default MyOrders
