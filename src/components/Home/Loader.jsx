import React, { useContext} from 'react'
import '../../styles/Loader.css'
import {Context} from '../../index'

const Loader = () => {
    const {isLoading,fact} = useContext(Context);

  return (
    <div id='Loading' style={{"display":isLoading?"flex":"none"}}>
      <div id="ring"></div>
      <div id='fact'>{fact}</div>
    </div>
  )
}

export default Loader
