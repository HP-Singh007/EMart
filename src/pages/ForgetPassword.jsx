import React, { useState } from 'react'
import Navbar from '../components/Home/Navbar'
import { CircleUserRound } from 'lucide-react';
import '../styles/ForgetPassword.css'
import axios from 'axios';
import {server} from '../index'
import toast from 'react-hot-toast';

const ForgetPassword = () => {

const [email,setEmail] = useState('');

const forgetPasswordHandler=async(e)=>{
    e.preventDefault();
    try{
        const {data} = await axios.post(`${server}/users/password/reset`,{email},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
    
        toast.success(data.message);
    }catch(error){
        toast.error(error.response.data.message);
    }

}

  return (
    <>
        <Navbar/>
        <div id='loginPage'></div>
        <div id="forgetForm">
            <h1>Forgot Password</h1>
            <div className="forgetDiv">
                <CircleUserRound />
                <input
                    type="text"
                    name="email"
                    id="loginEmail"
                    placeholder="Email"
                    required="true"
                    value={email}
                    onChange={(e) => {
                    setEmail(e.target.value);
                    }}
                />
            </div>
            <button onClick={forgetPasswordHandler}>Send Verification Mail</button>
        </div>
    </>
  )
}

export default ForgetPassword
