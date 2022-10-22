import React from 'react'
import { useState,useEffect } from 'react';
import Accept from './Accept';
import Decline from './Decline';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import { useParams } from "react-router-dom";


const fetchTasks = async () => {
  let url = `/students/634c84017abbf81281febf50`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  return data;
};

const approve = async () => {
  let url = `/students/634c84017abbf81281febf50`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  return data;
};

const decline = async () => {
  let url = `/students/634c84017abbf81281febf50`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  return data;
};

const Viewprofile = () => {
  const [students,setStudents] = useState([]);
  let params = useParams();

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks();
      setStudents(tfs);
    };
    getTasks();
  }, []);

  return (
    <div>
      <SideMenuAdmin/>
      <h3>{students.name}</h3>
      <h4>{students.email}</h4>
      <h4>{params.id}</h4>
      {/* <div>
      <Accept/>
      <Decline/>
      </div> */}
      <button onClick={approve}>Approve</button>
      <button onClick={decline}>Decline</button>
    </div>
  )
}

export default Viewprofile