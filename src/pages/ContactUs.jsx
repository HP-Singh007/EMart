import React from 'react'
import Navbar2 from '../components/Product Grid/Navbar2'
import '../styles/ContactUs.css'
import profile from '../images/profile.jpg'

const ContactUs = () => {
  return (
    <>
      <Navbar2/>
      <div id="contactPage">
        <div id='contactLeft'>
            <h2>Name : Harmanpreet Singh</h2>
            <h2>Email : ecommerceshopifycse@gmail.com</h2>
        </div>
        <div id='contactRight'>
            <img src={profile} alt="profile" />
        </div>
      </div>
    </>
  )
}

export default ContactUs
