import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './sideMenu.css';
import '../HeaderFooter.css'

let navToggle = document.querySelector('.crosbtn');


const define = () => {

  
  navToggle = document.querySelector('.crosbtn');
  console.log(navToggle)
navToggle && navToggle.addEventListener('click', () => {
  console.log('clickme')

    document.body.classList.remove('nav-open');
 
});
}

const SideMenu = () => {
  return (
    <div className='Nav-menu'>
      <div className="mobmen">
      
           
      <div className='logomob'><img src={require('../images/logoWhite.png')} alt='Yoke' /></div>
      <button onClick={(e) => { define()}} className='crosbtn'><img src={require('../images/logo-cros.png')} alt='Yoke' /></button>
      {define()}
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