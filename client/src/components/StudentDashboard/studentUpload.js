import React from 'react'
import { Link } from "react-router-dom";

const StudentUpload = (props) => {
    
    
  return (
    <div>
        
        <div className='studentupload'>
          <h1> Uploaded documents :</h1>
          <button > <Link to='/student-account-status/upload-document'>Update</Link></button>
        </div>

        <div className='imageupload'>
          <h2>
              Medical License: <br></br>
              <img src={props.starry.studentRequirements.medicalLicense}></img>
          </h2>
          
          <br>
          </br>
          <h2>
              Private License: <br></br>
              <img src= {props.starry.studentRequirements.license}></img>
          
               {/* {props.starry.studentDocumentVerification.license} */}
          </h2>
          <br>
          </br>
          <h2>
              Radio License:<br></br>
          
              <img src={props.starry.studentRequirements.radioLicense}></img>
               {/* {props.starry.studentDocumentVerification.radioLicense} */}
          </h2>
          
          <br>
          </br>
          
          <h2>
              English Proficiency :
              <br></br>
              <img src={props.starry.studentRequirements.englishProficiency}></img>
          </h2>
        </div>
       <br></br>
        
   
    </div>
  )
}


export default StudentUpload