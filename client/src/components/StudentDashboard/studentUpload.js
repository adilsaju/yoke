import React from 'react'
import { Link } from "react-router-dom";

const StudentUpload = (props) => {
    console.log(props.starry.length)
    
  return (
    <div>
        
        <h1> Uploaded documents :</h1>

        <h2>
            Medical License: {props.starry.name}
        </h2>
        
        <br>
        </br>

        <h2>
            Private License:  {props.starry.name}
        </h2>
       
        <br>
        </br>

        <h2>
            Radio License: {props.starry.name}
        </h2>
        
        <br>
        </br>
        
        <h2>
            English Proficiency : {props.starry.name}
        </h2>
       
       <br></br>
        
       <button > <Link to='/student-account-status/upload-document'>View Profile</Link></button>
   
    </div>
  )
}


export default StudentUpload