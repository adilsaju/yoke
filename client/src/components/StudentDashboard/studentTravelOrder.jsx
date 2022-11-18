import React from 'react'
import { useState,useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import Search from '../AdminDashboard/Search';
import SideMenu from '../Navbar/SideMenu';
import {UserContext} from '../../Contexts/UserContext'
import moment from "moment";
import '../../App.css'
import Popup from 'reactjs-popup';


//Fetch Data using API
const fetchTasks = async (loggedInUser) => {
    let url = `/api/requests?student=${loggedInUser.id}`;
   
    const res = await fetch(url);
    const data = await res.json();
  
    console.log(data);
    return data;
  
  };

  const fetchStudent = async (loggedInUser) => {
    let url = `/api/students/${loggedInUser.id}`;

    const res = await fetch(url);
    const studentData = await res.json();
  
    console.log(studentData);
    return studentData;
  
  };
  

const StudentTravelOrder = () => {
  const {pageTitle, setPageTitle} = useContext(UserContext)

                const {loggedInUser, loginCredentials} = useContext(UserContext)
      
                const [students,setStudents] = useState([]);
                const [studentsInfo,setStudentsInfo] = useState([]);
                useEffect(() => {
                   setPageTitle("Student Travel Order")
                    
                    const getTasks = async () => {
                    const tfs = await fetchTasks(loginCredentials.loggedInUser);
                    setStudents(tfs);
                    };
                
                    getTasks();

                }, []);
                let count = 1;
                const isEmpty = Object.keys(students).length === 0;
                console.log(isEmpty);
                
                useEffect(() => {
                    
                    const getTasks = async () => {
                    const tts = await fetchStudent(loginCredentials.loggedInUser);
                    setStudentsInfo(tts);
                    };
                
                    getTasks();

                }, []);
                
  return (
    <div>
      <div className='fullpage'>
        <SideMenu/>
        
          <div className='division'>
            
            
            <div className="subDivision studentTO">
              <div className="topDivision">
        
                < Search />
          
              {console.log(studentsInfo)}
              {studentsInfo.studentRequirements && studentsInfo.studentRequirements.isRequirementsOk ?
                <Link to='/request'>
                  <button className="yellowBtn btnnn" > Request Travel Order</button>
                </Link> :
                <Popup
                                 trigger={open => ( <Link to='/request'>
                                  <button className="yellowBtn" type="button" disabled> Request Travel Order</button>
                                  </Link>
                                )}
                                  position="bottom center"
                                  on={['hover', 'focus']}
                                  arrow={false}
                                  closeOnDocumentClick
                                >
                                  <span className='thePopUp'> insufficent requirements </span>
                                </Popup>
                  
               }
              </div>
              <span className='textinf'>Previous Records of Travel Orders</span>
              <table className='myTable'>
                <thead>
                  <tr>
                  <th>No.</th>
                    <th className=''>Travel Date</th>
                    <th className=''>Processed Admin</th>
                    <th className=''>Status</th>
                  </tr>
                </thead>
                    {students.map((student,id)=> {
                      return (
                        <tbody key={id}>
                          <tr className='tay'>
                            <td>{(count++)}</td>
                            <td>{ moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                            <td>{ student.approvedAdmin ? student.approvedAdmin.email : "Not Applicable"  }</td>
                            <td>{
                              // (student.isApproved ?  <p>Approved</p>: student.isRejected ?  <p>Rejected</p>: student.isExpired ?  <p>Expired</p>: (!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <p>Pending</p>: console.log("nothing"))
              
                                  // ((!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <h2>Expired</h2>: console.log("nothing"))
                          
                          
                                  <Popup
                                  trigger={open => (
                                    (student.isApproved ?  <p className='approved1'>Approved</p>: student.isRejected ?  <p className='declined1'>Rejected</p>: student.isExpired ?  <p>Expired</p>: (!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <p className='pending1' >Pending</p>: console.log("nothing"))
                                  )}
                                  position="bottom center"
                                  on={['hover', 'focus']}
                                  arrow={false}
                                  closeOnDocumentClick
                                >
                                  <span className='thePopUp'> Reason: { student.reason } </span>
                                </Popup>
                          
                          
                          }</td>
                          </tr>
                        </tbody>
                        ) }
                      )
                    }
              </table>
              
              <div id="msg" style={ { display: "none" } }>Oops! It did not match any results.Maybe try searching for Something different.
              </div>
            </div>
          
          </div>
          {/* end of division */}
          
      </div>
      {/* end of fullpage */}

    </div>
  )
}

export default StudentTravelOrder