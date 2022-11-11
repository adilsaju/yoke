import React from 'react'
import { useState,useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './sideMenu.css';
import { NavLink } from "react-router-dom";
import { push as Menu } from 'react-burger-menu';
import menu from '../images/menu.svg';
import closeBtn from '../images/closeBtn.svg';


const SideMenu = () => {

  // HAMBURGER
    const [menuOpen, setmenuOpen] = useState(false);

    function handleStateChange (state) {
      setmenuOpen(state.isOpen)
    }

    function closeMenu () {
      setmenuOpen(false)
    }

    function toggleMenu (state) {
      setmenuOpen(state => ({menuOpen: !state.menuOpen}))
    }

    function printWidth(){
      // console.log(window.innerWidth);
      const crossBtn = document.querySelector(".bm-cross-button")

      if (window.innerWidth > 760){
        console.log("Sidebar coming nowww")
        // setisOpenSideBar(false)

        // setisOpenSideBar(true)
        setmenuOpen(true)
      if (crossBtn)
        crossBtn.style.display = "none" 
      }
      else {
      if (crossBtn)
        crossBtn.style.display = "unset" 
      }

    }
    
    useEffect(() => {  
      const repeatMilliSeconds = 100
      var intervalId = window.setInterval(function(){
        // call your function here
        printWidth();
      }, repeatMilliSeconds);

    }, []);


  return (
    <div className='Nav-menu'>
    <Menu isOpen={ menuOpen } 
      onStateChange={(state) => handleStateChange(state)}
      disableCloseOnEsc 
      disableAutoFocus 
      noTransition 
      noOverlay
      customBurgerIcon={ <img src={menu} alt='hamburger menu' /> } 
      customCrossIcon={ <img src={closeBtn} alt='close button' /> }
    >

    <div className="borderRight">
      <div className='logo'>
        <img src={require('../images/logoWhite.png')} alt='Yoke' />
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