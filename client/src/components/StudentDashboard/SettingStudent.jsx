import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext'; 
import SideMenu from '../Navbar/SideMenu';


const fetchTasks = async (student_id) => {
    let url = `/students/${student_id}`;
    const res = await fetch(url);
  
    const data = await res.json();
    return data;
  };
  
const SettingStudent = () => {
  const {pageTitle, setPageTitle} = useContext(UserContext)

    const [student,setStudent] = useState([]);
    const {loggedInUser, loginCredentials} = useContext(UserContext);
    console.log(loginCredentials.loggedInUser);

    useEffect(() => {
  setPageTitle("Setting")
            
        const getTasks = async () => {
        const tfs = await fetchTasks(loginCredentials.loggedInUser.id);
        setStudent(tfs);
        };
    
        getTasks();

    }, []);

  return (
    <>
    <div className='fullpage'>
       <SideMenu/>
      <div className='division'>
    
    <div>
     { <><h2>{student.email}</h2>
     <h3>{student.password}</h3></> }
     <div>
     <button>Forgot Password</button>
     </div>
   </div>
   </div>
   </div>
   </>
  )
}

export default SettingStudent
