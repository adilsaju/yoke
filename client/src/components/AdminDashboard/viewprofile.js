import React from 'react'
import { useState,useEffect } from 'react';
import Accept from './Accept';
import Decline from './Decline';



const fetchTasks = async () => {
  let url = `/requests/634c84a03120a384503e8adb`;
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
    <>
    <div>
        <h3>{students.length===0? console.log("Nothing") : students.requestedStudent.name}</h3>

        <h4>{students.length===0? console.log("Nothing") :students.requestedStudent.email}</h4>
        </div>
      <div>
      <Accept/>
      <Decline/>
      </div>
    </>
  )
}

export default Viewprofile