import React, { useEffect, useState} from 'react'
import '../../styles/CartItem.css'
import { calculatePrice } from '../../App';
import imagePlaceholder from '../../images/imagePlaceholder.jpg'
import { useNavigate } from 'react-router-dom';

const CartItem = (props) => {
    const[quantity,setQuantity]= useState(props.quantity);
    const navigate= useNavigate();

    const decrementHandler=()=>{
        setQuantity((val)=>(val>1)?val-1:val)
    }

    const incrementHandler=()=>{
        setQuantity((val)=>(val<props.stock)?val+1:val);
    }

    const removeFromCarthandler=()=>{

        props.array.splice(props.index,1);

        localStorage.setItem("cartItems",JSON.stringify(props.array));
        props.setIsUpdated((val)=>!val);
        navigate('/cart');
    }

    useEffect(()=>{

        props.array[props.index].quantity=quantity;

        localStorage.setItem("cartItems",JSON.stringify(props.array));
        props.setIsUpdated((val)=>!val);
    },[quantity])

  return (
    <div id='cartItem'>
        <div id="cartImg">
            {props.image?(
            <img src={props.image.url} alt="product" />
            ):<img src={imagePlaceholder} alt='product'/>}
        </div>   
        <div id="cartInfo">
            <h3>{props.name}</h3>
            <p>Product# : {props.id}</p>
            <div id='cartPrice'>
                <div id='cartQuantity'>
                    <button className="updateStock" onClick={decrementHandler}>-</button>
                    <input type="number" value={props.quantity} className='updateInput'/>
                    <button className="updateStock" onClick={incrementHandler}>+</button>
                </div>
                <div id="cartNewPrice">
                    <p className="greenFont">-{props.discount}%</p>
                    <p className="smallFont">&#8377;{props.price}</p>
                    <p className="largeFont">&#8377;&nbsp;
                    {calculatePrice(props.price, props.discount)}
                    </p>
                </div>
                <div id='cartButton'>
                    <button id='cartRemoveBtn' onClick={removeFromCarthandler}>Remove</button>
                </div>
            </div>
        </div>   
    </div>
  )
}

export default CartItem
