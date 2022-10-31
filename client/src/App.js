import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import SideMenu from './components/Navbar/SideMenu';
import Home from './components/AdminDashboard/Home';
 
import Viewprofile from './components/AdminDashboard/viewprofile'
import Setting from './components/AdminDashboard/Setting';
import StudentAccountStatus from './components/StudentDashboard/studentAccountStatus'
import RequestTravelOrder from './components/StudentDashboard/requestTravelOrder'
import UploadDocument from './components/StudentDashboard/UploadDocument'
import  StudentTravelOrder from './components/StudentDashboard/studentTravelOrder'
import FinalList from './components/AdminDashboard/FinalList'
import NotFound from './components/AdminDashboard/NotFound';

import { Routes, Route, Link } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { useState,useEffect } from 'react';
import TravelOrder from './components/AdminDashboard/TravelOrder';
import Archive from './components/AdminDashboard/Archive';
import Search from './components/AdminDashboard/Search';
import {UserContext} from './Contexts/UserContext'
import SettingStudent from './components/StudentDashboard/SettingStudent';
import LoginPage from './components/LoginPage';
import RejectionReason from './components/AdminDashboard/RejectionReason';
import Decline from './components/AdminDashboard/Decline';

const firebaseConfig = {
  apiKey: "AIzaSyCpGHO4mWc03HUiq3NCFbDzcZbLfH-YFZA",
  authDomain: "yoke-e05d7.firebaseapp.com",
  projectId: "yoke-e05d7",
  storageBucket: "yoke-e05d7.appspot.com",
  messagingSenderId: "57509978133",
  appId: "1:57509978133:web:b5486f62e1a8675a61ee1c",
  measurementId: "G-PSY32G7NGY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 const auth = getAuth(app);
 const storage = getStorage(app);
 export {auth,storage,app};

//  const fetchTasks = async () => {
//   let url1 = `/students`;
//   const res = await fetch(url1);
//   const data = await res.json();

//   console.log(data);
//   return data;
// };

function App() {
 
  const [students,setStudents] = useState([])  
  const [loggedInUser,setLoggedInUser] = useState({
    id: "635cc7967007ac4c3cc1aabb",
    // id:"633a08d5dcc833764b361dc3",
    name: "Jane",
    userType: "student"
  })  
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(true);
  let isLoggedIn1  =  JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn
  let loggedInUser1  =  JSON.parse(localStorage.getItem("loginCredentials")).loggedInUser
  let isAdmin1  =  JSON.parse(localStorage.getItem("loginCredentials")).isAdmin
  const [loginCredentials, setLoginCredentials] = useState({
    isLoggedIn: isLoggedIn1,
    loggedInUser: {
      id: loggedInUser1.id,
      name: loggedInUser1.name
    },
    isAdmin: isAdmin1
  });


    useEffect(() => {
      console.log("APPPJS USEFFFF  RANNNNNNNN");
      

      // if (!JSON.parse(localStorage.getItem("loginCredentials"))){
      //   localStorage.setItem("loginCredentials", null)
      // }else {

      //   let isLoggedIn  =  JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn
      //   let loggedInUser  =  JSON.parse(localStorage.getItem("loginCredentials")).loggedInUser
      //   let isAdmin  =  JSON.parse(localStorage.getItem("loginCredentials")).isAdmin

      //   //set states based on local storage
      //   setLoginCredentials({
      //     isLoggedIn: isLoggedIn,
      //     loggedInUser: {
      //       id: loggedInUser.id,
      //       name: loggedInUser.name
      //     },
      //     isAdmin: isAdmin
      //   })
      // }


      // setLoginCredentials({abc:"haha"})

      console.log("ESEFF", loginCredentials);

    }, []);

  return (
    
    <>
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, loginCredentials,  setLoginCredentials  }}>

      {/* {showAdmin ? <AdminDashboard/> : <StudentDashboard/> } */}
    <Header/>
    
    <Routes>
      <Route path="/" element={ <Home/> } /> 
      <Route path="/login" element={ <LoginPage /> } /> 
      <Route path="/logout" element={ <LoginPage /> } /> 

      <Route path="/travel-order" element={ <TravelOrder/> } />
      <Route path="/travel-order/profile/:id" element={ <Viewprofile/> } />
      <Route path='*' element={<NotFound/>}/>
      <Route path="/final-list" element={<FinalList/>}/>
      <Route path="/archive" element={<Archive/>}/>
      <Route path="/setting" element={<Setting/>}/>
      {/* <Route path='/search' element={<Search/>}/> */}
      <Route path="/student-account-status" element={<StudentAccountStatus/>}/>
      <Route path="/student-travel-order" element={<StudentTravelOrder/>}/>
      <Route path="/request" element={<RequestTravelOrder/>}/>
       <Route path='/settingStudent' element={<SettingStudent/>}/>
      <Route path="/student-account-status/upload-document" element={<UploadDocument/>}/>
      <Route path='/travel-order/profile/decline/reason' element={<RejectionReason/>}/>
      <Route path='/travel-order/profile/decline' element={<Decline/>}/>
    </Routes>
    
      <Footer/>
    </UserContext.Provider>

    </>
  );
}

export default App;
