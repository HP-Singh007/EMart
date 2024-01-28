import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar2.css";
import logo from "../../images/logo2.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircleUserIcon, CircleUserRound, LayoutDashboard, List, LogIn, LogOut, ShoppingCart, UserPlus } from "lucide-react";
import { Context, server } from "../../index";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar2 = () => {
  const {isAuthenticated, setIsAuthenticated, user, isAdmin, setIsAdmin } = useContext(Context);
  let navigate = useNavigate();

  const LogoutHandler = async () => {
    const { data } = await axios.get(`${server}/users/logout`, {
      withCredentials: true,
    });
    toast.success(data.message);
    navigate('../products');
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.setItem("cartItems","");
  };
  return (
    <div className="navbar2">
      <div className="navcomp2" id="leftnavcomp2">
        <img src={logo} alt="logo" />
      </div>

      <div className="navcomp2" id="midnavcomp2">
        <Link to="/home">HOME</Link>
        <Link to="/products">PRODUCTS</Link>
        <Link to="/aboutus">ABOUT US</Link>
      </div>

      <div className="navcomp2" id="rightnavcomp2">
        {
          isAuthenticated?(
            <>
              <Link to="/cart">
                <ShoppingCart size={30}/>
              </Link>
              <DropdownButton
                id="dropdown-basic-button"
                variant="success"
                data-bs-theme="light"
                title={<CircleUserIcon size={30} />}
              >
                <div id="dropdownName">
                  {user.avatar?<img src={`${user.avatar.url}`} alt='profile'/>:<></>}
                  <span>{user.name}</span>
                </div>
                {
                  isAdmin?(
                  <Dropdown.Item className="dropdownitem">
                    <LayoutDashboard color="gray" />
                    <Link to="/admin/dashboard" id='dropdownlink'>
                      <p>Dashboard</p>
                    </Link>
                  </Dropdown.Item>):(<></>)
                }
                <Dropdown.Item className="dropdownitem">
                  <CircleUserRound color="gray" />
                  <Link to="/me" id='dropdownlink'>
                    <p>My Account</p>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="dropdownitem">
                  <ShoppingCart color="gray"/>
                  <Link to="/cart" id='dropdownlink'>
                    <p>Cart</p>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="dropdownitem">
                  <List color="gray" />
                  <Link to="/orders" id='dropdownlink'>
                    <p>My Orders</p>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="dropdownitem" onClick={LogoutHandler}>
                  <LogOut color='red' />
                  <p id="logoutDropdown" className="dropdownItem">Logout</p>
                </Dropdown.Item>
              </DropdownButton>
            </>
          ):(
            <DropdownButton
              id="dropdown-basic-button"
              variant="success"
              data-bs-theme="light"
              title={<CircleUserIcon />}
            >
              <Dropdown.Item className="dropdownitem">
                <LogIn color='gray' />
                <Link to="/login" id='dropdownlink'>
                  <p>Login</p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className="dropdownitem">
                <UserPlus color="gray" />
                <Link to="/register" id='dropdownlink'>
                  <p>Register</p>
                </Link>
              </Dropdown.Item>
            </DropdownButton>
          )
        }


      </div>
    </div>
  );
};

export default Navbar2;
