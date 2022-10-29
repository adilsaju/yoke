import React from 'react'
import { useState,useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import Search from '../AdminDashboard/Search';
import SideMenu from '../Navbar/SideMenu';
import {UserContext} from '../../Contexts/UserContext'
import moment from "moment";



//Fetch Data using API
const fetchTasks = async (loggedInUser) => {
    let url = `/requests?student=${loggedInUser.id}`;
   
    const res = await fetch(url);
    const data = await res.json();
  
    console.log(data);
    return data;
  
  };

  const fetchStudent = async (loggedInUser) => {
    let url = `/students/${loggedInUser.id}`;

    const res = await fetch(url);
    const studentData = await res.json();
  
    console.log(studentData);
    return studentData;
  
  };
  

const StudentTravelOrder = () => {

                const {loggedInUser} = useContext(UserContext)
      
                const [students,setStudents] = useState([]);
                const [studentsInfo,setStudentsInfo] = useState([]);
                useEffect(() => {
                    
                    const getTasks = async () => {
                    const tfs = await fetchTasks(loggedInUser);
                    setStudents(tfs);
                    };
                
                    getTasks();

                }, []);
                let count = 1;
                const isEmpty = Object.keys(students).length === 0;
                console.log(isEmpty);
                
                useEffect(() => {
                    
                    const getTasks = async () => {
                    const tts = await fetchStudent(loggedInUser);
                    setStudentsInfo(tts);
                    };
                
                    getTasks();

                }, []);
                
            return (
               
        <div>
           <div className='fullpage'>
       <SideMenu/>
      <div className='division'>
            <>
           < Search/>
            </>
            <>
            {console.log(studentsInfo)}
            {studentsInfo.studentRequirements && studentsInfo.studentRequirements.isRequirementsOk ?  <Link to='/request'><button > Request Travel Order</button></Link> : <Link to='/request'><button type="button" disabled> Request Travel Order</button></Link>}
            </>
            <table>
              <tbody>
              
              <tr>
                          <th>No.</th>
                          <th>Request ID</th>
                          <th className=''>Travel Date</th>
                          <th className=''>Status</th>
                    
                        </tr>
              </tbody>
            
            </table>
                  {students.map((student,id)=> {
                      
                      
                      return (
                        
                        <div key={id}>
                      
                        <table>
                            <tbody>
                              <tr>
                                <td>{(count++)}</td>
                                <td>{ student._id}</td>
                                <td>{ moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                                <td>{  
                                        (student.isApproved ?  <h2>Approved</h2>: student.isRejected ?  <h2>Rejected</h2>: student.isExpired ?  <h2>Expired</h2>: (!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <h2>Pending</h2>: console.log("nothing"))
                                      
                                        // ((!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <h2>Expired</h2>: console.log("nothing"))
                                    }</td>
                              </tr>
                              </tbody>
                            </table>
                        </div>
                    )
                  } ,[])

                        }
            </div>
            </div>
        </div> 
        
            )
}

export default StudentTravelOrder