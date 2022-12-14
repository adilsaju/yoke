// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const { initializeApp } = require ( "firebase/app" ) ;
const { getAnalytics } = require ( "firebase/analytics" ) ;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpGHO4mWc03HUiq3NCFbDzcZbLfH-YFZA",
  authDomain: "yoke-e05d7.firebaseapp.com",
  projectId: "yoke-e05d7",
  storageBucket: "yoke-e05d7.appspot.com",
  messagingSenderId: "57509978133",
  appId: "1:57509978133:web:b5486f62e1a8675a61ee1c",
  measurementId: "G-PSY32G7NGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

module.exports = app