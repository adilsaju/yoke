import React from 'react'
import { useState,useEffect } from 'react';
import Accept from './Accept';
import Decline from './Decline';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import { useParams } from "react-router-dom";
import "./viewprofile.css"
import { Link } from "react-router-dom";
import moment from 'moment';

const fetchTasks = async (request_id) => {
  let url = `/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  return data;
};

const fetchTasks2 = async () => {
  let url = `/pendingRequests`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("reqssss: ",data);
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
  //list of pending requests
  const [requests, setRequests]= useState([])
  const [cnt, setCnt]= useState([])
  const [prevId, setPrevId]= useState("")
  const [nextId, setNextId]= useState("")



  let params = useParams();

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(params.id);

      const tfs2 = await fetchTasks2();
      
      requestStudent(tfs);
      setRequests(tfs2);

      // getCurrentPage(tfs2, tfs)


      tfs.requestedStudent && setNotes(tfs.requestedStudent.notes)
    };
    getTasks();

    const getCurrentPage = (requests, request) => {
      console.log("gcp");
      console.log(requests)
      console.log(request)

      const index = requests.map((el) => el._id).indexOf(request._id);
      console.log("index",index)
      setCnt(index)
      setNextId(requests[index+1]._id)
      setPrevId(requests[index-1]._id)

      return index
    }


    }, []);
    


  return (
    <>
    <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>
    <div className='box'>
      <h3>{request.requestedStudent && request.requestedStudent.name}</h3>

      {cnt>0 && <button>
        <Link to={ `/travel-order/profile/${prevId}` }>left</Link>
        </button>}
      <span>{cnt}</span>
      {cnt<requests.length-1 && <button>
        
        <Link to={ `/travel-order/profile/${nextId}` }>right</Link>
        </button>}
      {/* {requests.length} */}

      <div className='studentimage'>
      <img src= {request.requestedStudent && request.requestedStudent.photo}/>

      <div className='studentviews'>
        <h4>student number: {request.requestedStudent && request.requestedStudent.studentNumber}</h4>
        {/* <h4>student id: {request.requestedStudent && request.requestedStudent._id}</h4> */}
        <h4>travel date: {moment(request.requestedStudent && request.flightDate).format("MMMM Do , YYYY")}</h4>
        
        <h4>current license: {request.requestedStudent && request.requestedStudent.studentRequirements.licenseType}</h4>
          <h4>current program: {request.requestedStudent && request.requestedStudent.program}</h4>
          <h4>Hours flown: {request.requestedStudent && request.requestedStudent.studentRequirements.flownHours}</h4>
        </div>
      </div>

      <h3>License Documents :</h3>
      <div className='studentimage'>
        <div>
        <img src={request.requestedStudent && request.requestedStudent.studentRequirements.license}></img>
        <p>Pilot License</p>
        </div>

        <div>
        <img src={request.requestedStudent && request.requestedStudent.studentRequirements.medicalLicense}></img>
        <p>Medical License</p>
        </div>

        <div>
        <img src={request.requestedStudent && request.requestedStudent.studentRequirements.radioLicense}></img>
        <p>Radio License</p>
        </div>

        <div>
        <img src={request.requestedStudent && request.requestedStudent.studentRequirements.englishProficiency}></img>
        <p>English Proficiency</p>
        </div>


      </div>
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