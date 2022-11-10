import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './sideMenu.css';
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className='Nav-menu'>
  <nav>
      <ul className="studentMenu">
        <NavLink activeClassName="active" to="/student-account-status" className='studentAcct'>
          <li>
            Account Status
          </li>
        </NavLink>

        <NavLink activeClassName="active" to="/student-travel-order" className="travelOrder"> 
          <li>
            Student Travel Order
          </li>
        </NavLink>

        {/* <Link to="/settingStudent"> 
          <li className='settings'>
          Setting
          </li>
        </Link> */}
        
        <NavLink activeClassName="active" to="/logout" className='logout'> 
          <li>
          Logout
          </li>
        </NavLink>
  
      </ul>
      </nav>
      </div>
  )
}

export default SideMenu