import React from 'react'
import logo from '../../images/logo1.png'
import social from '../../images/social.png'
import '../../styles/Footer.css'

const Footer = () => {
  const category=['Mobile','Electronics','Men Wear','Women Wear','Kitchenware','Furniture'];

  return (
    <footer>
      <div id='leftFooter'>
        <h2>CATEGORIES</h2>
        <ul>
          {
            category.map((i)=>{
              return <li>{i}</li>
            })
          }
        </ul>
      </div>

      <div id='midFooter'>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>&copy; HPS 2024</div>
      </div>

      <div id='rightFooter'>
        <h2>CONTACT</h2>
        <p>Email : ecommerceshopifycse@gmail.com</p>
        <img src={social} alt="social handles" />
      </div>
    </footer>
  )
}

export default Footer
