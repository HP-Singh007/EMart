import React from 'react'
import '../../styles/ProductCard.css'
import imagePlaceholder from "../../images/imagePlaceholder.jpg"
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'
import { calculatePrice } from '../../App'
import { motion } from "framer-motion";


const rating={
  readonly:true,
  allowFraction:true,
  size:20,
}

const ProductCard = (props) => {
  return (
    
    <motion.div id='productCard' initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}>
      <Link to={props.productId} className='links'>
        <img src={props.image?props.image:imagePlaceholder} alt="product" />
        <p id='name'>{props.name}</p>
        <p id='rating'><Rating {...rating} initialValue={props.rating} /></p>
        <p id='Originalprice'>&#8377; {props.price}</p>
        <p id='price'>&#8377; {calculatePrice(props.price,props.discount)}</p>
        <p id='discount'>Discount : {props.discount}%</p>
      </Link>
    </motion.div>
  )
}

export default ProductCard
