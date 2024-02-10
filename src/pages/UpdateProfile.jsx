import React, { useState, useEffect, useContext } from 'react'
import Navbar2 from '../components/Product Grid/Navbar2';
import {server,Context} from '../index'
import axios from 'axios';
import toast from 'react-hot-toast';
import Heading from '../components/Product Grid/Heading';
import {useNavigate} from 'react-router-dom'

const UpdateProfile = () => {
const[user,setUser] = useState({});
const[newAvatar,setNewAvatar] = useState("");
const [name,setName] = useState('');
const [email,setEmail] = useState('');
const {setIsLoading,isLoading} = useContext(Context);
let navigate = useNavigate();

const updateProfileHandler=async(e)=>{
    e.preventDefault();
    try{
        setIsLoading(true);
        const {data} = await axios.put(`${server}/users/me/update`,{
            name,
            email,
            avatar:newAvatar
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        setIsLoading(false);
        toast.success(data.message);
        navigate('/me')
    }catch(error){
      setIsLoading(false);
      console.log(error);
    }
}

const newAvatarHandler=(e)=>{
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  
  reader.onload = () => {
    if (reader.readyState === 2) {
      setNewAvatar(reader.result);
    }
  }
}

useEffect(()=>{
    axios.get(`${server}/users/me`,{
        headers: {
        "Content-Type": "application/json",
        },
        withCredentials:true
    })
    .then((res)=>{
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
    })
    .catch((error)=>{
       console.log(error);
    })
},[])
  return (
    <>
      <Navbar2/>
      <div className='userPage'>
        <Heading heading={"Update Profile"}/>
        <div className="userCard">
          <div className='userCardLeft'>
            {user.avatar?<img src={user.avatar.url} alt="profile" />:<></>}
            <div id='updateAvatar'>
              <img src={newAvatar} alt="profile" />
              <input type='file' name='newAvatar' id='newAvatar' onChange={newAvatarHandler} />
            </div>
          </div>
          <div className='userCardRight'>
            <div>
                Name : <input type="text" name="username" id="updateName" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div>
                Email : <input type="text" name="usermail" id="updateMail" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                Status : <p>{user.role}</p>
            </div>
            <button onClick={updateProfileHandler} className={isLoading?"btnDisabled":""}>Update</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
