import React from 'react'
import { useState,useEffect } from 'react';



const fetchTasks = async () => {
  let url = `http://localhost:5001/students/`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  return data;
};

const Viewprofile = () => {
  const [students,setStudents] = useState([]);

  useEffect(() => {

      
    const getTasks = async () => {
      const tfs = await fetchTasks();
      setStudents(tfs);
    };
  
    getTasks();
  
  
  }, []);

  return (
    <div>
      {students.map((student,id)=> {
        return (
          <div className='views' key={id}>
            <div>
        <h1>{student.name}</h1>
        <h2>Student Number:{student.studentNumber}</h2>
        <h2>Current License:{student.studentRequirements.licenseType}</h2>  
        <h2>Flown Hours : {student.requests[0].flightDate}</h2>
        </div>
        </div>
        )
      })}
    </div>
  )
}

export default Viewprofile