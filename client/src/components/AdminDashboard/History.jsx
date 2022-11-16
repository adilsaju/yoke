import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import moment from 'moment';
import {  useContext } from 'react';
import { Link } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext'
import Popup from 'reactjs-popup';


const History = () => {

  const {pageTitle, setPageTitle} = useContext(UserContext)

    const [Archivestudent,ArchiveStudents] = useState([]);
    const [error, setError] = useState(null);

      useEffect(() => {
  setPageTitle("Archive")
        
        setTimeout(() => {
         fetch(`/api/archives`).then(res => {
           if(!res.ok) {
             throw Error(res.statusText);
           }
           return res.json();
         })
         .then(data => {
           ArchiveStudents(data);
           setError(null);
         }).catch(err => {
           setError(err.message)
         })
        },1000)

    }, []);
 

let count = 1;

return (
    <>
      <div className='fullpage'>
        <SideMenuAdmin/>
        <div className='division'>
          <div className="subDivision">
          
            <div className="topDivision">
              <Search/>
            </div>
            
                <table className='myTable'>
                  <thead>
                  { error && <div>{ error }</div> }
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th className=''>Student Id</th>
                      <th className=''>Travel Date</th>
                      <th className=''>Processed Admin</th>
                      <th className=''>Status</th>
                    </tr>
                  </thead>
                  {
                  Archivestudent.map((student,id) => 
                    {
                      return(
                        <tbody key={id}>
                          <tr className='tay'>
                            <td>
                              {count++}
                            </td>
                            <td>{student.requestedStudent && student.requestedStudent.name}</td>
                            <td>{student.requestedStudent && student.requestedStudent.studentNumber}</td>
                            <td>{moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                            <td>{ student.approvedAdmin ? student.approvedAdmin.email : "Not Applicable" }</td>
                            <td>{  
                              
                            
                              // ((!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <h2>Expired</h2>: console.log("nothing"))
                              <Popup
    trigger={open => (
      (student.isApproved ?  <p className='approved1'>Approved</p>: student.isRejected ?  <p className='declined1'>Rejected</p>: student.isExpired ?  <p>Expired</p>: (!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <p className='pending1' >Pending</p>: console.log("nothing"))
    )}
    position="bottom center"
    on={['hover', 'focus']}
    arrow={false}
    closeOnDocumentClick
  >
    <span className='thePopUp'> Reason: { student.reason } </span>
  </Popup>


                            }</td>

                          </tr>
                        </tbody>
                        ) }
                      )
                    }

                </table>
                <div id="msg" style={ { display: "none" } }>Oops! It did not match any results.Maybe try searching for Something different.
                </div>
            

          </div>
          {/* end of subDivision */}

        </div>
        {/* end of division */}
      </div>
      {/* end of fullpage */}
    </>
  )
}

export default History