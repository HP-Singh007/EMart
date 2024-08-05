import React, { useEffect, useState } from "react";
import "../styles/Products.css";
import Navbar2 from "../components/Product Grid/Navbar2";
import Sidebar from "../components/Product Grid/Sidebar";
import ProductGrid from "../components/Product Grid/ProductGrid";
import Footer from "../components/Product Grid/Footer";
import Heading from "../components/Product Grid/Heading";
import CategoryCard from "../components/Product Grid/CategoryCard";
import ProductCard from "../components/Product Grid/ProductCard";
import axios from "axios";
import { server } from "../index";
import Loader from "../components/Home/Loader";
import { BedDouble, CookingPot, Laptop, LayoutList, Shirt, Smartphone } from "lucide-react";

const Products = () => {
  const [topDeals, setTopDeals] = useState([]);
  const [rating,setRating] = useState(0);
  const [page,setPage] = useState(1);
  const [cat,setCat] = useState('All');
  const [Lprice,setLPrice] = useState(0);
  const [Uprice,setUPrice] = useState(150000);

  const category = [
    {
      name: "All",
      image:
        "https://cdn-icons-png.flaticon.com/512/8539/8539259.png",
      icon:<LayoutList />
    },
    {
      name: "Mobile",
      image:
        "https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
      icon:<Smartphone />
    },
    {
      name: "Electronics",
      image:
        "https://rukminim2.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100",
      icon:<Laptop />
    },
    {
      name: "Kitchenware",
      image:
        "https://img.freepik.com/free-photo/top-view-tableware-collection_23-2148861770.jpg?w=740&t=st=1704812521~exp=1704813121~hmac=2a516915b7cd99d1e17f8e1aeecce3d6b5fb8731d20108db08a4c96f3aa8c4d2",
      icon:<CookingPot />
    },
    {
      name: "Men Wear",
      image:
        "https://img.freepik.com/free-photo/portrait-young-businessman_144627-21852.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704672000&semt=ais",
      icon:<Shirt />
    },
    {
      name: "Women Wear",
      image:
        "https://www.freestock.com/450/freestock_10712254.jpg",
      icon:<Shirt />
    },
    {
      name: "Furniture",
      image:
        "https://rukminim2.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100",
      icon:<BedDouble />
    },
  ];

  const sidebarObj={
    rating,
    setRating,
    Lprice,
    setLPrice,
    Uprice,
    setUPrice,
    category,
    cat,
    setCat  
  }

  useEffect(() => {
    axios
      .get(`${server}/products/top`, {
        withCredentials: true,
      })
      .then((res) => {
        setTopDeals(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
      window.scrollTo(0, 0);
  },[]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="productPage">
      {/* <Loader/> */}
      <Navbar2 />
      <Heading heading={"TOP DEALS"} />
      <div id="topdeals">
        {topDeals.map((i) => {
          return (
            <ProductCard
              productId={`/products/${i._id}`}
              name={i.name}
              price={i.price}
              discount={i.discount}
              rating={i.rating}
              image={i.images.length?i.images[0].url:null}
            />
          );
        })}
      </div>
      <Heading heading={"Categories"} />
      <div id="categoryList">
        {category.map((i) => {
          return <CategoryCard name={i.name} image={i.image} setCategory={setCat} category={cat} setPage={setPage}/>;
        })}
      </div>
      <div id="productpagemid">
        <Sidebar {...sidebarObj} />
        <ProductGrid category={cat} rating={rating} Lprice={Lprice} Uprice={Uprice} setCategory={setCat} page={page} setPage={setPage}/>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
