import React from 'react';
import { Link } from "react-router-dom";
import { useState,useEffect, useContext } from 'react';
import {UserContext} from '../Contexts/UserContext'
import './HeaderFooter.css'
import { useLocation } from "react-router-dom";


const Header = () => {
const {pageTitle} = useContext(UserContext);

const { pathname } = useLocation();
  console.log(pathname);
  if (pathname === "/login" || pathname === "/logout") return null;


  return (
        <header>
          {/* <div className='logo'>
            <img src={require('./images/logoWhite.png')} alt='' />
          </div> */}
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