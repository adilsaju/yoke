import React from 'react'
import { useState,useEffect, useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext'
import SideMenu from '../Navbar/SideMenu';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import './requestTravelOrder.css'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const maximDate = new Date();
maximDate.setDate(maximDate.getDate()+30);

const minimDate = new Date();
minimDate.setDate(minimDate.getDate()+2);

let resp = 'Booking Submitted';
let trr = false;

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



const req = async (flightDate, loggedInUser) => {
  console.log("VERYYY KKKKKK: ", flightDate);
  let url = `/api/requests`;

  let flightDate2 = moment(flightDate).format("MMMM Do , YYYY")
  console.log(flightDate2)
const bod1 = {
  "flightDate" : new Date(flightDate),
  "studentId": `${loggedInUser.id}`
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
   if (data.error){
    
    resp = data.message;
    trr = true;
   }else{
    trr = false;
     resp = `Booking Submitted for ${flightDate2}`;
  //  alert(`Booking Submitted for date: ${flightDate2}`);
   }
  return data;
};

const RequestTravelOrder = () => {
  const navigate = useNavigate();
  const {pageTitle, setPageTitle} = useContext(UserContext)
  const handleClick = () => {
    navigate("/login");
}
  //--------------- modal start ----------------------
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
  //--------------- modal end ----------------------
  const {loggedInUser, loginCredentials} = useContext(UserContext)
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    setPageTitle("Request Travel Order")
    if(!JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn){
      handleClick();
      }
  
          }, []);
  return (
    <>
      <div className='fullpage'>
      <SideMenu />  
      <div className='division mobile-calender-div'>

        <div className="sectionWrapper">
          <h2 className='fontFira-bold'>Select Flight Date </h2>
          <div className='calendr'>
            <div className='Clendr'>
              <Calendar onChange={onChange} minDate={minimDate} maxDate={maximDate} value={value} />
              {console.log(value)}
            </div>
            {/* <input type="date" /> <br /> */}
            <div className="buttonWrapper">
              <Link to="/student-travel-order">
                <button className="transparentBtn duo">
                    Cancel
                </button>
              </Link>
              <button className="yellowBtn duo" onClick={(e) => { req(value, loginCredentials.loggedInUser);setTimeout( openModal,500)} } >Submit</button>
            </div>
          </div>
        </div>
        
        
      </div>
      {/* end of division */}

      </div>
      {/* end of fullpage */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <img className='tick' src={require('../images/waarn.png')} alt='' /> */}
        {/* {alert(trr)} */}
       {trr ? <div><img className='tick' src={require('../images/warning.gif')} alt='warning sign' /><h2 className='fontFira-bold'>{resp}</h2> <Link to="/request"><button className='viewProfileBtn fontFira-bold' onClick={closeModal}>OK</button></Link></div> : <div><img className='tick2' src={require('../images/verified.gif')} alt='request verified sign' /><h2 className='fontFira-bold'>{resp}</h2><Link to="/student-travel-order"><button className='viewProfileBtn fontFira-bold' onClick={closeModal}>OK</button></Link></div>}
        
        {/* <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal> 
    </>

  )
}

export default RequestTravelOrder
