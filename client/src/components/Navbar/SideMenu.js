import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
const SideMenu = () => {
  return (
    <div className='Nav-menu'>
  <nav>
      <ul>
      <li>
          <Link to="/student-account-status">Account Status</Link>
        </li>

        <li>
          <Link to="/student-travel-order">Student Travel Order</Link>
        </li>

        <li>
        <Link to="/settingStudent">Setting</Link>
        </li>
        
      </ul>
      </nav>
      </div>
  )
}

export default SideMenu