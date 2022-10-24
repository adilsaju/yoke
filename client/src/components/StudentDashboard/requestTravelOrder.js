import React from 'react'
import { useState,useEffect, useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext'

const req = async (flightDate, loggedInUser) => {
  console.log("VERYYY KKKKKK: ", flightDate);
  let url = `/requests`;
//   const bod1 = {
//     "studentId": `${studentId}`
// }

const bod1 = {
  "flightDate" : new Date(flightDate),
  "studentId": `${loggedInUser.id}`
}

  const res = await fetch(url, {method: 'POST', body: JSON.stringify(bod1),     headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();
  alert(`Booking Submitted for date: ${flightDate}`)
  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const RequestTravelOrder = () => {
  const {loggedInUser} = useContext(UserContext)

  return (
    <>
    <h2>Request Travel Order</h2>
    <div>
    <input type="date" /> <br />
    <button onClick={(e) => { req(e.target.parentElement.firstChild.value, loggedInUser)} } >Submit</button>
    </div>
    </>

  )
}

export default RequestTravelOrder