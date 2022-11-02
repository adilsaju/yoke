import { async } from '@firebase/util';
import React from 'react'
import { useState,useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext'

const fetchTasks = async (request_id) => {
  let url = `/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  return data;
};

const approve = async (request, loggedInUser) => {
  let url = `/requests/${request._id}/approve`;

const bod1 = {
  "adminId": `${loggedInUser.id}`
}

  const res = await fetch(url, {method: 'PATCH',
   body: JSON.stringify(bod1), 
      headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();
  alert("APPROVED!")
  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const Accept = () => {

  const {loggedInUser, loginCredentials} = useContext(UserContext)
console.log(loginCredentials.loggedInUser.id);
  const [request,setStudents] = useState([]);
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
    { (!request.isRejected) && (!request.isApproved) && <button className='accept fontFira' onClick={(e) => { approve(request, loginCredentials.loggedInUser)} }>Approve</button> }
    </div>
  )
}

export default Accept