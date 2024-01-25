import React, { useEffect, useState } from 'react'
import '../styles/UserDetails.css'
import axios from 'axios';
import {server} from '../index'
import Heading from '../components/Product Grid/Heading';
import { Link } from 'react-router-dom';
import Navbar2 from '../components/Product Grid/Navbar2';

const UserDetails = () => {

  const[user,setUser] = useState({});

  useEffect(()=>{
      axios.get(`${server}/users/me`,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      })
      .then((res)=>{
        setUser(res.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  })

  return (
    <>
      <Navbar2/>
      <div className='userPage'>
        <Heading heading={"My Profile  "}/>
        <div className="userCard">
          <div className='userCardLeft'>
            {user.avatar?<img src={`${user.avatar.url}`} alt="profile" />:<></>}
          </div>
          <div className='userCardRight'>
            <div>Name : <p>{user.name}</p></div>
            <div>Email : <p>{user.email}</p></div>
            <div>Status : <p>{user.role}</p></div>
            <div>Joined On : <p>{new Date(user.createdAt).toLocaleDateString('en-GB')}</p></div>
            <div id='UserBtn'>
              <Link to='/orders'>My Orders</Link>
              <Link to='/me/update'>Edit Profile</Link>
              <Link to='/me/changepassword'>Change Password</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails
