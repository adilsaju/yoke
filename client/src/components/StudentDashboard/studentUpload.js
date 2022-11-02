import React from 'react'
import { Link } from "react-router-dom";
// import './studentAccountStatus.css';

const StudentUpload = (props) => {
    
    
  return (
    <div className="whiteBg">
        
        <div className='studentupload'>
          <div className="topOfTheBox">
            <h3>Uploaded documents</h3>
            <button className="yellowBtn"> <Link to='/student-account-status/upload-document'>Update</Link></button>
          </div>
        

            <div className='imageupload'>
              <div>
                <h3>Medical License</h3>
                  <img src={props.starry && props.starry.studentRequirements && props.starry.studentRequirements.medicalLicense} />
              </div>
              
              
                
                <div>
                  <h3>Private License</h3>
                    <img src= {props.starry && props.starry.studentRequirements &&  props.starry.studentRequirements.license} />
                </div>
                
                    {/* {props.starry.studentDocumentVerification.license} */}
                

                <div>
                  <h3>Radio License</h3>
                    <img src={props.starry && props.starry.studentRequirements &&  props.starry.studentRequirements.radioLicense} />
                </div>
                    {/* {props.starry.studentDocumentVerification.radioLicense} */}
                
                
                <div>
                  <h3>English Proficiency </h3>
                    <img src={props.starry && props.starry.studentRequirements &&  props.starry.studentRequirements.englishProficiency} />
                </div>
                
            </div>
            {/* end of imageupload */}
        </div>   
        {/* end of studentupload  */}

       <br></br>
        
   
    </div>
  )
}


export default StudentUpload