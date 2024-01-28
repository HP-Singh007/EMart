import React from "react";
import Navbar2 from "../components/Product Grid/Navbar2";
import "../styles/ContactUs.css";
import profile from "../images/profile.jpg";

const ContactUs = () => {
  return (
    <>
      <Navbar2 />
      <div id="contactPage">
        <div id="contactLeft">
          <p className="contactHeading">About E-Mart</p>
          <p>
            Welcome to E-Mart, where passion meets convenience! Our journey
            began with a simple idea: to provide enthusiasts with a one-stop
            destination for high-quality, stylish, and innovative solutions.
          </p>
          <p className="contactHeading">Our Story</p>
          <p>
            Established in 2024, E-Mart was founded by Mr. Harmanpreet Singh
            with a vision to serve people with best quality products. 
            Here are some reasons why our customers choose us:
            <ul>
              <li><b>Quality Matters:</b> We believe in offering nothing but the best. Our products undergo
            rigorous quality checks to ensure they meet the highest standards.</li>
            <li><b>Innovation at Its Core:</b> E-Mart is committed to staying ahead of the curve. We embrace innovation and constantly update our offerings to
            reflect the latest trends and advancements.</li>
            </ul>
          </p>
          <p className="contactHeading">Join Our Community</p>
          <p>
            We invite you to join the E-Mart family and become part of a
            community that shares your passion. Whether you're a seasoned
            enthusiast or a curious newcomer, there's a place for you here.
          </p>
          <p>
            Thank you for choosing E-Mart. Let's embark on this exciting journey
            together! 
          </p>
          <p>E-Mart Team</p>
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
