import { async } from '@firebase/util';
import React from 'react'
import { useState,useEffect } from 'react';


const fetchTasks = async () => {
    let url = `/students/634c84017abbf81281febf50`;
    const res = await fetch(url);
    const data = await res.json();
  
    console.log(data);
    return data;
  };

const Accept = () => {
    const [students,setStudents] = useState([]);
    useEffect(() => {

      
        const getTasks = async () => {
          const tfs = await fetchTasks();
          setStudents(tfs);
        };
      
        getTasks();
      
      
      }, []);

  const onCheck = async (studenti) => {
    const res= await fetch(`/students/634c84017abbf81281febf50`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(studenti),
      });
      const data = await res.json();
      console.log(data);
    }

    onCheck()

  return (
    <button>Accept</button>
  )
}

export default Accept