import React from 'react'
import { useState,useEffect, useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext'
import SideMenu from '../Navbar/SideMenu';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";


const req = async (flightDate, loggedInUser) => {
  console.log("VERYYY KKKKKK: ", flightDate);
  let url = `/requests`;

  let flightDate2 = moment(flightDate).format("MMMM Do , YYYY")
  console.log(flightDate2)
const bod1 = {
  "flightDate" : new Date(flightDate),
  "studentId": `${loggedInUser.id}`
}

  const res = await fetch(url, 
    {
      method: 'POST', 
     body: JSON.stringify(bod1),  
     headers: { 'Content-Type': 'application/json'}, 
    }
    );

  const data = await res.json();

  alert(`Booking Submitted for date: ${flightDate2}`);

   console.log("IMPPPPPPPPPPPPP:",data);

  return data;
};

const RequestTravelOrder = () => {
  const {loggedInUser, loginCredentials} = useContext(UserContext)
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className='fullpage'>
      <SideMenu />  
      <div className='division'>
    
    <h2>Request Travel Order</h2>
    <div>
    <div className='Clendr'>
    <Calendar onChange={onChange} value={value} />
    {console.log(value)}
    </div>
    {/* <input type="date" /> <br /> */}
    <button onClick={() => { req(value, loginCredentials.loggedInUser)} } >Submit</button>
    </div>
    </div>
    </div>
    </>

  )
}

export default RequestTravelOrder
