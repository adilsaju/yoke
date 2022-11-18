import React from 'react'
import SideMenuAdmin from './Navbar/SideMenuAdmin'
import { useNavigate } from "react-router-dom";
import { useState,useEffect,useContext } from 'react';
import {UserContext} from '../Contexts/UserContext';
import "./LoginPage.css";
import cover from './images/plane.png';
import logoDBlue from './images/logoDrkBlue.png';
import pwEye1 from  './images/pwHideDark.svg';
import pwEye2 from  './images/pwShowDark.svg';


const define = () => {
  
  document.body.classList.add('loginerrorhide');

}

const defineji = () => {
  document.body.classList.remove('loginerrorhide');
}


const LoginPage = () => {
  // const [request,setStudents] = useState([]);
  document.body.classList.remove('loginerrorhide');
  const { loginCredentials, setLoginCredentials } = useContext(UserContext)
  const {pageTitle, setPageTitle} = useContext(UserContext)


  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  }


  const login = async () => {
    let url = `/api/login`;
  
    
  
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
      defineji()
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
        navigate("/dashboard");
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
      define()
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
    const eye = document.querySelector("#passwordEye")
    
    if (el.type === "password" )
    {
      el.type = "text"
      eye.src = pwEye2
    }
    else {
      el.type = "password"
      eye.src = pwEye1
    }
    
    
  }

  return (
<div className="parent">

    <div className="dummy">
    <img src={cover} ></img>
    </div>

    <div className='form1'>
      {/* <div className='fullpage'> */}
      {/* <SideMenuAdmin /> */}
      {/* <div className='division'> */}
      <img src={logoDBlue} ></img>
      <p>Please Login with the flying school credentials</p>
      <div className="inputField">
        <div className="label-input-wrapper">
          <label htmlFor="loginid">Your Email</label>
          <div className="ii-wrapper email-wrapper"  >
          <input type="email" name="email" id="loginid" placeholder='email' />
          </div>
        </div>
        <div className="label-input-wrapper">
          <label htmlFor="password">Your Password</label>
          <div className="ii-wrapper passwordWrapper"  >
            <div className="abc-wrapper">

              <input type="password" name="password" id="password" placeholder='password' onKeyDown={(e)=>{  if (e.keyCode === 13)
                                                                                                                  login();  }}/>
              <button onClick={(e)=>{show()}} > <img id="passwordEye" src={pwEye1} alt="hide password" /> </button>
            </div>
              <a href="#">Forgot Password?</a>
          </div>
        </div>
      </div>
      <span className='loginerror'>Incorrect username or password.</span>
        <br />
     
      
      <button className="yellowBtn" onClick={(e) => { login()}} >Login</button>
      
        {/* <input type="submit" /> */}
      
      {/* </div> */}
      {/* </div> */}
    </div>
</div>

  )
}

export default LoginPage