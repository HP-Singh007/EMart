import axios from 'axios';
import React, { useState } from 'react'
import {server} from '../index'
import toast from 'react-hot-toast';
import Navbar from '../components/Home/Navbar';
import { LockKeyhole } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const {id} = useParams();

    const resetPasswordHandler=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.put(`${server}/users/password/reset/${id}`,{password,confirmPassword},{
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
            <h1>Reset Password</h1>
            <div className="forgetDiv">
                <LockKeyhole />
                <input
                    type="password"
                    name="password"
                    id="loginPassword"
                    placeholder="Password"
                    required="true"
                    value={password}
                    onChange={(e) => {
                    setPassword(e.target.value);
                    }}
                />
            </div>
            <div className="forgetDiv">
                <LockKeyhole />
                <input
                    type="password"
                    name="confirmPassword"
                    id="loginPassword"
                    placeholder="Confirm Password"
                    required="true"
                    value={confirmPassword}
                    onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    }}
                />
            </div>
            <button onClick={resetPasswordHandler}>Reset Password</button>
        </div>
    </>
  )
}

export default ResetPassword
