import React from 'react';
import { Link } from "react-router-dom";
import { useState,useEffect, useContext } from 'react';
import {UserContext} from '../Contexts/UserContext'
import './HeaderFooter.css'
import { useLocation } from "react-router-dom";

let navToggle = document.querySelector('.toggle-nav');

const define = () => {
  navToggle = document.querySelector('.toggle-nav');
 


if(navToggle){
navToggle.addEventListener('click', () => {
  console.log('clickme')
  document.body.classList.toggle('nav-open');
});
}
} 


// }

const Header = () => {
const {pageTitle} = useContext(UserContext);

const { pathname } = useLocation();
  console.log(pathname);

  if (pathname === "/login" || pathname === "/logout") return null;


  return (
    <div >
      
        <header>
        <div className='hamburg'>
            <button onFocus={define} className='toggle-nav'>///</button>
          </div>
          <div className='logo'>
            <img src={require('./images/logoWhite.png')} alt='' />
          </div>
          <div className='page-name'>
            <h3>{pageTitle}</h3>
        {/* <button > <Link to='/login'>Login Page</Link></button>
    <button > <Link to='/'>Admin Dashboard</Link></button>
    <button > <Link to='/student-account-status'>Student Dashboard</Link></button> */}
    
          </div>
        </header>
    </div>
  )
}

export default Header