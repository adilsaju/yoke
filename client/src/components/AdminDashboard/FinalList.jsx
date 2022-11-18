import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import { Link } from "react-router-dom";
import moment from 'moment';
import {  useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';


let emailcheck = true
let resss = "";
const sentEmail = async () => {
  let url = `/api/sentemail`;

  const res = await fetch(url, {method: 'POST' });
  const data = await res.json();
  if(!data){
    emailcheck = false
  
  }
  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const sentToFlightCn = async () =>{
  let url = `/api/requests/senttofc`;

    const ress = await fetch(url, {method: 'PATCH' });
    const data = await ress.json();
    // openModal
    // alert("APPROVED!")
     
    console.log("FlightCoooorrrdd",data);
    return data;
} 

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


  const FinalList = () => {
  const {pageTitle, setPageTitle} = useContext(UserContext);

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


  const notify = () => {
   
    if (emailcheck){
     
      toast(<p className='toast-content'>List Successfully Sent to Flight Co-ordinator</p>,{
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }else{
      toast(<p className='toast-content'>No bookings for tomorrow, email not sent</p>,{
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }
    };
      
              const [finalstudents,FinalStudents] = useState([]);
  
              const [error, setError] = useState(null);

              const location = useLocation();
              console.log(location.pathname);

              
              useEffect(() => {
                setPageTitle("Final List")

                setTimeout(() => {
                 fetch(`/api/finalList`).then(res => {
                   if(!res.ok) {
                     throw Error(res.statusText);
                   }
                   return res.json();
                   
                 })
                 .then(data => {
                   FinalStudents(data);
                    console.log('see' ,data);
                   setError(null);
                 }).catch(err => {
                   setError(err.message)
                 })
                })
        
            }, []);
              
              // const isEmpty = Object.keys(finalstudents).length === 0;
              // console.log(isEmpty);
  
              let count = 1;
    return (
               
        <div>
          <div className='fullpage'>
            <SideMenuAdmin/>
            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
          
          <h2>Are you sure you want to send ?</h2>
          <div className="final-btnn">
          <button className='yellowBtn useyes' onClick={(e) => {sentEmail();setTimeout( notify,3000);sentToFlightCn();closeModal();setTimeout(() => {window.location.reload(false)
            
          }, 6000);}}>Yes</button> 
          <Link to="/final-list"><button className='useno' onClick={(e) => closeModal()} >No</button></Link> 
          </div> 
      </Modal> 
     

              <div className='division'>
                <div className="subDivision">
                  <div className="topDivision finalmobile">
                    <Search />
                    <div className="leftBorder">
                    <button className="yellowBtn" onClick={(e) => { openModal() }} > Send to Flight Coordinator </button>
                    <ToastContainer position="bottom-left"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>
                    </div>
                  </div>
                  <table className='myTable finalListTableDesktop'>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th className=''>Student Id</th>
                        <th className=''>Travel Date</th>
                        <th className=''>Action</th>
                      </tr>
                    </thead>
                    {finalstudents.map((student,id)=> {
                    return (
                      <tbody key={id}>
                        <tr className='tay' >
                          <td>{count++}</td>
                          <td>{ student.requestedStudent && student.requestedStudent.name}
                          <div className="mobile-data">
                           <div className="id"> ID - {student.requestedStudent && student.requestedStudent.studentNumber}</div>
                            <div className="travdate">Travel date - {moment(student.flightDate).format("MMMM Do , YYYY")}</div>
                          </div></td>
                          <td>{ student.requestedStudent && student.requestedStudent.studentNumber}</td>
                          <td>{moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                          <td><Link to={ `/final-list/profile/${student._id}` }><button className="dBlueBtn">View Profile</button></Link></td>
                        </tr>
                        </tbody>
                    )}
                    )}
                  </table>

                               

                  <div id="msg" style={ { display: "none" } }>Oops! It did not match any results.Maybe try searching for Something different.
                  </div>
                </div>
              </div>
              {/* end of division */}
          </div> 
          {/* end of fullpage  */}
        </div>
            )

}

export default FinalList