import React from 'react'
import SideMenuAdmin from './Navbar/SideMenuAdmin'
import { useNavigate } from "react-router-dom";

import { useState,useEffect,useContext } from 'react';
import {UserContext} from '../Contexts/UserContext'






const LoginPage = () => {
  // const [request,setStudents] = useState([]);
  const {setIsLoggedIn, setIsAdmin} = useContext(UserContext)


  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  }


  const login = async () => {
    let url = `/login`;
  
    
  
    const bod1 = {
      "email": `${document.querySelector("#loginid").value}`,
      "password": `${document.querySelector("#password").value}`
      }
    const res = await fetch(url, {method: 'POST',
     body: JSON.stringify(bod1),  
       headers: {
      'Content-Type': 'application/json'
    }, });
    const data = await res.json();
  
    console.log("IMPPPPPPPPPPPPP:",data);
    if (data.error === false){
      console.log("succesfooly logged in")
      //save id and token globally
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true)

      console.log(data.isAdmin);
      if (data.isAdmin){
        localStorage.setItem("isAdmin", true)
        navigate("/");
      }
      else {
        setIsAdmin(false)
        localStorage.setItem("isAdmin", false)
        navigate("/student-account-status");
      }
  
  
    }else{
      console.log("unsuccess")
      alert("unsuccess")
    }
  
    return data;
  };


  useEffect(() => {
    // let isLoggedIn  = true

    const getTasks = async () => {
      // const tfs = await fetch2();
      // requestStudent(tfs);
      // tfs.requestedStudent && setNotes(tfs.requestedStudent.notes)
    };
    // getTasks();
    localStorage.setItem("isLoggedIn", false)
    localStorage.setItem("isAdmin", true)

  }, []);

  return (

    <div>
      {/* <div className='fullpage'> */}
      {/* <SideMenuAdmin /> */}
      {/* <div className='division'> */}

      <br />
        <label htmlFor="loginid">email :  </label>
        <input type="text" name="email" id="loginid" />
        <br />
        <br />
        <label htmlFor="password">Password :  </label>
        <input type="text" name="password" id="password" />
        <br />
        <br />
      <button onClick={(e) => { login()}} >loginnn</button>
        {/* <input type="submit" /> */}
      <br />
      {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default LoginPage