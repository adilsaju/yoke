import { async } from '@firebase/util';
import React from 'react'
import { useState,useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Decline from './Decline';

let shouldEmail = true;

const sentEmailStudentApproved = async (flydate,mailid) => {
  let url = `/api/sentEmailStudentApproved`;
  let flydate2 = moment(flydate).format("MMMM Do , YYYY")
  const bod1 = {
    "text": 'Your Request has been approved',
    "travelDate" : flydate2,
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
const approve = async (request, loggedInUser, setStudents) => {
  let url = `/api/requests/${request._id}/approve`;

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

  return data;
};
//undo approve
const undo = async (request, loggedInUser,setStudents, toastDelay) => {
  shouldEmail = false;
  let url = `/api/requests/${request._id}/undoApprove`;

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

const notifyUndoed = (toastDelay) => toast(`Undo successfull`,{
  position: "bottom-left",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });


  const notifyApproved = (toastDelay, ApproveToast) => toast(<ApproveToast />,{
    position: "bottom-left",
    autoClose: toastDelay,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });


const Accept = () => {


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

  

  const {loggedInUser, loginCredentials} = useContext(UserContext)
console.log(loginCredentials.loggedInUser.id);
  const [request,setStudents] = useState([]);
  // const [shouldEmail,setshouldEmail] = useState(true);
  const [toastDelay,settoastDelay] = useState(5000);



  let params = useParams();

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(params.id);
      setStudents(tfs);
    };
    getTasks();
  }, []);

  const ApproveToast = ({ closeToast, toastProps }) => (
    <div className='toast-inn'>
      {/* Lorem ipsum dolor {toastProps.position} */}
      <p className='toast-content'>Student record sent to final <br />list successfully</p>
      <button className='dBlueBtn' onClick={(e) => {   undo(request, loginCredentials.loggedInUser, setStudents) }}>Undo</button>
      {/* <button onClick={closeToast}>Close</button> */}
    </div>
  )
  
  const sentEmailBasedOnCondition = () => {
    
    
      setTimeout(()=>{
        if (shouldEmail){
         
        sentEmailStudentApproved(request.flightDate,request.requestedStudent.email);
        setTimeout( window.location.reload(false),toastDelay ) 
      }} , toastDelay);
      
    
  }

  return (
    <div> 
  { (!request.isRejected) && (!request.isApproved) && <button className='accept fontFira'  onClick={ (e) => { approve(request, loginCredentials.loggedInUser, setStudents);setTimeout(sentEmailBasedOnCondition(),5000); notifyApproved(toastDelay, ApproveToast) } }>Approve</button> }
  

      {/* <ToastContainer  /> */}
    </div>
  )
}

export default Accept