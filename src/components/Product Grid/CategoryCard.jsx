import React from "react";
import "../../styles/CategoryCard.css";

const CategoryCard = (props) => {
  const CategoryHandler = (name) => {
    props.setCategory(name);
    props.setPage(1);
  };

  return (
    <div
      id="categoryCard"
      className={props.category === props.name ? "activeCategory" : ""}
      onClick={() => CategoryHandler(props.name)}
    >
      <img src={props.image} alt="product" />
      <p>{props.name}</p>
    </div>
  );
};

export default CategoryCard;
