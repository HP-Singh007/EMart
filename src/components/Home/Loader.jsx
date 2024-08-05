import React, { useContext, useEffect, useState } from 'react'
import '../../styles/Loader.css'
import facts from './facts.json'
import {Context} from '../../index'

const Loader = () => {
    const {isLoading} = useContext(Context);
    const [fact,setFact] = useState("");

    useEffect(()=>{
      const random = Math.floor(Math.random() * facts.length-1);
      if(isLoading){
        setTimeout(() => {
          setFact("Do You Know : "+facts[random]);
        }, 5000);
      }
      else{
        setFact("");
      }
    },[isLoading])
  return (
    <div id='Loading' style={{"display":isLoading?"flex":"none"}}>
      <div id="ring"></div>
      <div id='fact'>{fact}</div>
    </div>
  )
}

export default Loader
