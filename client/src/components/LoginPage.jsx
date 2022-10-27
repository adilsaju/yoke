import React from 'react'
import SideMenuAdmin from './Navbar/SideMenuAdmin'
const LoginPage = () => {
  return (

    <div>
        <SideMenuAdmin />
       <br />
        <form action="none">
            <label htmlFor="LoginId">Username :  </label>
            <input type="text" />
                <br />
                <br />
            <label htmlFor="Password">Password :  </label>
            <input type="text" />
            <br />
            <br />
            <input type="submit" />
        </form>
        <br />
    </div>
  )
}

export default LoginPage