import React from 'react'
import SideMenuAdmin from './Navbar/SideMenuAdmin'
import { useNavigate } from "react-router-dom";

import { useState,useEffect,useContext } from 'react';
import {UserContext} from '../Contexts/UserContext'

import "./LoginPage.css"




const LoginPage = () => {
  // const [request,setStudents] = useState([]);
  const { loginCredentials, setLoginCredentials } = useContext(UserContext)
  const {pageTitle, setPageTitle} = useContext(UserContext)


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
      // setIsLoggedIn(true);
      console.log(data.isAdmin);
      if (data.isAdmin){
        localStorage.setItem("loginCredentials", JSON.stringify({
          isLoggedIn: true,
          isAdmin: true,
          loggedInUser: {
            id: data.data._id,
            name: data.data.name
          }
        }))
        setLoginCredentials({
          isLoggedIn: JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn,
          isAdmin: JSON.parse(localStorage.getItem("loginCredentials")).isAdmin,
          loggedInUser: JSON.parse(localStorage.getItem("loginCredentials")).loggedInUser,
        })
        // setIsAdmin(true)
        navigate("/");
      }
      else {

        localStorage.setItem("loginCredentials", JSON.stringify({
          isLoggedIn: true,
          isAdmin: false,
          loggedInUser: {
            id: data.data._id,
            name: data.data.name
          }
        }))
        setLoginCredentials({
          isLoggedIn: JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn,
          isAdmin: JSON.parse(localStorage.getItem("loginCredentials")).isAdmin,
          loggedInUser: JSON.parse(localStorage.getItem("loginCredentials")).loggedInUser,
        })
        // setIsAdmin(false)
        navigate("/student-account-status");
      }

    }else{
      console.log("unsuccess")
      alert("unsuccess")
    }
  
    return data;
  };


  useEffect(() => {
  setPageTitle("")

    // let isLoggedIn  = true

    const getTasks = async () => {
      // const tfs = await fetch2();
      // requestStudent(tfs);
      // tfs.requestedStudent && setNotes(tfs.requestedStudent.notes)
    };
    // getTasks();
    //logout reset basically
    localStorage.setItem("loginCredentials", null)

  }, []);

  const show = () => {
    // console.log("hah")
    const el = document.querySelector("#password")
    el.type === "password" ? el.type = "text" : el.type = "password"
  }

  return (
<div className="parent">

    <div className="dummy">

    </div>

    <div className='form1'>
      {/* <div className='fullpage'> */}
      {/* <SideMenuAdmin /> */}
      {/* <div className='division'> */}

      <br />
      <div className="label-input-wrapper">

        <label htmlFor="loginid">email :  </label>
        <input type="email" name="email" id="loginid" />
      </div>
        <br />
      <div className="label-input-wrapper">

        <label htmlFor="password">Password :  </label>
        <div className="ii-wrapper"  >

            <input type="password" name="password" id="password" />
            <button onClick={(e)=>{show()}} >show</button>
        </div>
      </div>

        <br />
        <br />
      <a href="daasa">Forgot Password?</a>
      <button onClick={(e) => { login()}} >loginnn</button>

        {/* <input type="submit" /> */}
      <br />
      {/* </div> */}
      {/* </div> */}
    </div>
</div>

  )
}

export default LoginPage