import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";
import { Context, server } from "../../index";
import "../../styles/Navbar.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const LogoutHandler = async () => {
    const { data } = await axios.get(`${server}/users/logout`, {
      withCredentials: true,
    });
    toast.success(data.message);
    setIsAuthenticated(false);
  };
  return (
    <navbar>
      <div className="navcomp" id="leftnavcomp">
        <img src={logo} alt="logo" />
      </div>

      <div className="navcomp" id="midnavcomp">
        <Link to="/home">HOME</Link>
        <Link to="/products">PRODUCTS</Link>
        <Link to="/contactus">CONTACT US</Link>
      </div>

      <div className="navcomp" id="rightnavcomp">
        {isAuthenticated ? (
          <button id="logout" onClick={LogoutHandler}>
            LOGOUT
          </button>
        ) : (
          <>
            <Link to="/register" id="register">
              REGISTER
            </Link>
            <Link to="/login" id="login">
              LOGIN
            </Link>
          </>
        )}
      </div>
    </navbar>
  );
};

export default Navbar;
