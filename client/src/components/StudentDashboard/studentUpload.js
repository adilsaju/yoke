import React from 'react'
import { Link } from "react-router-dom";

const StudentUpload = (props) => {
    
    
  return (
    <div>
        
        <h1> Uploaded documents :</h1>

        <h2>
            Medical License: <br></br>
            <img src='https://firebasestorage.googleapis.com/v0/b/yoke-e05d7.appspot.com/o/ab1.png?alt=media&token=746d9895-4b6e-449e-8634-c55433b8a1a9'></img>
            {/* {props.starry.studentDocumentVerification.medicalLicense} */}
        </h2>
        
        <br>
        </br>

        <h2>
            Private License: <br></br>

            <img src='https://firebasestorage.googleapis.com/v0/b/yoke-e05d7.appspot.com/o/ab2.jpeg?alt=media&token=cda5f777-2986-4c98-bb5c-c50205795e6b'></img>
            
             {/* {props.starry.studentDocumentVerification.license} */}
        </h2>
       
        <br>
        </br>

        <h2>
            Radio License:<br></br>
            
            <img src=' https://firebasestorage.googleapis.com/v0/b/yoke-e05d7.appspot.com/o/ab3.jpeg?alt=media&token=ccb92583-9d56-4398-8002-89e4f732cd17'></img>
             {/* {props.starry.studentDocumentVerification.radioLicense} */}
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