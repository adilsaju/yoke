import React from 'react'



const req = async (flightDate) => {
  console.log("VERYYY KKKKKK: ", flightDate);
  let url = `/requests`;
//   const bod1 = {
//     "studentId": `${studentId}`
// }

const bod1 = {
  "flightDate" : new Date(flightDate),
  "studentId": "633a0695b149556c00bfc725"
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
  return (
    <>
    <h2>Request Travel Order</h2>
    <div>
    <input type="date" /> <br />
    <button onClick={(e) => { req(e.target.parentElement.firstChild.value)} } >Submit</button>
    </div>
    </>

  )
}

export default RequestTravelOrder