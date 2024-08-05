import React, { useContext} from 'react'
import '../../styles/Loader.css'
import {Context} from '../../index'
import cart from "../../images/shoppingCart.png"

const Loader = () => {
    const {isLoading,fact} = useContext(Context);

  return (
    <div id='Loading' style={{"display":isLoading?"flex":"none"}}>
      <div id='animatedCart' style={{"display":fact==""?"none":"block"}}>
        <img src={cart} alt="loading..." />
      </div>
      <div id="ring"></div>
      <div id='fact'>{fact}</div>
    </div>
  )
}

export default Loader
