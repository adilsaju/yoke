import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext'; 
import SideMenuAdmin from '../Navbar/SideMenuAdmin';

const fetchTasks = async (admin_id) => {
  let url = `/admins/${admin_id}`;
  const res = await fetch(url);

  const data = await res.json();
  console.log("zdata",data)
  return data;
};

const Setting = () => {
 
        const [admin,setAdmin] = useState([]);
        const {loggedInUser, loginCredentials} = useContext(UserContext);
        console.log(loginCredentials.loggedInUser);

        useEffect(() => {
            
            const getTasks = async () => {
            const tfs = await fetchTasks(loginCredentials.loggedInUser.id);
            setAdmin(tfs);
            };
        
            getTasks();

        }, []);
  return (
    <>
    <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>
     <div>
      { <><h2>{admin.email}</h2>
      <h3>{admin.password}</h3></> }
   <div>
    <button>Forgot Password</button>
   </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Setting