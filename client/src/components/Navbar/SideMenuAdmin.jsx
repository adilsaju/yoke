import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import './sideMenu.css';

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
  <div className="mobmen">
      
      {define()}
<div className='logomob'><img src={require('../images/logoWhite.png')} alt='Yoke' /></div>
<div onClick={define()} className='logomob'> <button  className='toggle-nav logomob'><img src={require('../images/logo-cros.png')} alt='Yoke' /></button></div>
{/* <div className='logocros'><img src={require('../images/logo-cros.png')} alt='Yoke' /></div> */}
</div>
      <nav>
      <ul>
        
      <Link to="/"><li className='dashboard'>
          Dashboard
      </li></Link>
        
        <Link to="/travel-order"> <li className="travelOrder">
          Travel Order&nbsp;
          <button className='countInd'><span>{(requests.length)}</span></button>
        </li></Link>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
       
       <Link to="/final-list"> <li className="finalList">
          Final list&nbsp;
          <button className='countInd'><span>{finalstudents.length}</span></button>
        </li></Link>


      <Link to="/history"><li className='archive'>
         History
      </li></Link>

        <div className='setandlog'>
          <Link to="/setting"><li className='settings'>
          Setting
            </li></Link>

           <Link to="/logout"><li className='logout'>
          Logout
           </li></Link>
  
        </div>
      </ul>
      </nav>


    </div>
  )
}

export default SideMenuAdmin