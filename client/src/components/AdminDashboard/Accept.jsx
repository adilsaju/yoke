import { async } from '@firebase/util';
import React from 'react'
import { useState,useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import moment from 'moment';

const sentEmailStudentApproved = async (flydate,mailid) => {
  let url = `/sentEmailStudentApproved`;
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
  let url = `/requests/${request_id}`;
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
const approve = async (request, loggedInUser) => {
  let url = `/requests/${request._id}/approve`;

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
  return data;
};

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
    { (!request.isRejected) && (!request.isApproved) && <button className='accept fontFira'  onClick={ (e) => { approve(request, loginCredentials.loggedInUser);openModal()} }>Approve</button> }
   

    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img className='tick' src={require('../images/200w.gif')} alt='' />
        <div><h2>Request approved successfully</h2></div>
        <Link to="/travel-order"><button className='viewProfileBtn' onClick={(e) => {closeModal();sentEmailStudentApproved(request.flightDate,request.requestedStudent.email)}}>OK</button></Link>
        {/* <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal> 
    </div>
  )
}

export default Accept