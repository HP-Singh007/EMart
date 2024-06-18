import React from 'react'
import '../../styles/Sidebar.css'
import { Slider } from '@mui/material'

const Sidebar = ({rating,setRating,Lprice,setLPrice,Uprice,setUPrice,category,setCat}) => {
  const priceHandler=(e)=>{
    setLPrice(e.target.value[0]);
    setUPrice(e.target.value[1]);
  }
  const categoryHandler=(name)=>{
    setCat(name);
  }
  return (
    <div className='sidebar'>
      <h2>Filter</h2>
      <div id="ratingSidebar" className='side'>
        <p className='sideComp'>Rating : </p>
        <Slider
        aria-label="Temperature"
        defaultValue={rating}
        getAriaValueText={(rating)=>setRating(rating)}
        valueLabelDisplay="auto"
        step={0.5}
        marks
        min={0}
        max={5}
      />
      </div>
      <div id="priceSidebar" className='side'>
        <p className="sideComp">Price : </p>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={[Lprice,Uprice]}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          // getAriaValueText={(value)=>{console.log(value)}}
          min={0}
          max={150000}
        />
      </div>
      <div id="categorySidebar" className='side'>
        <p className="sideComp">Categories : </p>
        <ul>
          {
            category.map((i)=>{
              return <li onClick={()=>categoryHandler(i.name)}>{i.icon}&nbsp;&nbsp;{i.name}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
