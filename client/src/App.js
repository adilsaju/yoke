import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCpGHO4mWc03HUiq3NCFbDzcZbLfH-YFZA",
  authDomain: "yoke-e05d7.firebaseapp.com",
  projectId: "yoke-e05d7",
  storageBucket: "yoke-e05d7.appspot.com",
  messagingSenderId: "57509978133",
  appId: "1:57509978133:web:b5486f62e1a8675a61ee1c",
  measurementId: "G-PSY32G7NGY"
};

function App() {
  // const firebaseApp = firebase.apps[0];
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);


  return (

    <div>



      <h1>React & Firebase</h1>
      <h2>By @farazamiruddin</h2>
      <code>
        {/* <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre> */}
        <pre>{JSON.stringify(app.options, null, 2)}</pre>
        
      </code>
      <button id="signin">asd</button>
      <Login />
    </div>
  );
}

export default App;
