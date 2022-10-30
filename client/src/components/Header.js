import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div >
        <header>
          <div className='logoo'>
        <img src={require('../yokelg.png')} />
        </div>
        <div className='page-name'>
        <h3>Travel Order</h3>
        {/* <button > <Link to='/login'>Login Page</Link></button>
    <button > <Link to='/'>Admin Dashboard</Link></button>
    <button > <Link to='/student-account-status'>Student Dashboard</Link></button> */}
    
        </div>
        </header>
    </div>
  )
}

export default Header