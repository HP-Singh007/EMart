import React, { useEffect, useState } from 'react'
import imagePlaceholder from '../../images/imagePlaceholder.jpg'
import { calculatePrice } from '../../App'
import '../../styles/OrderItem.css'

const OrderItem = (props) => {
    const [discountPrice,setDiscountPrice] = useState(0);

    useEffect(()=>{
        let disc = calculatePrice(props.price,props.discount);
        setDiscountPrice(disc);
    },[])
  return (
    <div id='orderItem'>
        <div id='orderItemImg'>
            {
                props.image?(
                    <img src={props.image.url} alt="Product Image" />
                ):(
                    <img src={imagePlaceholder} alt="Product Image" />
                )
            }
        </div>
        <div id='orderItemName'>
            <p style={{fontSize:"1.5vw"}}><b>{props.name}</b></p>
            <p>Product# - {props.id}</p>
        </div>
        <div id='orderItemQuantity'>
            <p>{`${props.quantity}N X ${discountPrice} = `}&#8377;{`${props.quantity*discountPrice}`}</p>
        </div>
    </div>
  )
}

export default OrderItem
