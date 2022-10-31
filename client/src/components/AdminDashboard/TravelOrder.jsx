import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import moment from "moment";
import Filters from './Filters';
import "./TravelOrder.css"


// const fetchTasks = async () => {
//   let url1 = `/pendingRequest`;
//   const res = await fetch(url1);
//   const data = await res.json();

//   console.log(data);
//   return data;
// };

const TravelOrder = () => {


  const [requests,setRequests] = useState([]);
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
    console.log("TOOO: data");
    setRequests(data);
    setError(null);
  }).catch(err => {
    setError(err.message)
  })
 },1000)

    }, []);
let count = 1;
//Sort By Name
// let keyword =  requests.sort((a,b) => {
//  if (a.requestedStudent.name < b.requestedStudent.name) 
//  {
//   return -1;
//  }
//  if(a.requestedStudent.name > b.requestedStudent.name)
//  return 1;
//  return 0 ;
// })
//Sort By Date
// let keyword =  requests.sort((a,b)=> {
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
                              <tr className="heading">
                                          <th>No.</th>
                                          <th>Requested ID</th>
                                          <th>Name</th>
                                          <th className=''>Student Id</th>
                                          <th className=''>Travel Date</th>
                                          <th className=''>Action</th>
                                        </tr>
                              {/* </tbody> */}
                              
                              {/* </table> */}
                              
                              {/* <table className="myTable" > */}
                              {/* <tbody> */}
                              {requests.map((request,id) => {
                                                    if ( 'requestedStudent' in request && request.isApproved === false)
                                                    {
                                                      return(
                              <tr className='tay' key={id}>
                                <td>{count++}</td>
                                <td>{request._id}</td>
                                <td>{request.requestedStudent && request.requestedStudent.name}</td>
                                <td>{request.requestedStudent && request.requestedStudent.studentNumber}</td>
                                <td>{moment(request.flightDate).format("MMMM Do , YYYY")}</td>
                                <td><Link to={ `/travel-order/profile/${request._id}` }>View Profile</Link></td>
                              </tr>
                              ) }
                                                })
                                              }
                            </tbody>
                          </table>
                    
                      </div>
                          <div id="msg" style={ { display: "none" } }>Oops! It did not match any results.Maybe try searching for Something different.
                          </div>
    </div>
    </div>
    </>
  )
}

export default TravelOrder