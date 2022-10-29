import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div >
        <header>
        <img src={require('../yokelg.png')} />
        <div className='page-name'>
        <h3>Travel Order
        <button > <Link to='/login'>Login Page</Link></button>
    <button > <Link to='/'>Admin Dashboard</Link></button>
    <button > <Link to='/student-account-status'>Student Dashboard</Link></button>
    </h3>
        </div>
        </header>
    </div>
  )
}

export default Header