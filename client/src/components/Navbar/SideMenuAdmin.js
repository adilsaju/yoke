import React from 'react'
import { Link } from "react-router-dom";

const SideMenuAdmin = () => {
  return (
    <div className='Nav-menu'>
  
        <nav>
      <ul>
      <Link to="/"><li>
          Home
        </li></Link>
        
        <Link to="/travel-order"> <li>
          Travel Order
        </li></Link>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
       
       <Link to="/final-list"> <li>
          Final list
        </li></Link>


        <Link to="/archive"> <li>
          Archive
        </li></Link>
        {<div>
          <Link to="/setting"><li>
        Setting
        </li></Link>

        <Link to="/logout"> <li>
        Logout
        </li></Link>
  
        </div> 
          
         }
      </ul>
       
    </nav>


    </div>
  )
}

export default SideMenuAdmin