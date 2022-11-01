import React from 'react';
import { Link } from "react-router-dom";
import { useState,useEffect, useContext } from 'react';
import {UserContext} from '../Contexts/UserContext'

const Header = () => {
  const {pageTitle} = useContext(UserContext)


  return (
    <div >
        <header>
          <div className='logoo'>
        <img src={require('../yokelg.png')} />
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