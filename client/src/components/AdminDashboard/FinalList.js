import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import { Link } from "react-router-dom";
import moment from 'moment';

//Fetch Data using API
const fetchTasks = async () => {
    let url = `/finalList`;
   
    
    const res = await fetch(url);
    const data = await res.json();
  
    console.log(data);
    console.log("In Mohit Code");
    
    return data;
  
  };
  
const sentEmail = async () => {
  let url = `/sentemail`;

  const res = await fetch(url, {method: 'POST' });
  const data = await res.json();

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};


  const FinalList = () => {
      
              const [students,setStudents] = useState([]);
  
              useEffect(() => {
                  
                  const getTasks = async () => {
                  const tfs = await fetchTasks();
                  console.log("jojojojo")
                  setStudents(tfs);
                  };
              
                  getTasks();
  
              }, []);
              
              const isEmpty = Object.keys(students).length === 0;
              console.log(isEmpty);
  
              let count = 1;
    return (
               
        <div>
            <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>
            <Search />
            <>
            <button  onClick={(e) => { sentEmail() }} > Send to Flight Coordinator </button>
            </>
          
          {students.map((student,id)=> {
      
      
          return (
        
           <div key={id}>
             <table>
                            <tbody>
                          
                            <tr>
                                        <th>No.</th>
                                        <th>Requested ID</th>
                                        <th>Name</th>
                                        <th className=''>Student Id</th>
                                        <th className=''>Travel Date</th>
                                        <th className=''>Action</th>
                                      </tr>
                            </tbody>
                          
                          </table>
         <table>
             <tbody>
              <tr>
                <td>{count++}</td>
                <td>{ student._id}</td>
                <td>{ student.requestedStudent.name}</td>
                <td>{ student.requestedStudent.studentNumber}</td>
                <td>{moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                <td><Link to={ `/travel-order/profile/${student._id}` }>View Profile</Link></td>
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

export default FinalList