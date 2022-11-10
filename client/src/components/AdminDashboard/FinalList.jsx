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

let emailcheck = true

const sentEmail = async () => {
  let url = `/api/sentemail`;

  const res = await fetch(url, {method: 'POST' });
  const data = await res.json();
  if(data === 25){
    console.log("yipee")
    emailcheck = false
    console.log(emailcheck)
  }


  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

  const FinalList = () => {
  const {pageTitle, setPageTitle} = useContext(UserContext);
  const notify = () => {
   
    if (emailcheck){
   
      toast("List Successfully Sent to Flight Co-ordinator",{
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }else{
      toast("Nothing to send",{
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
              <div className='division'>
                <div className="subDivision">
                  <div className="topDivision">
                    <Search />
                    <div className="leftBorder">
                    <button className="yellowBtn" onClick={(e) => { sentEmail();setTimeout( notify,100) }} > Send to Flight Coordinator </button>
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
                  <table className='myTable'>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Requested ID</th>
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
                          <td>{ student._id}</td>
                          <td>{ student.requestedStudent && student.requestedStudent.name}</td>
                          <td>{ student.requestedStudent && student.requestedStudent.studentNumber}</td>
                          <td>{moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                          <td><Link to={ `/final-list/profile/${student._id}` }><button className="viewProfileBtn">View Profile</button></Link></td>
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