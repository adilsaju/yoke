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
import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];


const notify1 = (studentName) => toast(`Notes of ${studentName} updated successfully`);


const fetchTasks = async (request_id) => {
  let url = `/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  return data;
};

const fetchTasks2 = async () => {
  let url = `/finalList`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("reqssss: ",data);
  return data;
};

const Viewprofiles = () => {
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
      
      // const [images, setImages] = useState([
      //   {
      //     original: `${tfs.requestedStudent.studentRequirements.license}`,
      //     thumbnail: `${tfs.requestedStudent.studentRequirements.license}`,
      //   },
      //   {
      //     original: `${tfs.requestedStudent.studentRequirements.englishProficiency}`,
      //     thumbnail: `${tfs.requestedStudent.studentRequirements.englishProficiency}`,
      //   },
      //   {
      //     original: `${tfs.requestedStudent.studentRequirements.medicalLicense}`,
      //     thumbnail: `${tfs.requestedStudent.studentRequirements.medicalLicense}`,
      //   },
      //   {
      //     original: `${tfs.requestedStudent.studentRequirements.radioLicense}`,
      //     thumbnail: `${tfs.requestedStudent.studentRequirements.radioLicense}`,
      //   },
      // ]);



      requestStudent(tfs);
      setRequests(tfs2);

      setCurrentPage(tfs2, tfs)
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
                <Link to={ `/final-list/profile/${prevId}` } onClick={(e)=>{ setCurrentPage() }}  ><button className="leftBtn">
                  <img src={leftArrowBtn} alt='left-button' /></button>
                </Link>}
              <span className="fontFira">{cnt}</span>
              {cnt<requests.length-1 &&
              
                <Link to={ `/final-list/profile/${nextId}` } onClick={(e)=>{ setCurrentPage() }}   >
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
            {/* end of studentviews */}

          </div>
          {/* end of studentimage */}

          
          <div className='licenseimage'>
            <h3>License Documents</h3>
            <div className="studentimage">
              <div className="uploaded">
                <a class="button" href="#popup2"><img src={request.requestedStudent && request.requestedStudent.studentRequirements.license}></img></a>
                <p>Pilot License</p>
              </div>
              <div className="uploaded">
                <a class="button" href="#popup2"><img src={request.requestedStudent && request.requestedStudent.studentRequirements.medicalLicense}></img></a>
                <p>Medical License</p>
              </div>
              <div className="uploaded">
                <a class="button" href="#popup2"><img src={request.requestedStudent && request.requestedStudent.studentRequirements.radioLicense}></img></a>
                <p>Radio License</p>
              </div>
              <div className="uploaded">
                <a class="button" href="#popup2"><img src={request.requestedStudent && request.requestedStudent.studentRequirements.englishProficiency}></img></a>
                <p>English Proficiency</p>
              </div>
            </div>



            <div id="popup2" class="overlay light">
              <a class="cancel" href="#"></a>
              <div class="popup">
                <h2>{request.requestedStudent && request.requestedStudent.name}</h2>
                <div class="content">
                  <ImageGallery items={images} />
                  <p>Click outside the popup to close.</p>
                </div>
              </div>
            </div>


            {/* gallery library */}
            {/* <ImageGallery items={images} /> */}
          </div>

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

export default Viewprofiles