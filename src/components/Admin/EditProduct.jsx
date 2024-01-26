import React, { useEffect, useRef, useState } from 'react'
import Navbar2 from '../Product Grid/Navbar2'
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {server} from '../../index'

const EditProduct = () => {
    
  const submitBtn = useRef(null);
  const {id} = useParams();
  const navigate = useNavigate();

  const category = [
    "Mobile",
    "Electronics",
    "Kitchenware",
    "Men Wear",
    "Women Wear",
    "Furniture",
  ];
  const [product,setProduct] = useState({});
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

  const updateHandler=async(e)=>{
    e.preventDefault();
    try{
        submitBtn.current.disabled = true;

        const {data} = await axios.put(`${server}/products/${id}`,{
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
        console.log(error.response.data.message);
        submitBtn.current.disabled = false;
    }
  }

  useEffect(()=>{
    axios.get(`${server}/products/${id}`,{
        withCredentials:true
    })
    .then((res)=>{
        setProduct(res.data.product);
        setName(res.data.product.name);
        setDesc(res.data.product.description);
        setCat(res.data.product.category);
        setStock(res.data.product.stock);
        setPrice(res.data.product.price);
        setDiscount(res.data.product.discount);
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
            <div className="adminMain createFormPage">
                <form id="createProductForm" onSubmit={updateHandler}>

                    <p className="largeFont">Update Product</p>

                    <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} required />

                    <textarea rows={5} placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} required />

                    <select name="category" id="category" onChange={(e)=>{setCat(e.target.value)}} required>
                    <option>{cat}</option>
                    {category.map((item) => {
                        return <option>{item}</option>;
                    })}
                    </select>

                    <input type="number" placeholder="Stock" value={stock} onChange={(e)=>{setStock(e.target.value)}} required />

                    <input type="number" placeholder="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}} required />

                    <input type="number" placeholder="Discount" value={discount} onChange={(e)=>{setDiscount(e.target.value)}} required />

                    <div id='adminProductImages'>
                        <input type="file" placeholder="Images" onChange={ImageHandler} />
                        {
                            images && images.map((item,index)=>{
                                return(
                                    <img src={item} alt={`Product ${index}`} />
                                )
                            })
                        }
                    </div>

                    <input type="submit" value="Save" ref={submitBtn} />

                </form>    
            </div>    
        </div> 
    </>
  )
}

export default EditProduct
