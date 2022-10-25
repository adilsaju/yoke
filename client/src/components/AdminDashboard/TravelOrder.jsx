import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import moment from "moment";


const fetchTasks = async () => {
  let url1 = `/pendingRequests`;
  const res = await fetch(url1);
  const data = await res.json();

  console.log(data);
  return data;
};

const TravelOrder = () => {


  const [students,setStudents] = useState([]);

    useEffect(() => {
      const getTasks = async () => {
        const tfs = await fetchTasks();
        setStudents(tfs);
      };

      getTasks();


    }, []);
let count = 1;

  return (
    <>
    <SideMenuAdmin/>
    <div>
  <div>
<Search/>

   <table>
    <tbody>
    <tr>
                <th>No.</th>
                <th>Name</th>
                <th className='three'>Student Id</th>
                <th className='four'>Travel Date</th>
                <th className='five'>Action</th>
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
                <td>{student.requestedStudent.name}</td>
                <td>{student.requestedStudent.studentNumber}</td>
                <td>{moment(student.requestedDate).format("MMMM Do , YYYY")}</td>
                <td><Link to={ `/travel-order/profile/${student._id}` }>View Profile</Link></td>
              </tr>
              ) }
      })
    }
              </tbody>
            
            </table>
            <div id="msg" style={ { display: "none" } }>Oops! It did not match any results.Maybe try searching for Something different.</div>
    </div>
    </>
  )
}

export default TravelOrder