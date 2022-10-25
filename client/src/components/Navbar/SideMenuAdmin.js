import React from 'react'
import { Link } from "react-router-dom";
const SideMenuAdmin = () => {
  return (
    <div>
        <nav>
      <ul>
      <li>
          <Link to="/">Home</Link>
        </li>
        
        <li>
          <Link to="/travel-order">Travel Order</Link>
        </li>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
        <li>
          <Link to="/final-list">Final list</Link>
        </li>
        <li>
          <Link to="/archive">Archive</Link>
        </li>
        {<div>
          <li>
        <Link to="/setting">Setting</Link>
        </li>
        </div> 
          
         }
      </ul>
       
    </nav>


    </div>
  )
}

export default SideMenuAdmin