import './App.css';
import SideMenu from './components/Navbar/SideMenu';
import Home from './components/AdminDashboard/Home'
import Viewprofile from './components/AdminDashboard/viewprofile'

import { Routes, Route, Link } from "react-router-dom";


// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { useState,useEffect } from 'react';
import TravelOrder from './components/AdminDashboard/TravelOrder';
import Archive from './components/AdminDashboard/Archive';

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

 const fetchTasks = async () => {
  let url1 = `http://localhost:5001/students/`;
  const res = await fetch(url1);
  const data = await res.json();

  console.log(data);
  return data;
};

function App() {
  localStorage.setItem("loggedInUserId",'633a0695b149556c00bfc725')
  const found = localStorage.getItem("loggedInUserId");
 
  const [students,setStudents] = useState([])


  console.log(found)
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
    <nav>
      <ul>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/travel-order">Travel Order</Link>
        </li>
        {/* <li>
        <Link to="/login">Login</Link>
        </li> */}
        <li>
          <Link to="/final-list">Final list</Link>
        </li>
        <li>
          <Link to="/archive">Archive</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={ <Home/> } /> 
      <Route path="/travel-order" element={ <TravelOrder/> } />
      <Route path="/travel-order/profile" element={ <Viewprofile/> } />
      <Route path="/final-list" element={<SideMenu/>}/>
      <Route path="/archive" element={<Archive/>}/>
    </Routes>
    
    
    </>
  );
}

export default App;
