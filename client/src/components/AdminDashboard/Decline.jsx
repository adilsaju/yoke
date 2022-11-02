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

function Openform() {
  document.getElementById('form1').style.display = 'block';
}

function Closeform() {
  document.getElementById('form1').style.display = 'none';
}

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
      {(!request.isRejected) && (!request.isApproved) && <button className='decline' onClick={(e) => { Openform();decline(request, loginCredentials.loggedInUser)} }>Decline</button> }
      {(request.isApproved) ? <h3>The request is already approved!</h3> : console.log("nothing")}
      <form id="form1" method="post" style={{display:"none"}}>
      <label htmlFor="reason for denial">Reason for Rejection:  </label>
        <select name="rod" id="rod">
          <option value="low balance">Balance insufficient</option>
          <option value="fly hours less">Flight hours insufficient</option>
          <option value="License not approved">License not valid</option>
          <option value="No spots left">No spots left</option>
        </select>
        <input type="submit" value="Submit"></input>
        </form>
    </div>
    
  )
}

export default Decline