import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SearchStudent from './Search'
import SideMenu from '../Navbar/SideMenu';

//Fetch Data using API
const fetchTasks = async () => {
    let url = `/requests?student=633a0695b149556c00bfc725`;
    const res = await fetch(url);
    const data = await res.json();
  
    console.log(data);
    console.log("In Mohit2 code");
    
    return data;
  
  };
  

const StudentTravelOrder = () => {
      
                const [students,setStudents] = useState([]);

                useEffect(() => {
                    
                    const getTasks = async () => {
                    const tfs = await fetchTasks();
                    setStudents(tfs);
                    };
                
                    getTasks();

                }, []);
                let count = 1;
                const isEmpty = Object.keys(students).length === 0;
                console.log(isEmpty);
                
                
            return (
               
        <div>
            <SideMenu/>
            <>
           < SearchStudent/>
            </>
            <>
            <button > <Link to='/student-travel-order'>Request Travel Order</Link></button>
            </>
          
   {students.map((student,id)=> {
      
      
      return (
        
        <div key={id}>
         <table>
             <tbody>
              <tr>
                <td>{(count++)}</td>
                <td>{ student.flightDate}</td>
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
        
            )
}

export default StudentTravelOrder