import React from "react";
import Navbar2 from "../components/Product Grid/Navbar2";
import "../styles/ContactUs.css";
import profile from "../images/profile.jpg";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <>
      <Navbar2 />
      <div id="contactPage">
        <div id="contactLeft">
          <motion.p className="contactHeading" initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.5,delay:0.2}} >About E-Mart</motion.p>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5,delay:0.5}}>
            Welcome to E-Mart, where passion meets convenience! Our journey
            began with a simple idea: to provide enthusiasts with a one-stop
            destination for high-quality, stylish, and innovative solutions.
          </motion.p>
          <motion.p className="contactHeading" initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.5,delay:0.2}} >Our Story</motion.p>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5,delay:0.5}}>
            Established in 2024, E-Mart was founded by Mr. Harmanpreet Singh
            with a vision to serve people with best quality products. 
            Here are some reasons why our customers choose us:
            <ul>
              <li><b>Quality Matters:</b> We believe in offering nothing but the best. Our products undergo
            rigorous quality checks to ensure they meet the highest standards.</li>
            <li><b>Innovation at Its Core:</b> E-Mart is committed to staying ahead of the curve. We embrace innovation and constantly update our offerings to
            reflect the latest trends and advancements.</li>
            </ul>
          </motion.p>
          <motion.p className="contactHeading" initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.5,delay:0.2}} >Join Our Community</motion.p>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5,delay:0.5}}>
            We invite you to join the E-Mart family and become part of a
            community that shares your passion. Whether you're a seasoned
            enthusiast or a curious newcomer, there's a place for you here.
          </motion.p>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5,delay:0.5}}>
            Thank you for choosing E-Mart. Let's embark on this exciting journey
            together! 
          </motion.p>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5,delay:0.5}}>E-Mart Team</motion.p>
        </div>
        <div id="contactRight">
          <img src={profile} alt="profile" />
          <h6>Name : Harmanpreet Singh</h6>
          <h6>Email : ecommerceshopifycse@gmail.com</h6>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
