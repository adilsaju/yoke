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
// import toast, { Toaster } from 'react-hot-toast';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify1 = (studentName) => toast(`Notes of ${studentName} updated successfully`);


const fetchTasks = async (request_id) => {
  let url = `/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  
  return data;
};
const fetchTasks3 = async (id) => {
  let url = `/students/${id}`;
  const res = await fetch(url);
  const studentData = await res.json();
  console.log("fetch works")
  console.log(studentData);
  
  return studentData;
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


// ********* MODAL *********
// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

// ********* END OF MODAL *********





const Viewprofile = () => {
  const [request,requestStudent] = useState([]);
  const [notes,setNotes] = useState("");
  //list of pending requests
  const [requests, setRequests]= useState([])
  const [studentDataa, setstudentData]= useState([])
  
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

      const tfs3 = await fetchTasks3(tfs.requestedStudent._id);

      requestStudent(tfs);
      setRequests(tfs2);
      setstudentData(tfs3);

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
              <div className="row">
                <div className="uploaded column"><img src={studentDataa.studentRequirements && studentDataa.studentRequirements.license}  onclick="openModal();currentSlide(1)" class="hover-shadow"></img></div>
                <p>Pilot License</p>
              </div>
              <div>
                <div className="uploaded column"><img src={studentDataa.studentRequirements && studentDataa.studentRequirements.medicalLicense}  onclick="openModal();currentSlide(2)" class="hover-shadow"></img></div>
                <p>Medical License</p>
              </div>
              <div>
                <div className="uploaded column"><img src={studentDataa.studentRequirements && studentDataa.studentRequirements.radioLicense}  onclick="openModal();currentSlide(3)" class="hover-shadow"></img></div>
                <p>Radio License</p>
              </div>
              <div>
                <div className="uploaded column"><img src={studentDataa.studentRequirements && studentDataa.studentRequirements.englishProficiency}  onclick="openModal();currentSlide(4)" class="hover-shadow"></img></div>
                <p>English Proficiency</p>
              </div>
            </div>
            {/* **** */}

            {/* *** The Modal/Lightbox *** */}
            <div id="myModal" class="modal">
              <span class="close cursor" onclick="closeModal()">&times;</span>
              <div class="modal-content">

                <div class="mySlides">
                  <div class="numbertext">1 / 4</div>
                  <img src={studentDataa.studentRequirements && studentDataa.studentRequirements.license} />
                  
                </div>

                <div class="mySlides">
                  <div class="numbertext">2 / 4</div>
                  <img src={studentDataa.studentRequirements && studentDataa.studentRequirements.medicalLicense} />
                </div>

                <div class="mySlides">
                  <div class="numbertext">3 / 4</div>
                  <img src={studentDataa.studentRequirements && studentDataa.studentRequirements.radioLicense} />
                </div>

                <div class="mySlides">
                  <div class="numbertext">4 / 4</div>
                  <img src={studentDataa.studentRequirements && studentDataa.studentRequirements.englishProficiency} />
                </div>

                {/* *** Next/previous controls *** */}
                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>

                {/* *** Caption text *** */}
                <div class="caption-container">
                  <p id="caption"></p>
                </div>

                {/* *** Thumbnail image controls *** */}
                <div class="column">
                  <img class="demo" src={studentDataa.studentRequirements && studentDataa.studentRequirements.license} onclick="currentSlide(1)" alt="Nature" />
                </div>

                <div class="column">
                  <img class="demo" src={studentDataa.studentRequirements && studentDataa.studentRequirements.medicalLicense} onclick="currentSlide(2)" alt="Snow" />
                </div>

                <div class="column">
                  <img class="demo" src={studentDataa.studentRequirements && studentDataa.studentRequirements.radioLicense} onclick="currentSlide(3)" alt="Mountains" />
                </div>

                <div class="column">
                  <img class="demo" src={studentDataa.studentRequirements && studentDataa.studentRequirements.englishProficiency} onclick="currentSlide(4)" alt="Lights" />
                </div>
              </div>
            </div>



          </div>
          {/* end of studentimage */}

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
    <ToastContainer />
    </>

  )
}

export default Viewprofile