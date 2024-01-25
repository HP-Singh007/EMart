import React, { useState } from 'react'
import "../styles/ChangePassword.css"
import Navbar from '../components/Home/Navbar';
import { FileLock, Lock, LockKeyhole } from 'lucide-react';
import {server} from '../index'
import axios from 'axios';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    
    const [oldPass,setOldPass] = useState('');
    const [newPass,setNewPass] = useState('');
    const [confirmPass,setConfirmPass] = useState('');

    const ChangePasswordHandler=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.put(`${server}/users/password/change`,{
                oldPass,newPass,confirmPass
            },{
                headers: {
                "Content-Type": "application/json",
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
        <div id="changeForm">
            <h1>Change Password</h1>
            <div className="changeDiv">
                <FileLock />
                <input
                    type="password"
                    name="oldPass"
                    id="oldPass"
                    placeholder="Current Password"
                    required="true"
                    value={oldPass}
                    onChange={(e) => {
                    setOldPass(e.target.value);
                    }}
                />
            </div>
            <div className="changeDiv">
                <Lock />
                <input
                    type="password"
                    name="newPass"
                    id="newPass"
                    placeholder="New Password"
                    required="true"
                    value={newPass}
                    onChange={(e) => {
                    setNewPass(e.target.value);
                    }}
                />
            </div>
            <div className="changeDiv">
                <LockKeyhole />
                <input
                    type="password"
                    name="confirmPass"
                    id="confirmPass"
                    placeholder="Confirm Password"
                    required="true"
                    value={confirmPass}
                    onChange={(e) => {
                    setConfirmPass(e.target.value);
                    }}
                />
            </div>
            <button onClick={ChangePasswordHandler}>Change Password</button>
        </div>
    </>
  )
}

export default ChangePassword
