import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import axios from "axios";
import { Context, server } from "./index";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import UserDetails from "./pages/UserDetails";
import UpdateProfile from "./pages/UpdateProfile";
import ChangePassword from "./pages/ChangePassword";
import Loader from './components/Home/Loader'
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ConfirmOrder from "./pages/ConfirmOrder";
import Payment from "./pages/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Dashboard from "./pages/Dashboard";
import AllProducts from "./components/Admin/AllProducts";
import CreateProduct from "./components/Admin/CreateProduct";
import EditProduct from "./components/Admin/EditProduct";
import AllOrders from "./components/Admin/AllOrders";
import AllUsers from "./components/Admin/AllUsers";
import EditUser from "./components/Admin/EditUser";

export function calculatePrice(price, discount) {
  return Math.round(price - (discount / 100) * price);
}

function App() {
  const { setIsAuthenticated, setIsLoading, setUser, isAuthenticated,setIsAdmin,isAdmin} = useContext(Context);
  const [stripeApiKey,setStripeApiKey] = useState("");

  const getApiKey=async()=>{          
  try{
    const {data} = await axios.get(`${server}/payment/getkey`,{withCredentials:true})
    setStripeApiKey(data.api_key);
  }
  catch(err){
    console.log(err);
  }
  }

  useEffect(()=>{
    getApiKey();
  },[])

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        if(res.data.role==='Admin'){
          setIsAdmin(true);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setIsAuthenticated(false);
      });
  },[isAuthenticated]);

  return (
    <Router basename="/E-Mart">
      <Loader/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path={"/users/password/reset/:id"} element={<ResetPassword/>}/>
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/me" element={<UserDetails />} />
      <Route path="/me/update" element={<UpdateProfile />} />
      <Route path="/me/changepassword" element={<ChangePassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/admin/dashboard" element={isAdmin?<Dashboard />:<Login/>} />
      <Route path="/admin/products/all" element={isAdmin?<AllProducts />:<Login/>} />
      <Route path="/admin/products/create" element={isAdmin?<CreateProduct />:<Login/>} />
      <Route path="/admin/products/edit/:id" element={isAdmin?<EditProduct />:<Login/>} />
      <Route path="/admin/orders" element={isAdmin?<AllOrders />:<Login/>} />
      <Route path="/admin/users" element={isAdmin?<AllUsers />:<Login/>} />
      <Route path="/admin/users/edit/:id" element={isAdmin?<EditUser />:<Login/>} />
      <Route path="/order/confirm" element={<ConfirmOrder />} />
      <Route path="/payment/success" element={<OrderSuccess />} />
      <Route path="/order/payment" element={
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment/>
        </Elements>
      } />
    </Routes>
    <Toaster />
    </Router>
  );
}

export default App;
