import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext'; 


const fetchTasks = async (student_id) => {
    let url = `/students/${student_id}`;
    const res = await fetch(url);
  
    const data = await res.json();
    return data;
  };
  
const SettingStudent = () => {
    const [student,setStudent] = useState([]);
    const {loggedInUser} = useContext(UserContext);
    console.log(loggedInUser);

    useEffect(() => {
            
        const getTasks = async () => {
        const tfs = await fetchTasks(loggedInUser.id);
        setStudent(tfs);
        };
    
        getTasks();

    }, []);

  return (
    <>
    <div>
     { <><h2>{student.email}</h2>
     <h3>{student.password}</h3></> }
     <div>
     <button>Forgot Password</button>
     </div>
   </div>
   </>
  )
}

export default SettingStudent
