import React from 'react'
import SideMenuAdmin from './Navbar/SideMenuAdmin'
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
}

useEffect(() => {
  
  
  
  // handleClick();

}, []);


  return (

    <div>
      {/* <div className='fullpage'> */}
      {/* <SideMenuAdmin /> */}
      {/* <div className='division'> */}
        
       <br />
        <form action="none">
            <label htmlFor="LoginId">Username :  </label>
            <input type="text" />
                <br />
                <br />
            <label htmlFor="Password">Password :  </label>
            <input type="text" />
            <br />
            <br />
            <input type="submit" />
        </form>
        <br />
        {/* </div> */}
        {/* </div> */}
    </div>
  )
}

export default LoginPage