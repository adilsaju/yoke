import React from 'react'
import { useState,useEffect } from 'react';
import Accept from './Accept';
import Decline from './Decline';



const fetchTasks = async () => {
  let url = `/students/634c84017abbf81281febf50`;
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
      <h3>{students.name}</h3>
      <h4>{students.email}</h4>
      <div>
      <Accept/>
      <Decline/>
      </div>
      
    </div>
  )
}

export default Viewprofile