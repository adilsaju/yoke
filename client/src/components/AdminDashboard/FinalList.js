import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';

import { Link } from "react-router-dom";

//Fetch Data using API
const fetchTasks = async () => {
    let url = `/finalList`;
    const res = await fetch(url);
    const data = await res.json();
  
    console.log(data);
    console.log("In Mohit Code");
    
    return data;
  
  };
  
  
  const FinalList = () => {
      
              const [students,setStudents] = useState([]);
  
              useEffect(() => {
                  
                  const getTasks = async () => {
                  const tfs = await fetchTasks();
                  setStudents(tfs);
                  };
              
                  getTasks();
  
              }, []);
              
              const isEmpty = Object.keys(students).length === 0;
              console.log(isEmpty);
  
              let count = 1;
    return (
               
        <div>
            <SideMenuAdmin/>
     
            <>
            <button > <Link to='/student-travel-order'>Send to Flight Coordinator</Link></button>
            </>
          
   {students.map((student,id)=> {
      
      
      return (
        
        <div key={id}>
         <table>
             <tbody>
              <tr>
                <td>{count++}</td>
                <td>{ student.requestedStudent.name}</td>
                <td>{ student.requestedStudent.studentNumber}</td>
                <td>{student.flightDate}</td>
                <td><Link to={ `/travel-order/profile/${student._id}` }>View Profile</Link></td>
              </tr>
              </tbody>
            </table>
        </div>
    )
   } ,[])

   
   
        }
    
        
        </div> 
        
            )

}

export default FinalList