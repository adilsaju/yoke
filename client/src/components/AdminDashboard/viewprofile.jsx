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

const updateStudentNotes = async (request, newNote) => {
  let url = `/students/${request.requestedStudent._id}`;
  const bod1 = {
    "notes": `${newNote}`
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
  const [request,requestStudent] = useState([]);
  const [notes,setNotes] = useState("");


  let params = useParams();

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(params.id);
      requestStudent(tfs);
      tfs.requestedStudent && setNotes(tfs.requestedStudent.notes)
    };
    getTasks();
  }, []);

  return (
    <>
    <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>
    <div className='box'>
      <h3>{request.requestedStudent && request.requestedStudent.name}</h3>

      <div className='studentimage'>
      <img src= {request.requestedStudent && request.requestedStudent.photo}/>

      <div className='studentviews'>
        <h4>student number: {request.requestedStudent && request.requestedStudent.studentNumber}</h4>
        {/* <h4>student id: {request.requestedStudent && request.requestedStudent._id}</h4> */}
        <h4>travel date: {request.requestedStudent && request.flightDate}</h4>
        <h4>current license: {request.requestedStudent && request.requestedStudent.studentRequirements.licenseType}</h4>
          <h4>current program: {request.requestedStudent && request.requestedStudent.program}</h4>
          <h4>Hours flown: {request.requestedStudent && request.requestedStudent.studentRequirements.flownHours}</h4>
        </div>
      </div>

      <h4>License images will be shown here......</h4>
      <div className='notes'>
        <h4>Notes</h4>
        <textarea name="" id="" cols="30" rows="10" value={notes}   onChange={e => setNotes(e.target.value)}  ></textarea> <br />
      
      <button onClick={(e) => { updateStudentNotes(request, notes)}}  >Update Notes</button>
      </div>

      <h4>Req Id: {params.id}</h4>
      { <div className='approveDecline'>
      <Accept/>
      <Decline/>
      </div> }
    </div>
    </div>
    </div>
    </>

  )
}

export default Viewprofile