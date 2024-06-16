import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Intro.css";
import {Typewriter} from "react-simple-typewriter"
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
          From A to Z, we have the products that make your life 
          <span>
            <Typewriter  words={[' easier',' trendier',' enjoyable']} loop={100} cursor typeSpeed={100} deleteSpeed={50} delaySpeed={1000}/>
          </span>
        </p>
        <Link to="/products">SHOP NOW</Link>
      </div>
    </>
  );
};

export default Intro;
