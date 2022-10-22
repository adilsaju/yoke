import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
//Fetch Data using API
const fetchTasks = async () => {
    let url = `/students/633a0695b149556c00bfc725`;
    const res = await fetch(url);
    const data = await res.json();
  
    console.log(data);
    console.log("In Mohit Code");
    
    return data;
  
  };
  
  
  const FinalList = () => {
      
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
        <SideMenuAdmin/>
        <h2>In progress</h2>
           {console.log("o teri") }
        </>
     
    )}

export default FinalList