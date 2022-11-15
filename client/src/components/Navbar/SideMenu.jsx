import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './sideMenu.css';

let navToggle = document.querySelector('.toggle-nav');

const define = () => {
  console.log('init')
//   let close = true;
//   navToggle = document.querySelector('.toggle-nav');
//   console.log(navToggle)
// navToggle && navToggle.addEventListener('click', () => {
//   console.log('clickme')
//   if(close){
//     close = false
//     document.body.classList.add('nav-open');
//   }else{
//     close = true
//   document.body.classList.remove('nav-open');
// }
// });
}

const SideMenu = () => {
  return (
    <div className='Nav-menu'>
      <div className="mobmen">
      
            {define()}
      <div className='logomob'><img src={require('../images/logoWhite.png')} alt='Yoke' /></div>
      <div onClick={define()} className='logomob'> <button  className='toggle-nav logomob'><img src={require('../images/logo-cros.png')} alt='Yoke' /></button></div>
      {/* <div className='logocros'><img src={require('../images/logo-cros.png')} alt='Yoke' /></div> */}
      </div>

      
  <nav>
    
  
      <ul className="studentMenu">
        <Link to="/student-account-status">
          <li className='studentAcct'>
            Account Status
          </li>
        </Link>

        <Link to="/student-travel-order"> 
          <li className="travelOrder">
            Student Travel Order
          </li>
        </Link>

        {/* <Link to="/settingStudent"> 
          <li className='settings'>
          Setting
          </li>
        </Link> */}
        
        <Link to="/logout"> 
          <li className='logout'>
          Logout
          </li>
        </Link>
  
      </ul>
      </nav>
      </div>
  )
}

export default SideMenu