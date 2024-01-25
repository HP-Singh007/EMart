import React, { useRef, useState } from "react";
import "../../styles/CreateProduct.css";
import Navbar2 from "../Product Grid/Navbar2";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";
import {server} from '../../index'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {

  const submitBtn = useRef(null);
  const navigate = useNavigate();

  const category = [
    "Mobile",
    "Electronics",
    "Kitchenware",
    "Men Wear",
    "Women Wear",
    "Furniture",
  ];
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState([]);

  const ImageHandler = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const productHandler=async(e)=>{
    e.preventDefault();

    try{
      submitBtn.current.disabled = true;
      const {data} = await axios.post(`${server}/products/new`,{
        name,
        description:desc,
        price,
        category:cat,
        stock,
        discount,
        images
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })

      toast.success(data.message);
      submitBtn.current.disabled = false;
      navigate('/admin/products/all');

    }catch(error){
      console.log(error);
      submitBtn.current.disabled = false;
    }
  }

  return (
    <>
      <Navbar2 />
      <div className="adminPage">
        <Sidebar />
        <div className="adminMain createFormPage">
          <form id="createProductForm" onSubmit={productHandler}>

            <p className="largeFont">Create Product</p>

            <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} required />

            <textarea rows={5} placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} required />

            <select name="category" id="category" onChange={(e)=>{setCat(e.target.value)}} required>
              <option>--Select Category--</option>
              {category.map((item) => {
                return <option>{item}</option>;
              })}
            </select>

            <input type="number" placeholder="Stock" value={stock} onChange={(e)=>{setStock(e.target.value)}} required />

            <input type="number" placeholder="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}} required />

            <input type="number" placeholder="Discount" value={discount} onChange={(e)=>{setDiscount(e.target.value)}} required />

            <div id='adminProductImages'>
                <input type="file" placeholder="Images" onChange={ImageHandler} required />
                {
                    images && images.map((item,index)=>{
                        return(
                            <img src={item} alt={`Product ${index}`} />
                        )
                    })
                }
            </div>

            <input type="submit" value="Create" ref={submitBtn} />

          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
