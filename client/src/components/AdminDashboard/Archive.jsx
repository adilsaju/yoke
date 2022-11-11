import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import moment from 'moment';
import {  useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext'
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Archive = () => {
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
                      <th>Requested ID</th>
                      <th>Name</th>
                      <th className=''>Student Id</th>
                      <th className=''>Travel Date</th>
                      <th className=''>Status</th>
                      <th className=''>Action</th>
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
                            <td>{student._id}</td>
                            <td>{student.requestedStudent && student.requestedStudent.name}</td>
                            <td>{student.requestedStudent && student.requestedStudent.studentNumber}</td>
                            <td>{moment(student.flightDate).format("MMMM Do , YYYY")}</td>
                            <td>{  
                              (student.isApproved ?  <p>Approved</p>: student.isRejected ?  <p>Rejected</p>: student.isExpired ?  <p>Expired</p>: (!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <p>Pending</p>: console.log("nothing"))
                            
                              // ((!student.isExpired) && (!student.isRejected) && (!student.isApproved) ?  <h2>Expired</h2>: console.log("nothing"))
                            }</td>
                            <td><Link to={ `/final-list/profile/${student._id}` }>
                              {/* <button className="viewProfileBtn">Review</button> */}
                              
                              <Popup
    trigger={open => (
      <button className="button viewProfileBtn">Review</button>
    )}
    position="bottom center"
    on={['hover', 'focus']}
    arrow={true}
    closeOnDocumentClick
  >
    <span> Reason: { student.reason } </span>
  </Popup>
                              
                              </Link></td>
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

export default Archive