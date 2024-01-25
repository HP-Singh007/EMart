import React, { useEffect, useState } from 'react'
import '../styles/Cart.css'
import Navbar2 from '../components/Product Grid/Navbar2'
import CartItem from '../components/Cart/CartItem'
import Heading from '../components/Product Grid/Heading'
import { calculatePrice } from '../App'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Cart = () => {

    const [cartItems,setCartItems] = useState([]);
    const[isUpdated,setIsUpdated] = useState(false);
    const [sum,setSum] = useState(0);
    const [saved,setSaved] = useState(0);

    const clearCartHandler = ()=>{
        localStorage.setItem("cartItems",[]);
        setIsUpdated((val)=>!val);
        toast.success("Cart Cleared Successfully");
    }

    useEffect(()=>{
        const cart = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[];
        setCartItems(cart);
        let total = 0;
        let totalSaved=0;
        cart.map((item)=>{
            let discountedPrice = calculatePrice(item.price,item.discount);
            total+= discountedPrice*item.quantity;
            totalSaved+= (item.price - discountedPrice)*item.quantity;
        })
        setSum(total);
        setSaved(totalSaved);
    },[isUpdated])

  return (
    <>
        <Navbar2/>
        <div id='cartPage'>
            <Heading heading={"My Cart"}/>
            {
                cartItems.length>0?(
                    <div id="cartMid">
                        <div id="cartCard">
                            {
                            cartItems.map((item,i,array)=>{
                                return <CartItem {...item} setIsUpdated={setIsUpdated} index={i} array={array}/>
                            })
                            }
                        </div>
                        <div id="subtotal">
                            <p><b>Total Products</b> : {cartItems.length}</p>
                            <p><b>Subtotal</b> : &#8377;{sum}</p>
                            <p><b>You Save</b> : &#8377;{saved}</p>
                            <span>
                                <Link to='/order'>Place Order</Link>
                                <button onClick={clearCartHandler}>Clear Cart</button>
                            </span>
                        </div>
                    </div>
                ):(
                <div id='emptyCart'>
                    <span class="material-symbols-outlined">
                        shopping_cart_off
                    </span>
                    <p>No Product in your Cart</p>
                    <Link to='/products'>View Products</Link>
                </div>
                )
                }
        </div>
    </>
  )
}

export default Cart
