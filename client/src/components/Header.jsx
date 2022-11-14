import React from 'react';
import { Link } from "react-router-dom";
import { useState,useEffect, useContext } from 'react';
import {UserContext} from '../Contexts/UserContext'
import './HeaderFooter.css'
import { useLocation } from "react-router-dom";

let navToggle = document.querySelector('.toggle-nav');

const define = () => {
  let close = false;
  navToggle = document.querySelector('.toggle-nav');
  console.log(navToggle)
navToggle && navToggle.addEventListener('click', () => {
  console.log('clickme')
  if(close){
    close = false
    document.body.classList.remove('nav-open');
  }else{
    close = true
  document.body.classList.add('nav-open');
}
});
}



// }

const Header = () => {
const {pageTitle} = useContext(UserContext);

const { pathname } = useLocation();
  console.log(pathname);

  if (pathname === "/login" || pathname === "/logout") return null;


  return (
      
        <header>
        <div className='hamburg'>
            <button  className='toggle-nav'>|||</button>
            {define()}
          </div>
          <div className='logo'> </div>
          <div className='page-name'>
            <h3>{pageTitle}</h3>
        {/* <button > <Link to='/login'>Login Page</Link></button>
    <button > <Link to='/'>Admin Dashboard</Link></button>
    <button > <Link to='/student-account-status'>Student Dashboard</Link></button> */}
    
          </div>
        </header>
  )
}

export default Header