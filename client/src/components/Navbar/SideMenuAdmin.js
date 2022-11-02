import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import './sideMenu.css';


const SideMenuAdmin = () => {
  return (
    <div className='Nav-menu'>
  
      <nav>
      <ul>
      <Link to="/"><li className='dashboard'>
          Dashboard
      </li></Link>
        
        <Link to="/travel-order"> <li>
          Travel Order
        </li></Link>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
       
       <Link to="/final-list"> <li>
          Final list
        </li></Link>


      <Link to="/archive"><li className='archive'>
          Archive
      </li></Link>

        {<div>
      <Link to="/setting"><li className='settings'>
          Setting
      </li></Link>

      <Link to="/logout"><li className='logout'>
          Logout
      </li></Link>
  
        </div>}
      </ul>
      </nav>


    </div>
  )
}

export default SideMenuAdmin