import React from 'react'
import { useState,useEffect } from 'react';

const fetchTasks = async () => {
    let url1 = `/archives`;
    const res = await fetch(url1);
    const data = await res.json();
  
    console.log(data);
    return data;
  };
 
 
const Archive = () => {
    const [Archivestudent,ArchiveStudents] = useState([]);

    useEffect(() => {

      
      const getTasks = async () => {
        const tfs = await fetchTasks();
        ArchiveStudents(tfs);
      };

      getTasks();


    }, []);
 

let count = 1;

return (
    <>
    <div>
  <div>
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
  {
  Archivestudent.map((student,id) => 
    {
      if ( 'requestedStudent' in student )
      {
           if(student.isApproved === false ) {
          return(
            <div key={id}>
        <table>
        <tbody>
        <tr>
          <td>
            {count++}
          </td>
          <td>{student.requestedStudent.name}</td>
          <td>{student.requestedStudent.studentNumber}</td>
          <td>{student.flightDate}</td>
        <td>
          {'Approved'}
        </td>
        </tr>
        </tbody>
        </table>
        </div>
          )
    }
    else {
      return(
        <div key={id}>
  <table>
    <tbody>
    <tr>
    <td>{count++}</td>
    <td>{student.requestedStudent.name}</td>
    <td>{student.requestedStudent.studentNumber}</td>
    <td>{student.flightDate}</td>
    <td>{'Declined'}</td>
    </tr>
    </tbody>
   </table>
   </div>
    )}
          
 }
} )
}
</div>
    </>
  )
}

export default Archive