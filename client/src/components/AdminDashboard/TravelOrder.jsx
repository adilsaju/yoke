import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import moment from "moment";
import Filters from './Filters';


// const fetchTasks = async () => {
//   let url1 = `/pendingRequest`;
//   const res = await fetch(url1);
//   const data = await res.json();

//   console.log(data);
//   return data;
// };

const TravelOrder = () => {


  const [students,setStudents] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
 setTimeout(() => {
  fetch(`/pendingRequests`).then(res => {
    if(!res.ok) {
      throw Error('could not fetch the data for that resource');
    }
    return res.json();
  })
  .then(data => {
    setStudents(data);
    setError(null);
  }).catch(err => {
    setError(err.message)
  })
 },1000)

    }, []);
let count = 1;
//Sort By Name
// let keyword =  students.sort((a,b) => {
//  if (a.requestedStudent.name < b.requestedStudent.name) 
//  {
//   return -1;
//  }
//  if(a.requestedStudent.name > b.requestedStudent.name)
//  return 1;
//  return 0 ;
// })
//Sort By Date
// let keyword =  students.sort((a,b)=> {
//   var date = new Date(a.flightDate);
//   var dates = new Date(b.flightDate);
//   return date - dates;
// })


  return (
    <>
  <div className='fullpage'>
    <SideMenuAdmin/>
    <div className='division'>

                      <div>
                            <Search/>

                          <table>
                            <tbody>
                            { error && <div>{ error }</div> }
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
                          </div>                                
                          <table className="myTable" >
                          <tbody>
                          {students.map((student,id) => {
                      if ( 'requestedStudent' in student && student.isApproved === false)
                      {
                        return(
                            <tr className='tay' key={id}>
                              <td>{count++}</td>
                              <td>{student._id}</td>
                              <td>{student.requestedStudent.name}</td>
                              <td>{student.requestedStudent.studentNumber}</td>
                              <td>{moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                              <td><Link to={ `/travel-order/profile/${student._id}` }>View Profile</Link></td>
                            </tr>
                            ) }
                    })
                  }
                            </tbody>
                          </table>
                          <div id="msg" style={ { display: "none" } }>Oops! It did not match any results.Maybe try searching for Something different.
                          </div>
    </div>
    </div>
    </>
  )
}

export default TravelOrder