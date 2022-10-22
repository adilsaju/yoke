import { async } from '@firebase/util';
import React from 'react'
import { useState,useEffect } from 'react';


const fetchTasks = async () => {
    let url = `/requests/634c84a03120a384503e8adb`;
    const res = await fetch(url);
    const data = await res.json();
  
    console.log(data);
    return data;
  };

const Accept = () => {
    const [students,setStudents] = useState([]);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {

      
        const getTasks = async () => {
          const tfs = await fetchTasks();
          setStudents(tfs);
        };
      
        getTasks();
      
      
      }, []);

  const onCheck = async () => {
    const res= await fetch(`/requests/634c84a03120a384503e8adb/approve`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'text/plain',
        },    
        body: {
          "adminId": "633a0695b149556c00bfc720"
      },
      });
      const data = await res.json();
      console.log(data);
    
   
let st = null;
setTasks(
  tasks.map((task) => {
    if(task.isAccepted === false) {
      task.isAccepted = true;
    }
  }))
}

  return (
    <button onClick={() => onCheck()}>Accept</button>
  )
}

export default Accept