import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../../styles/AllOrders.css";
import Collapsible from 'react-collapsible';
import Navbar2 from "../Product Grid/Navbar2";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../index";
import MyOrderCollapsible from "../Order/MyOrderCollapsible";
import Heading from "../Product Grid/Heading";
import { Trash2 } from "lucide-react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status,setStatus] = useState("");
  const [isUpdated,setIsUpdated] = useState(false);

  const updateHandler=async(id)=>{
    try{
        const {data} = await axios.put(`${server}/orders/${id}`,{
            orderStatus:status
        },{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })

        toast.success(data.message);
        setIsUpdated((val)=>!val);
    }
    catch(error){
        toast.error(error.response.data.message);
    }
  }

  const deleteHandler=async(id)=>{
    try{
        const {data} = await axios.delete(`${server}/orders/${id}`,{
            withCredentials:true
        })

        toast.success(data.message);
        setIsUpdated((val)=>!val);
    }
    catch(err){
        toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    axios
      .get(`${server}/orders/admin/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [isUpdated]);

  return (
    <>
      <Navbar2 />
      <div className="adminPage">
        <Sidebar />
        <div className="adminMain">
            <Heading heading={"All Orders"}/>
            <div id="orderHeading">
              <div className='orderId'>Order ID</div>
              <div className='orderRest'>Item Qty</div>
              <div className='orderRest'>Payment Status</div>
              <div className='orderRest'>Order Status</div>
              <div className='orderRest'>Amount</div>
              <span>&nbsp;&nbsp;&nbsp;</span>
            </div>
          {orders &&
            orders.map((item) => (
              <Collapsible trigger={<MyOrderCollapsible {...item} />}>
                <div id="orderCollapse">
                  <div id="orderCollapseLeft">
                    {item.orderItems &&
                      item.orderItems.map((product) => {
                        return (
                          <div id="orderCollapseProduct">
                            <div>{product.productId}</div>
                            <span>{product.name}</span>
                            <p>
                              {product.quantity}N X {product.price}
                            </p>
                            <p>= &#8377;{product.quantity * product.price}</p>
                          </div>
                        );
                      })}
                  </div>
                  <div id="orderCollapseRight">
                    <p>
                      <b>User Name: </b>
                      {item.user?item.user.name:" -User Deleted-  "}
                    </p>
                    <p>
                      <b>User Email: </b>
                      {item.user?item.user.email:" -User Deleted- "}
                    </p>
                    <p>
                      <b>Address: </b>
                      {item.shippingInfo.address}, {item.shippingInfo.city},{" "}
                      {item.shippingInfo.state} , {item.shippingInfo.country}
                    </p>
                    <p>
                      <b>Phone : </b>
                      {item.shippingInfo.phoneNo}
                    </p>
                    <p>
                      <b>Paid On : </b>
                      {new Date(item.paidAt).toLocaleDateString("en-GB")}
                    </p>
                    {item.deliveredAt ? (
                      <p>
                        <b>Delivered On : </b>
                        {new Date(item.deliveredAt).toLocaleDateString("en-GB")}
                      </p>
                    ) : (
                      <></>
                    )}
                    <div id='allOrdersBtn'>
                      {
                        item.orderStatus!=='Delivered'?(
                            <div>
                                <select onChange={(e)=>{setStatus(e.target.value)}}>
                                    <option>--Select Status--</option>
                                    {
                                        item.orderStatus==='processing'?(
                                            <option>Shipped</option>
                                        ):(
                                            <option>Delivered</option>
                                    )}
                                </select>
                                <button onClick={()=>{updateHandler(item._id)}}>Update</button>
                            </div>
                        ):(<></>)
                      }
                      <button onClick={()=>deleteHandler(item._id)}><Trash2 color="red"/></button>
                    </div>
                  </div>
                </div>
              </Collapsible>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
