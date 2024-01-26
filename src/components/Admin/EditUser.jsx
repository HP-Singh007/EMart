import React, { useEffect, useRef, useState } from 'react'
import '../../styles/EditUser.css'
import Navbar2 from '../Product Grid/Navbar2'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Heading from '../Product Grid/Heading'
import toast from 'react-hot-toast'
import {server} from '../../index'
import Sidebar from './Sidebar'

const EditUser = () => {

    const {id} = useParams();
    const [user,setUser] = useState({});
    const [role,setRole] = useState("");
    const navigate = useNavigate();
    const editBtn = useRef(null);

    const updateHandler=async(e)=>{
        e.preventDefault();
        editBtn.current.disabled = true;
        try{
            const {data} = await axios.put(`${server}/admin/users/${id}`,{
                role
            },{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            })
            toast.success(data.message);
            editBtn.current.disabled = false;
            navigate('/admin/users');
        }
        catch(err){
            toast.error(err.response.data.message);
            editBtn.current.disabled = false;
        }
    }

    useEffect(()=>{
        axios.get(`${server}/admin/users/${id}`,{
            withCredentials:true
        })
        .then((res)=>{
            setUser(res.data.user);
            setRole(res.data.user.role);
        })
        .catch((err)=>{
            toast.error(err.response.data.message);
        })
    },[])

  return (
    <>
      <Navbar2/>
        <div className="adminPage">
            <Sidebar/>
            <div className='userPage userPageAdmin adminMain'>
                <Heading heading={"User Profile  "}/>
                <div className="userCard">
                <div className='userCardLeft'>
                    {user.avatar?<img src={`${user.avatar.url}`} alt="profile" />:<></>}
                </div>
                <div className='userCardRight'>
                    <div>User ID : <p>{user._id}</p></div>
                    <div>Name : <p>{user.name}</p></div>
                    <div>Email : <p>{user.email}</p></div>
                    <div>Status : <p>{user.role}</p></div>
                    <div>Joined On : <p>{new Date(user.createdAt).toLocaleDateString('en-GB')}</p></div>
                    <div id='updateRoleBtn'>
                        <select name="role" onChange={(e)=>{setRole(e.target.value)}}>
                            <option>--Select Role</option>
                            <option>Admin</option>
                            <option>User</option>
                        </select>
                        <button ref={editBtn} onClick={updateHandler}>Update</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditUser
