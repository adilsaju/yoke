import { async } from '@firebase/util';
import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";

const fetchTasks = async (request_id) => {
  let url = `/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  return data;
};

const approve = async (request) => {
  let url = `/requests/${request._id}/approve`;
//   const bod1 = {
//     "adminId": `${adminId}`
// }

const bod1 = {
  "adminId": `633a0695b149556c00bfc720`
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
    { (!request.isApproved) && <button className='accept' onClick={(e) => { approve(request)} }>Approve</button> }
    </div>
  )
}

export default Accept