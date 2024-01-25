import React from 'react'
import '../styles/OrderSuccess.css'
import Navbar2 from '../components/Product Grid/Navbar2'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const OrderSuccess = () => {
  return (
    <>
      <Navbar2/>
      <div id="orderSuccessPage">
        <CheckCircle color='teal' size={70} />
        <p>YOUR ORDER PLACED SUCCESSFULLY &#128522;</p>
        <Link to='/orders'>View Orders</Link>
      </div>
    </>
  )
}

export default OrderSuccess
