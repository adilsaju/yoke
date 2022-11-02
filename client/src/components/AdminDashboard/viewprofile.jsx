import React from 'react'
import { useState,useEffect } from 'react';
import Accept from './Accept';
import Decline from './Decline';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import { useParams } from "react-router-dom";
import "./viewprofile.css"
import { Link } from "react-router-dom";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import leftArrowBtn from '../images/leftArrow.svg';
import rightArrowBtn from '../images/rightArrow.svg';
import toast, { Toaster } from 'react-hot-toast';
const notify1 = (studentName) => toast(`Notes of ${studentName} updated successfully`);


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
  if (data)
  {
    notify1(request.requestedStudent.name)
  }
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
  console.log("previd",prevId);
  console.log("nextId",nextId);

  // const history = useHistory()
  const navigate = useNavigate();



  let params = useParams();

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(params.id);

      const tfs2 = await fetchTasks2();
      
      requestStudent(tfs);
      setRequests(tfs2);

      setCurrentPage(tfs2, tfs)


      tfs.requestedStudent && setNotes(tfs.requestedStudent.notes)
    };
    getTasks();



    }, []);
    
    const setCurrentPage = (requests, request) => {
      console.log("setCurrentPage raan");
      console.log("gcp");
      console.log(requests)
      console.log(request)

      const index = requests.map((el) => el._id).indexOf(request._id);
      console.log("index",index)
      setCnt(index)
      console.log("hoooo", requests, index)
      index < requests.length-1 && setNextId(requests[index+1]._id)
      index > 0 && setPrevId(requests[index-1]._id)
      console.log("prevId", prevId);


      return index
    }


  return (
    <>
    <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>
        <div className="backBar">
          <button  onClick={(e) => { navigate(-1)  }}  >
            Back 
          </button>
        </div>


        <div className='box'>
          <div className="topOfTheBox">
            <h3>{request.requestedStudent && request.requestedStudent.name}</h3>

            <div className="pagination">
              
              {cnt>0 &&
                <Link to={ `/travel-order/profile/${prevId}` } onClick={(e)=>{ setCurrentPage() }}  ><button className="leftBtn">
                  <img src={leftArrowBtn} alt='left-button' /></button>
                </Link>}
              <span className="fontFira">{cnt}</span>
              {cnt<requests.length-1 &&
              
                <Link to={ `/travel-order/profile/${nextId}` } onClick={(e)=>{ setCurrentPage() }}   >
                  <button className="rightBtn"><img src={rightArrowBtn} alt='right-button' /></button>
                  </Link>}
              {/* {requests.length} */}
            </div>
          </div>

          <div className='studentimage'>
            <img src= {request.requestedStudent && request.requestedStudent.photo} className='studentImg' />

            <div className='studentviews'>
              <div>
                <h4>Student Number:&nbsp;</h4>
                <span>{request.requestedStudent && request.requestedStudent.studentNumber}</span>
              </div>

              {/* <h4>student id: {request.requestedStudent && request.requestedStudent._id}</h4> */}

              <div>
                <h4>Travel Date:&nbsp;</h4>
                <span>{moment(request.requestedStudent && request.flightDate).format("MMMM Do , YYYY")}</span>
              </div>
              
              <div>
                <h4>Current License:&nbsp;</h4>
                <span>{request.requestedStudent && request.requestedStudent.studentRequirements.licenseType}</span>
              </div>
                
              <div>
                <h4>Current Program:&nbsp;</h4>
                <span>{request.requestedStudent && request.requestedStudent.program}</span>
              </div>
                
              <div>
                <h4>Hours Flown:&nbsp;</h4>
                <span>{request.requestedStudent && request.requestedStudent.studentRequirements.flownHours}</span>
              </div>
            </div>
            {/* end of studentimage */}

          </div>
          {/* end of studentimage */}

          
          <div className='licenseimage'>
            <h3>License Documents</h3>
            <div className="studentimage">
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
          </div>

          <div className='notes'>
            <h4>Notes</h4>
            <div className="noteWrapper">
              <textarea name="" id="" cols="40" rows="10" value={notes}   onChange={e => setNotes(e.target.value)}  ></textarea> <br />
              <button className="dBlueBtn" onClick={(e) => { updateStudentNotes(request, notes)}}  >Update Notes</button>
            </div>
            {/* end of noteWrapper */}
          </div>
          {/* end of notes */}

          <h4 className="visually-hidden">Req Id: {params.id}</h4>
            { <div className='approveDecline'>
            <Accept/>
            <Decline/>
            </div> }
        </div>
        {/* end of box */}

      </div>
      {/* end of division */}

    </div>
    {/* end of full page */}
    <Toaster />
    </>

  )
}

export default Viewprofile