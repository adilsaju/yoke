import React from 'react'
import './HeaderFooter.css'
import { useLocation } from "react-router-dom";

const Footer = () => {

  const { pathname } = useLocation();
  console.log(pathname);
  if (pathname === "/login" || pathname === "/login-student" || pathname === "/logout" || pathname === "/landing") return null;

  return (
    
        <footer>
          <p className="fontFira deskfoot">Copyright @2022 Yoke | All Rights Reserved</p>
          <p className="fontFira mobilefoot">&copy; Yoke</p>
          <div>
            
          </div>
        </footer>
       
  )
}

export default Footer