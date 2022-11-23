
import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Search from './Search';
import moment from "moment";
import Filters from './Filters';
import "./TravelOrder.css"
import {  useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from '../../Contexts/UserContext'
import { useLocation } from "react-router-dom";
let loading = true;

const TravelOrder = () => {
  const {pageTitle, setPageTitle} = useContext(UserContext)
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
}

  const [requests,setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [filterTextvalue,updatefilterText] = useState('SelectFilter')
  
    useEffect(() => {
  setPageTitle("Travel Order")
  if(!JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn){
    handleClick();
    }
 setTimeout(() => {
  fetch(`/api/pendingRequests`).then(res => {
    if(!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    console.log("TOOO: data");
    setRequests(data);
    setError(null);
  }).catch(err => {
    setError(err.message)
  })
 })

    }, []);
let count = 1;

 requests.sort((a,b) => {
  if(filterTextvalue === 'SelectFilter') {
    return new Date(a.flightDate).getTime() - new Date(b.flightDate).getTime() ;
  }
  if(filterTextvalue === 'NameASC')
  {
    return a.requestedStudent.name > b.requestedStudent.name ?1:-1
  }
  if(filterTextvalue === 'NameDES')
  {
    return a.requestedStudent.name < b.requestedStudent.name ?1:-1
  }
  if(filterTextvalue === 'DateASC')
  {
    return new Date(a.flightDate).getTime() - new Date(b.flightDate).getTime() ;
  }
  if(filterTextvalue === 'DateDES')
  {
    return new Date(b.flightDate).getTime() - new Date(a.flightDate).getTime() ;
  }
})

function onFilterValueSelected(filterValue) {
updatefilterText(filterValue);
}

console.log(requests.length)
const { pathname } = useLocation();
if (pathname === "/landing") return null;


return (
    <>
  <div className='fullpage'>
    <SideMenuAdmin/>
      <div className='division'>
          <div className="subDivision">
          
{ requests.filter(task=> task).length > 0 ? 
    <><div className="topDivision">
              <Search />
              <div className="leftBorder">
                <Filters FilterValueSelected={onFilterValueSelected} />
              </div>
            </div><table className="myTable adminTO">
                <thead>
                  {error && <div>{error}</div>}
                  <tr className="heading">
                    <th>No.</th>
                    <th>Name</th>
                    <th className=''>Student Id</th>
                    <th className=''>Travel Date</th>
                    <th className=''>Action</th>
                  </tr>
                </thead>

                {requests.map((request, id) => {
                  if ('requestedStudent' in request && request.isApproved === false) {
                    return (
                      <tbody key={id}>
                        <tr className='tay'>
                          <td>{count++}</td>
                          <td>{request.requestedStudent && request.requestedStudent.name}
                          <div className="mobile-data">
                           <div className="id"> ID - {request.requestedStudent && request.requestedStudent.studentNumber}</div>
                            <div className="travdate">Travel date - {moment(request.flightDate).format("MM/DD/YYYY")}</div>
                          </div>
                          </td>
                          <td>{request.requestedStudent && request.requestedStudent.studentNumber}</td>
                          <td>{moment(request.flightDate).format("MM/DD/YYYY")}</td>
                          <td><Link to={`/travel-order/profile/${request._id}`}><button className="viewProfileBtn dBlueBtn">View Profile</button></Link></td>
                        </tr>
                      </tbody>
                    );
                  }
                })}

              </table>
              
              {loading = false} 
              </>
               
 : <> { loading ? 
  (
    <div>No student has requested for travel order yet</div>
  ) :
          <span >Loading....</span>
        } </>
  }

    
          </div>
          {/* end of subDivision */}
              <div id="msg" style={ { display: "none" } }>Oops! It did not match any results. Maybe try searching for something different.
              </div>
      </div>
      {/* end of division  */}
    </div> 
    </>
  )
}

export default TravelOrder

