import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { useParams } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext'

const fetchTasks = async (request_id) => {
  let url = `/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  return data;
};
const decline = async (request, loggedInUserAdmin) => {
  let url = `/requests/${request._id}/decline`;
  const bod1 = {
    "adminId": `${loggedInUserAdmin.id}`
  }
  const res = await fetch(url, {method: 'PATCH', body: JSON.stringify(bod1),     headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();
  alert("DECLINED!")

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const Decline = () => {
  const [request,setStudents] = useState([]);
  const {loggedInUserAdmin} = useContext(UserContext)

  let params = useParams();
  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(params.id);
      setStudents(tfs);
    };
    getTasks();
  }, []);

  return (
    <div>
      {(!request.isRejected) && <button className='decline' onClick={(e) => { decline(request, loggedInUserAdmin)} }>Decline</button> }
    </div>
  )
}

export default Decline