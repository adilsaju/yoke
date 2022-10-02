import React,{ useEffect } from 'react'
const Login = () => {

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
    <div>Loginnn</div>

    <a href="/students/" >Login</a>
    </>
  )
}

export default Login