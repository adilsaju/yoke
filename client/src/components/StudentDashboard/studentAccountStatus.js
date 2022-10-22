import React from 'react'
import { useState,useEffect } from 'react';
import StudentUpload from './studentUpload';
import { Link } from "react-router-dom";



//Fetch Data using API
const fetchTasks = async () => {
  let url = `/requests?student=633a0695b149556c00bfc725`;
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
    <>
    <div>
      
      {students.map((student,id)=> {
        <h1>{student.requestedStudent.name}</h1>
      })}
           </div> 
    </>
  )
  
}

export default StudentAccountStatus;