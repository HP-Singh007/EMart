import React, { useEffect, useState } from 'react'
import '../styles/Order.css'
import Navbar2 from '../components/Product Grid/Navbar2'
import ComponentStepper from '../components/Order/ComponentStepper'
import { Country,State,City } from 'country-state-city'
import { Globe, Home, MapPin, Phone, School } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Order = () => {
    const navigate = useNavigate();
    const [address,setAddress] = useState("");
    const [countryName,setCountryName] = useState("");
    const [country,setCountry] = useState("");
    const [stateName,setStateName] = useState("");
    const [state,setState] = useState("");
    const [city,setCity] = useState("");
    const [phone,setPhone] = useState("");
    const [pin,setPin] = useState("");

    const shippingInfoHandler=()=>{
        if(phone.length!==10){
            return toast.error("Phone number must be of 10 digits");
        }
        if(address===""){
            return toast.error("Please Fill all fields");
        }
        const shippingInfo = {
            address,country,state,city,phone,pin
        }
        localStorage.setItem("ShippingInfo",JSON.stringify(shippingInfo));
        navigate('/order/confirm');
    }

    useEffect(()=>{
        if(localStorage.getItem("ShippingInfo")){
            const shippingInfo = JSON.parse(localStorage.getItem("ShippingInfo"));
            setAddress(shippingInfo.address);
            setCountry(shippingInfo.country);
            setState(shippingInfo.state);
            setCity(shippingInfo.city);
            setPhone(shippingInfo.phone);
            setPin(shippingInfo.pin);
            Country && (setCountryName(Country.getCountryByCode(shippingInfo.country).name));
            State && (setStateName(State.getStateByCodeAndCountry(shippingInfo.state,shippingInfo.country).name));
        }
    },[])

  return (
    <>
      <Navbar2/>
      <div id="placeOrderPage">
        <ComponentStepper activeStep={0}/>
        <div id='shippingForm'>
            <p id='shippingInfoHeading'>SHIPPING INFO</p>
            <div>
                <Phone />
                <input required type="number" name="phone" id="shippingPhone" placeholder='Phone No' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div>
                <Home />
                <input required type="text" name="address" id="shippingAddress" placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <div>
                <Globe />
                <select required name="country" id="shippingCountry" onChange={(e)=>setCountry(e.target.value)}>
                    <option value={country}>{countryName?countryName:"Country"}</option>
                    {
                        Country && Country.getAllCountries().map((item)=>{
                            return <option value={item.isoCode}>{item.name}</option>
                        })
                    }
                </select>
            </div>
            {
                country && (
                    <div>
                        <School />
                        <select required name="state" id="shippingState" onChange={(e)=>setState(e.target.value)}>
                            <option value={state}>{stateName?stateName:"State"}</option>
                            {
                                State && State.getStatesOfCountry(country).map((item)=>{
                                    return <option value={item.isoCode}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                )
            }
            {
                state && (
                    <div>
                        <School />
                        <select required name="city" id="shippingCity" onChange={(e)=>setCity(e.target.value)}>
                            <option value="">{city?city:"City"}</option>
                            {
                                City && City.getCitiesOfState(country,state).map((item)=>{
                                    return <option value={item.name}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                )
            }
            {
                city && (
                    <div>
                        <MapPin />
                        <input required type="text" name="pin" id="shippingPin" placeholder='Pincode' value={pin} onChange={(e)=>setPin(e.target.value)} />
                    </div>
                )
            }
            <input type="button" disabled={city?false:true} id='shippingInfoSubmit' onClick={shippingInfoHandler} value={"Submit"}/>
        </div>
      </div>
    </>
  )
}

export default Order
