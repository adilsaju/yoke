import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import { Link } from "react-router-dom";
import moment from 'moment';

const sentEmail = async () => {
  let url = `/sentemail`;

  const res = await fetch(url, {method: 'POST' });
  const data = await res.json();

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};


  const FinalList = () => {
      
              const [finalstudents,FinalStudents] = useState([]);
  
              const [error, setError] = useState(null);

              useEffect(() => {
                setTimeout(() => {
                 fetch(`/finalList`).then(res => {
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
                },1000)
        
            }, []);
              
              // const isEmpty = Object.keys(finalstudents).length === 0;
              // console.log(isEmpty);
  
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
             <tbody>
              <tr className='tay' key={id}>
                <td>{count++}</td>
                <td>{ student._id}</td>
                <td>{ student.requestedStudent.name}</td>
                <td>{ student.requestedStudent.studentNumber}</td>
                <td>{moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                <td><Link to={ `/travel-order/profile/${student._id}` }>View Profile</Link></td>
              </tr>
              </tbody>
          )}
          )}
          </table>
        </div>
        </div> 
        </div>
            )

}

export default FinalList