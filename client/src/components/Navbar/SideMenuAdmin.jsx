import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
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

const closemenuonclick = () => {


    document.body.classList.remove('nav-open');
 

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
<button onClick={(e) => { define()}} className='crosbtn'><img src={require('../images/logo-cros.png')} alt='Yoke' /></button>
      {define()}
</div>
      <nav>
      <ul>
        
      <Link to="/"><li onClick={(e) => { closemenuonclick()}} className='dashboard'>
          Dashboard
      </li></Link>
        
        <Link to="/travel-order"> <li onClick={(e) => { closemenuonclick()}} className="travelOrder">
          Travel Order&nbsp;
          <button className='countInd'><span>{(requests.length)}</span></button>
        </li></Link>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
       
       <Link to="/final-list"> <li onClick={(e) => { closemenuonclick()}} className="finalList">
          Final list&nbsp;
          <button className='countInd'><span>{finalstudents.length}</span></button>
        </li></Link>


      <Link to="/history"><li onClick={(e) => { closemenuonclick()}} className='archive'>
         History
      </li></Link>

        <div className='setandlog'>
          <Link to="/setting"><li onClick={(e) => { closemenuonclick()}} className='settings'>
          Setting
            </li></Link>

           <Link to="/logout"><li onClick={(e) => { closemenuonclick()}} className='logout'>
          Logout
           </li></Link>
  
        </div>
      </ul>
      </nav>


    </div>
  )
}

export default SideMenuAdmin