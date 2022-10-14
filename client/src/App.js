import './App.css';
import Login from './components/Login/Login';
import Home from './components/AdminDashboard/Home'
import { Routes, Route, Link } from "react-router-dom";


// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { useState,useEffect } from 'react';






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
  // console.log("loca")
  // const firebaseApp = firebase.apps[0];
  const [students,setStudents] = useState([])
  // const found = students.filter(e => {
  //   return e.id === '633a07f18e54c3b88bd83f38';
  // })

  console.log(found)
useEffect(() => {

  
  const getTasks = async () => {
    const tfs = await fetchTasks();
    setStudents(tfs);
  };

  getTasks();


}, []);

  return (

    // <div>



    //   <h1>React & Firebase</h1>
    //   <h2>By @farazamiruddin</h2>
    //   <code>
    //     {/* <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre> */}
    //     <pre>{JSON.stringify(app.options, null, 2)}</pre>
        
    //   </code>
    //   <button id="signin">asd</button>
    //   <Login />
    // </div>


    <>
    <div>
      <h2>Name:{found}</h2>
    </div>
    <div>
      {students.map((student,id)=> {
      
        return (
          <div key={id}>
            <h2> name:{student.name}</h2>
            <h3>email:{student.email}</h3>
            <h3>flownHours:{student.studentRequirements.flownHours}</h3> 
            <h3>Medical License:{student.studentDocumentVerification.medicalLicense}</h3>
            </div> 
        )
     
      })}
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/login" element={ <Login/> } />

    </Routes>
    
    
    </>
  );
}

export default App;
