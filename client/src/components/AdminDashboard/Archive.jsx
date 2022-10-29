import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import moment from 'moment';
 
const Archive = () => {
    const [Archivestudent,ArchiveStudents] = useState([]);
    const [error, setError] = useState(null);

      useEffect(() => {
        setTimeout(() => {
         fetch(`/archives`).then(res => {
           if(!res.ok) {
             throw Error('could not fetch the data for that resource');
           }
           return res.json();
         })
         .then(data => {
           ArchiveStudents(data);
           setError(null);
         }).catch(err => {
           setError(err.message)
         })
        },1000)

    }, []);
 

let count = 1;

return (
    <>
    <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>
    <div>
  <div>
    <Search/>
   <table>
    <tbody>
    <tr>
                <th>No.</th>
                <th>Requested ID</th>
                <th>Name</th>
                <th className='three'>Student Id</th>
                <th className='four'>Travel Date</th>
                <th className='five'>Action</th>
              </tr>
              { error && <div>{ error }</div> }
    </tbody>
  
   </table>
   </div>
   
  {
  Archivestudent.map((student,id) => 
    {
          return(
            <div key={id}>
        <table className="myTable">
        <tbody>
        <tr className='tay'>
          <td>
            {count++}
          </td>
          <td>{student._id}</td>
          <td>{student.requestedStudent.name}</td>
          <td>{student.requestedStudent.studentNumber}</td>
          <td>{moment(student.flightDate).format("MMMM Do , YYYY")}</td>
          <td>{  
                        (student.isApproved ?  <p>Approved</p>: student.isRejected ?  <p>Rejected</p>: student.isExpired ?  <p>Expired</p>: (!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <p>Pending</p>: console.log("nothing"))
                       
                        // ((!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <h2>Expired</h2>: console.log("nothing"))
                    }</td>
        </tr>
        </tbody>
        </table>
        </div>
          )
       
    
          
 },[])
}
</div>
</div>
</div>
    </>
  )
}

export default Archive