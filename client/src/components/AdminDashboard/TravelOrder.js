import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';


const fetchTasks = async () => {
  let url1 = `/pendingRequests`;
  const res = await fetch(url1);
  const data = await res.json();

  console.log(data);
  return data;
};


const myFunction = () => {
  console.log("getting calledddddddddddddddddddddd");
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  const msg = document.getElementById("msg");

  filter = input.value.toUpperCase();
  
  
  table = document.getElementById("myTable");
  console.log(table);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  const  tLen = tr.length
  let emptyCnt = 0
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
        emptyCnt ++;

      }
    }
  }

  if (emptyCnt === tLen){
    msg.style.display = "";

  }else {
    msg.style.display = "none";

  }
}

const TravelOrder = () => {


  const [students,setStudents] = useState([]);

    useEffect(() => {

      
      const getTasks = async () => {
        const tfs = await fetchTasks();
        setStudents(tfs);
      };

      getTasks();


    }, []);
let count = 1;

  return (
    <>
    <SideMenuAdmin/>
    <div>
  <div>
<input type="text" id="myInput" onKeyUp={(e) => { myFunction()} }  placeholder="Search for names.." />

   <table>
    <tbody>
    <tr>
                <th>No.</th>
                <th>Name</th>
                <th className='three'>Student Id</th>
                <th className='four'>Travel Date</th>
                <th className='five'>Action</th>
              </tr>
    </tbody>
  
   </table>
   </div>                                
            <table id="myTable" >
             <tbody>
             {students.map((student,id) => {
        if ( 'requestedStudent' in student && student.isApproved === false)
        {
          return(
              <tr key={id}>
                <td>{count++}</td>
                <td>{student.requestedStudent.name}</td>
                <td>{student.requestedStudent.studentNumber}</td>
                <td>{student.requestedDate}</td>
                <td><Link to={ `/travel-order/profile/${student._id}` }>View Profile</Link></td>
              </tr>
              ) }
      })
    }
              </tbody>
            
            </table>
            <div id="msg" style={ { display: "none" } }>Wow Such Empty</div>
    </div>
    </>
  )
}

export default TravelOrder