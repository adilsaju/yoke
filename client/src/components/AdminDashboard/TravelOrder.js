import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';

const fetchTasks = async () => {
  let url1 = `/pendingRequests`;
  const res = await fetch(url1);
  const data = await res.json();

  console.log(data);
  return data;
};

const TravelOrder = () => {


  const [students,setStudents] = useState([]);
  const [q, setQ] = useState("");
    // const [searchParam] = useState(["name"]);

    useEffect(() => {

      
      const getTasks = async () => {
        const tfs = await fetchTasks();
        setStudents(tfs);
      };

      getTasks();


    }, []);
let count = 1;
// function search(student) {
//   return student.filter((student) => {
//       return searchParam.some((newItem) => {
//           return (
//               student[newItem]
//                   .toString()
//                   .toLowerCase()
//                   .indexOf(q.toLowerCase()) > -1
//           );
//       });
//   });
// }

  return (
    <>
    <SideMenuAdmin/>
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
   <div className="search-wrapper">
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for..."
                                value={q}
                                /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
                                onChange={(e) => setQ(e.target.value)} 
                                />
                                </label>
                                </div>
      {students.map((student,id)=> {
        if ( 'requestedStudent' in student )
        {
        return (
          <div key={id}>
            <table>
             <tbody>
              <tr>
                <td>{count++}</td>
                <td>{student.requestedStudent.name}</td>
                <td>{student.requestedStudent.studentNumber}</td>
                <td>{student.requestedDate}</td>
                <td><Link to={ `/travel-order/profile/${student._id}` }>View Profile</Link></td>
              </tr>
              </tbody>
            </table>
            </div>
        )
}})}
    </div>
    </>
  )
}

export default TravelOrder