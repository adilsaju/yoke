import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import './sideMenu.css';


const SideMenuAdmin = () => {

  const [requests,setRequests] = useState([]);
  const [finalstudents,FinalStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {  
   setTimeout(() => {
    fetch(`/pendingRequests`).then(res => {
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
     fetch(`/finalList`).then(res => {
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
      <Link to="/"><li className='dashboard'>
          Dashboard
      </li></Link>
        
        <Link to="/travel-order"> <li className="travelOrder">
          Travel Order
          ({(requests.length)})
        </li></Link>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
       
       <Link to="/final-list"> <li className="finalList">
          Final list({finalstudents.length})
        </li></Link>


      <Link to="/archive"><li className='archive'>
          Archive
      </li></Link>

        {<div>
      <Link to="/setting"><li className='settings'>
          Setting
      </li></Link>

      <Link to="/logout"><li className='logout'>
          Logout
      </li></Link>
  
        </div>}
      </ul>
      </nav>


    </div>
  )
}

export default SideMenuAdmin