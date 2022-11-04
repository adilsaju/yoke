import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { useParams } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import moment from 'moment';

let resss = "";
const sentEmailStudentDeclined = async (flydate,rod) => {
  let url = `/sentEmailStudentDeclined`;

  let flydate2 = moment(flydate).format("MMMM Do , YYYY")
  alert(rod);
  const bod1 = {
    "text": 'Your Request has been declined',
    "travelDate" : flydate2,
    "declineReason" : rod
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

const sentEmail = async () => {
  let url = `/sentemail`;

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


const decline = async (request, loggedInUser) => {
  let url = `/requests/${request._id}/decline`;
  const bod1 = {
    "adminId": `${loggedInUser.id}`,
    "reason"  : "tumse na hopayega"
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

 
  const [modalIsOpenalso, setIsOpenalso] = React.useState(false);
  function openModalalso() {
    setIsOpenalso(true);
    resss = document.getElementById("rod").value
    
  }
  function afterOpenModalalso() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModalalso() {
    setIsOpenalso(false);
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
      {(request.isApproved) ? <h3>The request is already approved!</h3> : console.log("nothing")}
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
          <option value="Balance insufficient">Balance insufficient</option>
          <option value="Flight hours insufficient">Flight hours insufficient</option>
          <option value="License not valid">License not valid</option>
          <option value="No spots left">No spots left</option>
        </select><br></br>
        <br></br>
        {/* {alert((document.getElementById("rod")).value)} */}
        <input onClick={(e) => { decline(request, loginCredentials.loggedInUser);closeModal();openModalalso()}} type="submit" className='viewProfileBtn' value="Confirm"></input>
        </form>
        
      </Modal> 
     
      <Modal
        isOpen={modalIsOpenalso}
        onAfterOpen={afterOpenModalalso}
        onRequestClose={closeModalalso}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img className='tick2' src={require('../images/verified.gif')} alt='' />
        <div><h2>Request declined successfully</h2></div>
        <Link to="/travel-order"><button className='viewProfileBtn' onClick={(e) => {closeModalalso();sentEmailStudentDeclined(request.flightDate,resss)}}>OK</button></Link>
      </Modal> 
      
    </div>
    
  )
}

export default Decline