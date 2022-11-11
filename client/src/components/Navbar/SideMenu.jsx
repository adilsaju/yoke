import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './sideMenu.css';
import { NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';


const SideMenu = () => {
  return (
    <div className='Nav-menu'>
  <Menu isOpen={ true } disableCloseOnEsc disableAutoFocus>

    <div className="borderRight">
      <div className='logo'>
        <img src={require('../images/logoWhite.png')} alt='' />
      </div>
    </div>


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
  </Menu>
      </div>
  )
}

export default SideMenu