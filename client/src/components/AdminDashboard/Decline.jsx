import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { useParams } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

let resss = "";
let shouldEmail = true;
//undo decline
const undo = async (request, loggedInUser,setStudents, toastDelay) => {
  shouldEmail = false;
  let url = `/api/requests/${request._id}/undodecline`;

const bod1 = {
  "adminId": `${loggedInUser.id}`
}

  const res = await fetch(url, {method: 'PATCH',
   body: JSON.stringify(bod1), 
      headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();
  // openModal
  // alert("APPROVED!")
   
  console.log("IMPPPPPPPPPPPPP:",data);
  setStudents(data)
  toast.dismiss()
  notifyUndoed(toastDelay);

  // setStudents(data)
  return data;
};


//toast
const notifyUndoed = (toastDelay) => toast(<p className='toast-content'>Undo Successful</p>,{
  position: "bottom-left",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
const notifyDeclined = (toastDelay, DeclineToast) => toast(<DeclineToast />,{
  position: "bottom-left",
  autoClose: toastDelay,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
// api call for sending email on student decline
const sentEmailStudentDeclined = async (flydate,rod,mailid) => {
  let url = `/api/sentEmailStudentDeclined`;

  let flydate2 = moment(flydate).format("MMMM Do , YYYY")

  const bod1 = {
    "text": 'Your Request has been declined',
    "travelDate" : flydate2,
    "declineReason" : rod,
    "mailId" : mailid
    
    }
      const res = await fetch(url, 
        {
          method: 'POST', 
         body: JSON.stringify(bod1),  
         headers: { 'Content-Type': 'application/json'}, 
        }
        );
  const data = await res.json();

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};
const fetchTasks = async (request_id) => {
  let url = `/api/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  return data;
};

const sentEmail = async () => {
  let url = `/api/sentemail`;

  const res = await fetch(url, {method: 'POST' });
  const data = await res.json();

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2
  },
};


const decline = async (request, loggedInUser, rod) => {
  let url = `/api/requests/${request._id}/decline`;
  const bod1 = {
    "adminId": `${loggedInUser.id}`,
    "reason"  : `${rod}`
  }
  const res = await fetch(url, {method: 'PATCH', body: JSON.stringify(bod1),     headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();
  

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

function Openform() {
  document.getElementById('form1').style.display = 'block';
}

function Closeform() {
  document.getElementById('form1').style.display = 'none';
}

const Decline = () => {
  const [request,setStudents] = useState([]);
  const {loggedInUser, loginCredentials} = useContext(UserContext)

  //toast call
  // const [shouldEmail,setshouldEmail] = useState(true);
  const [toastDelay,settoastDelay] = useState(5000);

  const DeclineToast = ({ closeToast, toastProps }) => (
    <div className='toast-inn'>
      
      <p className='toast-content'>The request has been <br /> Declined</p>
      <button className='dBlueBtn' onClick={(e) => {   undo(request, loginCredentials.loggedInUser, setStudents); }}  >Undo</button>
      
    </div>
  )
  const sentEmailBasedOnCondition = () => {
    

      setTimeout(()=>{
        if (shouldEmail){
        sentEmailStudentDeclined(request.flightDate,resss,request.requestedStudent.email);
        setTimeout( window.location.reload(false),1000 ) 
        }
      } , 3000);
    
  }


  //---------------------- modal begin ---------------------------
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }

 
  
  // ---------------------- modal end ----------------------


  let params = useParams();
  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(params.id);
      setStudents(tfs);
    };
    getTasks();
  }, []);

  return (
    <div>
      {(!request.isRejected) && (!request.isApproved) && <button className='decline fontFira' onClick={(e) => { openModal()} }>Decline</button> }
      {(request.isRejected) ? <><h3>This request has been declined.</h3></>: console.log("nothing")}
      {(request.isApproved) ? <h3>This request has been approved.</h3> : console.log("nothing")}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <form action='#' id="form1" >
          <label htmlFor="reason for denial"><h2>Reason for Rejection:  </h2></label>
          <select name="rod" id="rod">
          {/* <option value="null" selected disabled hidden>Please choose</option> */}
          <option value="Balance insufficient" selected>Insufficient balance</option>
          <option value="Flight hours insufficient">Insufficient Flight hours</option>
          <option value="License not valid">Expired document/s</option>
          <option value="No spots left">Document/s will expire in 30 days</option>
        </select><br></br>
        <br></br>
        {/* {alert((document.getElementById("rod")).value)} */}
        <input onClick={(e) => { decline(request, loginCredentials.loggedInUser, document.querySelector("#rod").value);setTimeout(sentEmailBasedOnCondition(),5000);closeModal();notifyDeclined(toastDelay, DeclineToast)}} type="submit" className='viewProfileBtn' value="Confirm"></input>
        </form>
        
      </Modal> 
     
      
    </div>
    
  )
}

export default Decline