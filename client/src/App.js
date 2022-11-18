import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
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
import { useState,useEffect } from 'react';
import TravelOrder from './components/AdminDashboard/TravelOrder';
import {UserContext} from './Contexts/UserContext'
import SettingStudent from './components/StudentDashboard/SettingStudent';
import LoginPage from './components/LoginPage';
import RejectionReason from './components/AdminDashboard/RejectionReason';
import Decline from './components/AdminDashboard/Decline';
import FinalViewprofiles from './components/AdminDashboard/FinalViewprofiles';
import History from './components/AdminDashboard/History';
import { Helmet, HelmetProvider } from "react-helmet-async";

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
  let isLoggedIn1  = JSON.parse(localStorage.getItem("loginCredentials")) && JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn
  let loggedInUser1  = JSON.parse(localStorage.getItem("loginCredentials")) &&  JSON.parse(localStorage.getItem("loginCredentials")).loggedInUser 
  let isAdmin1  =  JSON.parse(localStorage.getItem("loginCredentials")) && JSON.parse(localStorage.getItem("loginCredentials")).isAdmin

  if (! JSON.parse(localStorage.getItem("loginCredentials"))){

    isLoggedIn1  = false
    loggedInUser1 = {}
    isAdmin1 = true

    localStorage.setItem("loginCredentials", JSON.stringify({
      isLoggedIn: isLoggedIn1,
      loggedInUser: loggedInUser1,
      isAdmin: true,
    }))
  }

  const [loginCredentials, setLoginCredentials] = useState({
    isLoggedIn: isLoggedIn1,
    loggedInUser: {
      id: loggedInUser1.id,
      name: loggedInUser1.name
    },
    isAdmin: isAdmin1
  });

  const [pageTitle, setPageTitle] = useState("Travel Order")


    useEffect(() => {
      console.log("APPPJS USEFFFF  RANNNNNNNN");
      console.log("ESEFF", loginCredentials);

    }, []);

  return (
    
    <HelmetProvider>
      <meta
        name="description"
        content="Helps flying school manage travel order requests through automation."
      />;
      <Helmet>
        <title>Yoke</title>
      </Helmet>
      
      <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser, loginCredentials,  setLoginCredentials, pageTitle, setPageTitle  }}>
        {/* {showAdmin ? <AdminDashboard/> : <StudentDashboard/> } */}
      <Header/>
      
      <Routes>
      <Route path="/" element={ <Home/> } />
        <Route path="/dashboard" element={ <Home/> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/logout" element={ <LoginPage /> } />
        <Route path="/travel-order" element={ <TravelOrder/> } />
        <Route path={"/travel-order/profile/:id"} element={ <Viewprofile/> } />
        <Route path = {"/final-list/profile/:id"} element={<FinalViewprofiles/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path="/final-list" element={<FinalList/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/setting" element={<Setting/>}/>
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
    </HelmetProvider>
  );
}

export default App;
