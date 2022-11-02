import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './sideMenu.css';

const SideMenu = () => {
  return (
    <div className='Nav-menu'>
  <nav>
      <ul>
      <Link to="/student-account-status">
      <li>
          Account Status
        </li></Link>

        <Link to="/student-travel-order"> <li>
          Student Travel Order
        </li></Link>

        <Link to="/settingStudent"> <li>
        Setting
        </li></Link>
        
        <Link to="/logout"> <li>
        Logout
        </li></Link>
  
      </ul>
      </nav>
      </div>
  )
}

export default SideMenu