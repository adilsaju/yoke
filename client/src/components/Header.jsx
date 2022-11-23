import React from 'react';
import { Link } from "react-router-dom";
import { useState,useEffect, useContext } from 'react';
import {UserContext} from '../Contexts/UserContext'
import './HeaderFooter.css'
import { useLocation } from "react-router-dom";



let navToggle = document.querySelector('.openbtn');


const define = () => {
  console.log('yoloooo')

  navToggle = document.querySelector('.openbtn');
  console.log(navToggle)
navToggle && navToggle.addEventListener('click', () => {
  console.log('clickme')

    document.body.classList.add('nav-open');

});
}



// }

const Header = () => {
const {pageTitle} = useContext(UserContext);

const { pathname } = useLocation();
  console.log(pathname);

  if (pathname === "/login" || pathname === "/logout" || pathname === "/landing") return null;


  return (
      
        <header>
        <div className='hamburg'>
        <button onClick={(e) => { define()}} className='openbtn'><img src={require('./images/menu-logo.png')} alt='Yoke' /></button>
      {define()}
          </div>
          <div className='logo'><img src={require('./images/logoWhite.png')} alt='Yoke' /></div>
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