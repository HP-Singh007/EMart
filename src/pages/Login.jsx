import React, { useState, useContext } from "react";
import "../styles/Login.css";
import Navbar from "../components/Home/Navbar";
import { Link, Navigate } from "react-router-dom";
import { CircleUserRound, LockKeyhole } from "lucide-react";
import { server, Context } from "../index";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, setIsLoading } =
    useContext(Context);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/products" />;
  }
  return (
    <>
      <Navbar />
      <div id="loginPage"></div>
      <div id="loginForm">
        <h1>LOGIN</h1>
        <div className="loginDiv">
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
        <div className="loginDiv">
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
        <button onClick={SubmitHandler}>Login</button>
        <p id="forgetPassword">
          <Link to='/register'>Not a Member ?</Link>
          <Link to='/forgetpassword'>Forget Password ?</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
