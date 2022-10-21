import React from 'react'
import { useState,useEffect } from 'react';
import StudentUpload from './studentUpload';
import { Link } from "react-router-dom";

//Fetch Data using API
const fetchTasks = async () => {
  let url = `/students/633a0695b149556c00bfc725`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  console.log("In Mohit Code");
  
  return data;

};


const StudentAccountStatus = () => {
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
  return (
    
    <div>
       
       
      <h1>{students.name}</h1>
      {/* use javascript for image  {students.photo} */}
      <img src= 'https://picsum.photos/200/300'/> 
      <h2>Student ID :</h2> <h3>{students.studentNumber}</h3><br></br>
      <h2>Course :</h2> <h3>{students.program}</h3><br></br>
      <h2>Student ID :</h2> <h3>{students.studentNumber}</h3><br></br>
      <h2>Student ID :</h2> <h3>{students.studentNumber}</h3><br></br>

        <StudentUpload starry = {students} />
        
     </div> 
    
  )
  
}

export default StudentAccountStatus;