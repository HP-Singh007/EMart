import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Intro.css";

const Intro = () => {
  return (
    <>
      <div className="intro"></div>
      <div id="introLine">
        <p>
          Discover the joy of convenient shopping at{" "}
          <b>
            <i>E-Mart</i>
          </b>
          .
        </p>
        <p>
          From A to Z, we have the products that make your life easier,
          trendier, and more enjoyable.
        </p>
        <Link to="/products">SHOP NOW</Link>
      </div>
    </>
  );
};

export default Intro;
