import React,{ useEffect,useState } from 'react'
import { app, auth, db } from '../../App';
import "./Login.css"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
  const signIn = async (email, password) => {
 try {
 const userCredential = await signInWithEmailAndPassword(
 auth,
 email,
 password
 );
 const user = userCredential.user;
 return true
 } catch (error) {
 return {error: error.message}
 }
};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault();
  setEmail("");
  setPassword("");
  const res = await signIn(email, password);
  if (res.error) seterror(res.error);
  };

  const abc = () => {
    fetch("/students/").then(()=>{
      console.log("done")
    })
  };

  useEffect(() => {
    console.log("Executed only once!");
    abc();
  }, [])


  return (
    <>
 {error ? <div>{error}</div> : null}
 <form onSubmit={handleSubmit}>
 <input
 type="text"
 name="email"
 value={email}
 placeholder="Your Email"
 onChange={(e) => setEmail(e.target.value)}
 />
 <input
 type="password"
 name="password"
 value={password}
 placeholder="Your Password"
 onChange={(e) => setPassword(e.target.value)}
 />
 <input type="submit" value="submit" />
 </form>
 <a href="/students/">Login</a>
 </>
  //  <>
  //     <div>Loginnn</div>
  //     <form onSubmit={register} name='registration_form'></form>
      
  //     <a href="/students/">Login</a></>
  )
}

export default Login