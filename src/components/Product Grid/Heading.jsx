import React from 'react'
import '../../styles/Heading.css'

const Heading = ({heading,tag}) => {
  return (
    <div id="heading">
        <div className='line'></div>
        <h1>{heading}</h1>
        <div className='line'></div>
    </div>
  )
}

export default Heading
