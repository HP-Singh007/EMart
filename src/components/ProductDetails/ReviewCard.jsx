import React, { useContext } from "react";
import profile from "../../images/avatar.png";
import "../../styles/ReviewCard.css";
import { Rating } from "react-simple-star-rating";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {Context, server} from '../../index'
import axios from "axios";
import { useParams } from "react-router-dom";

const ReviewCard = ({ Rid, name, rating, comment, setIsReview, avatar }) => {

  const {id} = useParams();
  const {isAdmin} = useContext(Context);

  const ratingObj = {
    readonly: true,
    allowFraction: true,
    size: 30,
  };

  const deleteReviewHandler=async()=>{
    try{
      const {data} = await axios.delete(`${server}/products/review/${id}`,{
        withCredentials:true,
        params:{
          reviewId:Rid
        }
      })

      toast.success(data.message);
      setIsReview((val)=>!val);
    }
    catch(err){
      toast.error(err.response.data.message);
    }
  }

  return (
    <div id="reviewCard">
      <div id="reviewCardLeft">
        {avatar?<img src={`${avatar.url}`} alt='avatar'/>:<img src={profile} alt='profile'></img>}
        <p>{name}</p>
      </div>
      <div id="reviewCardRight">
        <Rating {...ratingObj} initialValue={rating} />
        <p>{comment}</p>
      </div>
      <div id='reviewCardDel'>
      {
      isAdmin?(
          <Trash2 color="red" onClick={deleteReviewHandler}/>
          ):(<></>)
      }
      </div>
    </div>
  );
};

export default ReviewCard;
