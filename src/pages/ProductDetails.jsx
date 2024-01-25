import React, { useContext, useEffect, useState } from "react";
import Navbar2 from "../components/Product Grid/Navbar2";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { server,Context } from "../index";
import { Link, useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import imagePlaceholder from "../images/imagePlaceholder.jpg";
import { Rating } from "react-simple-star-rating";
import { calculatePrice } from "../App";
import Heading from "../components/Product Grid/Heading";
import ReviewCard from "../components/ProductDetails/ReviewCard";
import toast from "react-hot-toast";
import Loader from "../components/Home/Loader";

const ProductDetails = () => {
  const{setIsLoading,isAuthenticated} = useContext(Context);
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [isReview,setIsReview] = useState(false);
  const [quantity,setQuantity] =useState(1);
  const { id } = useParams();
  const rating = {
    readonly: true,
    allowFraction: true,
    size: 20,
  };

  const createReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${server}/products/review/${id}`,
        {
          rating: newRating,
          comment: newReview,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsReview((val)=>!val);
      setNewRating(0);
      setNewReview("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const decrementHandler=()=>{
    setQuantity((val)=>(val>1)?val-1:val)
  }

  const incrementHandler=()=>{
    setQuantity((val)=>(val<product.stock)?val+1:val);
  }

  const cartHandler=()=>{
    const cartItems = localStorage.getItem("cartItems")?(JSON.parse(localStorage.getItem("cartItems"))):[];

    cartItems.map((item,i)=>{
      if(item.id===product._id){
        cartItems.splice(i,1);
      }
    })

    const cartItem = {
      id:product._id,
      name:product.name,
      price:product.price,
      image:product.images[0],
      discount:product.discount,
      quantity:quantity,
      stock:product.stock
    }

    cartItems.unshift(cartItem);
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
    toast.success("Item Added to cart");
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/products/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${server}/products/review/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setReviews(res.data.reviews);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
        console.log(error);
      });
  },[isReview]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="singleProduct">
      <Navbar2 />
      {/* <Loader/> */}
      <div id="upperHalfDetails">

        <div id="carousel">
          <Carousel height={500}>
            {product.images && product.images.length > 0 ? (
              product.images.map((item, i) => {
                return (
                  <img
                    className="carouselImg"
                    key={item.url}
                    src={item.url}
                    alt={`Slide${i}`}
                  />
                );
              })
            ) : (
              <img className="carouselImg" src={imagePlaceholder} alt="img" />
            )}
          </Carousel>
        </div>


        <div id="productInfo">
          <h1>{product.name}</h1>

          <div id="productRatings">
            <Rating {...rating} initialValue={product.rating} />
            <p>{product.numOfReviews} Reviews</p>
          </div>

          <div id="newPrice">
            <p className="largeFont">&#8377;&nbsp;
              {calculatePrice(product.price, product.discount)}
            </p>
            <p className="smallFont">&#8377;{product.price}</p>
            <p className="greenFont">-{product.discount}%</p>
          </div>

          <div id="stock">
            <p>
              Status : {
              product.stock>0?(
                <span className="success">In Stock</span>
              ):(
                <span className="warning">Out of Stock</span>
              )
            }
            </p>
          </div>
          <div id="cart">
            <div>
              <button className="updateStock" onClick={decrementHandler}>-</button>
              <input type="number" value={quantity} className="updateInput"/>
              <button className="updateStock" onClick={incrementHandler}>+</button>
            </div>
            <div>
              {
                isAuthenticated?(
                  <button className='addToCart' disabled={product.stock<=0} onClick={cartHandler}>Add to Cart</button>
                ):(
                  <Link className='addToCart' to='/login'>Add to Cart</Link>
                )
              }
            </div>
          </div>
          <div id="specifications">
            <h3>Product Description: </h3>
            <p>{product.description}</p>
          </div>
        </div>


      </div>
      <div id="reviewInfo">

        <div id="createReview">
          <Heading heading={"Reviews"} />
          <input
            type="text"
            name="review"
            id="ReviewTextBox"
            placeholder="Write Your Review Here"
            value={newReview}
            onChange={(e) => {
              setNewReview(e.target.value);
            }}
          />
          <div id="reviewbtn">
            <p>
              Rating :{" "}
              <Rating allowFraction={true}
                initialValue={newRating}
                onClick={(e) => {
                  setNewRating(e);
                }}
              />
            </p>
            <button onClick={createReviewHandler}>Post Review</button>
          </div>
        </div>
        
        <div id="allReviews">
          {reviews &&
            reviews.map((i) => {
              return (
                <ReviewCard
                  name={i.name}
                  rating={i.rating}
                  comment={i.comment}
                  Rid={i._id}
                  setIsReview={setIsReview}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
