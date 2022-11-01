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
const decline = async (request, loggedInUser) => {
  let url = `/requests/${request._id}/decline`;
  const bod1 = {
    "adminId": `${loggedInUser.id}`
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
  const {loggedInUser, loginCredentials} = useContext(UserContext)

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
      {(!request.isRejected) && (!request.isApproved) && <button className='decline' onClick={(e) => { decline(request, loginCredentials.loggedInUser)} }>Decline</button> }
      <h3>The request is already approved!</h3>
    </div>
  )
}

export default Decline