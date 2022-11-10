import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import './sideMenu.css';
import { NavLink } from "react-router-dom";


const SideMenuAdmin = () => {

  const [requests,setRequests] = useState([]);
  const [finalstudents,FinalStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {  
   setTimeout(() => {
    fetch(`/api/pendingRequests`).then(res => {
      if(!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      console.log("TOOO: data");
      setRequests(data);
      setError(null);
    }).catch(err => {
      setError(err.message)
    })
   },1000)
  }, []);

  useEffect(() => {
    setTimeout(() => {
     fetch(`/api/finalList`).then(res => {
       if(!res.ok) {
         throw Error(res.statusText);
       }
       return res.json();
     })
     .then(data => {
       FinalStudents(data);
       setError(null);
     }).catch(err => {
       setError(err.message)
     })
    },1000)

}, []);

  return (
    <div className='Nav-menu'>
  
      <nav>
      <ul>
      <NavLink activeClassName="active" to="/dashboard" className='dashboard'><li >
          Dashboard
      </li></NavLink>
        
      <NavLink activeClassName="active" to="/travel-order" className="travelOrder"> <li>
        Travel Order&nbsp;
        <button className='countInd'><span>{(requests.length)}</span></button>
      </li></NavLink>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
       
       <NavLink activeClassName="active" to="/final-list" className="finalList"> <li>
          Final list&nbsp;
          <button className='countInd'><span>{finalstudents.length}</span></button>
        </li></NavLink>


      <NavLink activeClassName="active" to="/archive" className='archive'><li>
         History
      </li></NavLink>

        {<div>
      <NavLink activeClassName="active" to="/setting" className='settings'><li>
          Setting
      </li></NavLink>

      <NavLink activeClassName="active" to="/logout" className='logout'><li>
          Logout
      </li></NavLink>
  
        </div>}
      </ul>
      </nav>


    </div>
  )
}

export default SideMenuAdmin