import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
const SideMenu = () => {
  return (
  <nav>
      <ul>
      <li>
          <Link to="/student-account-status">Account Status</Link>
        </li>

        <li>
          <Link to="/student-travel-order">Student Travel Order</Link>
        </li>
        
      </ul>
      </nav>
  )
}

export default SideMenu