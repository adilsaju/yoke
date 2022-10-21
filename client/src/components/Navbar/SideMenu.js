import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
const SideMenu = () => {
  return (
  
      <ul>
   

        <li>
          <Link to="/student-travel-request">Student Travel Order</Link>
        </li>
        <li>
          <Link to="/student-account-status">Account Status</Link>
        </li>
      </ul>

  )
}

export default SideMenu