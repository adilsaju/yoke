import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';

const SideMenuAdmin = () => {
  const [requests,setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [finalstudents,FinalStudents] = useState([]);

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
      <Link to="/"><li>
          Home
        </li></Link>
        
        <Link to="/travel-order"> <li>
          Travel Order({(requests.length)})
        </li></Link>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
       
       <Link to="/final-list"> <li>
          Final list({(finalstudents.length)})
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