import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";


const fetchTasks = async () => {
  let url1 = `http://localhost:5001/students/`;
  const res = await fetch(url1);
  const data = await res.json();

  console.log(data);
  return data;
};

const Home = () => {

  localStorage.setItem("loggedInUserId",'633a0695b149556c00bfc725')
  const found = localStorage.getItem("loggedInUserId");

  const [students,setStudents] = useState([])

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
    <div>Home of Admin</div>
    

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
      {students.map((student,id)=> {
        return (
          <div key={id}>
            <table>
             <tbody>
              <tr>
                <td>{count++}</td>
                <td>{student.name}</td>
                <td>{student.studentNumber}</td>
                <td>{student.studentDocumentVerification.dateOfVerification}</td>
                <td><Link to='/travel-order/profile'>View Profile</Link></td>
              </tr>
              </tbody>
            </table>
            </div>
        )
      })}
    </div>
    </>
  )
}

export default Home