import React, { useContext, useState, useEffect } from "react";
import "../styles/Register.css";
import Navbar from "../components/Home/Navbar";
import { Link, Navigate } from "react-router-dom";
import { CircleUserRound, KeyRound, LockKeyhole, Mail } from "lucide-react";
import { Context, server } from "../index";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [avatar,setAvatar] = useState('https://res.cloudinary.com/dnztpcflm/image/upload/v1705412415/avatars/euxs1a9hsusichmzcpzs.jpg')
  const { isAuthenticated, setIsAuthenticated , isLoading, setIsLoading} = useContext(Context);

  const SendOtpHandler = async (e) => {
    e.preventDefault();
    try {
        if(email ===''){
            toast.error('Please fill all fields');
            return;
        }
        const { data } = await axios.post(
        `${server}/users/sendotp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setOtpSent(false);
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/verifyotp`,
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setIsVerified(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsVerified(false);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          email,
          name: username,
          password,
          avatar
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      setIsLoading(false);
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      setIsLoading(false);
      setIsAuthenticated(false);
      toast.error(error.response.data.message);
    }
  };

  const avatarHandler=(e)=>{
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    }
  }

  useEffect(()=>{
    //re-render
  },[avatar,otpSent,isVerified,isAuthenticated])

  if (isAuthenticated) {
    return <Navigate to="/products" />;
  }

  return (
    <>
      <Navbar />
      <div id="registerPage"></div>
      <div id="registerForm" >
        <h1>Register</h1>
        <div className="registerDiv">
          <Mail />
          <input
            type="text"
            name="email"
            id="registerEmail"
            placeholder="Email"
            required="true"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={otpSent ? "registerDiv" : "disabled"}>
          <KeyRound />
          <input
            type="text"
            name="otp"
            id="registerOtp"
            placeholder="OTP"
            required="true"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </div>
        <div className={isVerified ? "registerDiv" : "disabled"}>
          <CircleUserRound />
          <input
            type="text"
            name="username"
            id="registerUsername"
            placeholder="Username"
            required="true"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={isVerified ? "registerDiv" : "disabled"}>
          <LockKeyhole />
          <input
            type="password"
            name="password"
            id="registerPassword"
            placeholder="Password"
            required="true"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={isVerified ? "registerImgDiv" : "disabled"}>
          <img src={avatar} alt='avatar'/>
          <input
            type="file"
            name="avatar"
            id="registerAvatar"
            onChange={avatarHandler}            
          />
        </div>
        {otpSent && isVerified ? (
          <button onClick={registerHandler} className={isLoading?"btnDisabled":""}>Register</button>
        ) : otpSent ? (
          <button onClick={verifyOtpHandler}>Verify</button>
        ) : (
          <button onClick={SendOtpHandler}>Send OTP</button>
        )}
        <p id="forgetPassword">
          <Link to='/login'>Already Member ?</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
