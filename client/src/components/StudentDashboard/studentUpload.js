import React from 'react'
import { Link } from "react-router-dom";

const StudentUpload = (props) => {
    
    
  return (
    <div>
        
        <h1> Uploaded documents :</h1>

        <h2>
            Medical License: {props.starry.studentDocumentVerification.medicalLicense}
        </h2>
        
        <br>
        </br>

        <h2>
            Private License:  {props.starry.studentDocumentVerification.license}
        </h2>
       
        <br>
        </br>

        <h2>
            Radio License: {props.starry.studentDocumentVerification.radioLicense}
        </h2>
        
        <br>
        </br>
        
        <h2>
            English Proficiency : {props.starry.studentRequirements.englishProficiency}
        </h2>
       
       <br></br>
        
       <button > <Link to='/student-account-status/upload-document'>Update</Link></button>
   
    </div>
  )
}


export default StudentUpload