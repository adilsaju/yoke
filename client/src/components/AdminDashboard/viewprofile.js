import React from 'react'
import { useState,useEffect } from 'react';
import Accept from './Accept';
import Decline from './Decline';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import { useParams } from "react-router-dom";
import "./viewprofile.css"

const fetchTasks = async (request_id) => {
  let url = `/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  return data;
};

const approve = async (request) => {
  let url = `/requests/${request._id}/approve`;
//   const bod1 = {
//     "adminId": `${adminId}`
// }

const bod1 = {
  "adminId": `633a0695b149556c00bfc720`
}

  const res = await fetch(url, {method: 'PATCH',
   body: JSON.stringify(bod1), 
      headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();
  alert("APPROVED!")
  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const decline = async (request) => {
  let url = `/requests/${request._id}/decline`;
  const bod1 = {
    "adminId": `633a0695b149556c00bfc720`
  }
  const res = await fetch(url, {method: 'PATCH', body: JSON.stringify(bod1),     headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();
  alert("DECLINED!")

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const updateStudentNotes = async (request, newNote) => {
  let url = `/request/${request.requestedStudent._id}`;
  const bod1 = {
    "notes": "asdsadasdsaads asdkldjalks"
    }
  const res = await fetch(url, {method: 'PATCH',
   body: JSON.stringify(bod1),  
     headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const Viewprofile = () => {
  const [request,setStudents] = useState([]);
  let params = useParams();

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(params.id);
      setStudents(tfs);
    };
    getTasks();
  }, []);

  return (
    <>
      <SideMenuAdmin/>
    <div className='box'>
      <h3>{request.requestedStudent && request.requestedStudent.name}</h3>

      <h4>student number: {request.requestedStudent && request.requestedStudent.studentNumber}</h4>
      {/* <h4>student id: {request.requestedStudent && request.requestedStudent._id}</h4> */}

      <h4>travel date: {request.requestedStudent && request.requestedStudent.flightDate}</h4>

      <h4>current license: {request.requestedStudent && request.requestedStudent.studentRequirements.licenseType}</h4>
      <h4>current program: {request.requestedStudent && request.requestedStudent.program}</h4>

      <h4>Hours flown: {request.requestedStudent && request.requestedStudent.studentRequirements.flownHours}</h4>

      <h4>License images will be shown here......</h4>

      <textarea name="" id="" cols="30" rows="10" value={request.requestedStudent && request.requestedStudent.notes}></textarea> <br />
      <button onClick={(e) => { updateStudentNotes(request, e.target.value)} }>Update Notes</button>


      <h4>Req Id: {params.id}</h4>
      {/* <div>
      <Accept/>
      <Decline/>
      </div> */}
      { (!request.isApproved) && <button onClick={(e) => { approve(request)} }>Approve</button> }
     { (!request.isRejected) && <button onClick={(e) => { decline(request)} }>Decline</button> }
    </div>
    </>

  )
}

export default Viewprofile