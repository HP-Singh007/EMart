import React from 'react'
import '../../styles/MyOrders.css'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

const MyOrderCollapsible = (props) => {
  return (
    <div id="orderRoot">
    <div className='orderId'>{props._id}</div>
    <div className='orderRest'>{props.orderItems.length}</div>
    <div className={`orderRest ${props.paymentInfo.status}`}>{props.paymentInfo.status}</div>
    <div className={`orderRest ${props.orderStatus}`}>{props.orderStatus}</div>
    <div className='orderRest'>&#8377;{props.price.totalPrice}</div>
    <div className='orderArrow'><ExpandMoreOutlinedIcon/></div>
    </div>
)
}

export default MyOrderCollapsible
