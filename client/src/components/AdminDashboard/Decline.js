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
const decline = async (request) => {
  let url = `/requests/${request._id}/decline`;
  const bod1 = {
    "adminId": `633a0695b149556c00bfc720`
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
      {(!request.isRejected) && <button className='decline' onClick={(e) => { decline(request)} }>Decline</button> }
    </div>
  )
}

export default Decline