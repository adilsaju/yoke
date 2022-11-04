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
                  <div className="uploaded"><img src={props.starry && props.starry.studentRequirements && props.starry.studentRequirements.medicalLicense} /></div>
                  <p>Medical License</p>
              </div>
              
              
                
                <div>
                    <div className="uploaded"><img src= {props.starry && props.starry.studentRequirements &&  props.starry.studentRequirements.license} /></div>
                    <p>Private License</p>
                </div>
                
                    {/* {props.starry.studentDocumentVerification.license} */}
                

                <div>
                    <div className="uploaded"><img src={props.starry && props.starry.studentRequirements &&  props.starry.studentRequirements.radioLicense} /></div>
                    <p>Radio License</p>
                </div>
                    {/* {props.starry.studentDocumentVerification.radioLicense} */}
                
                
                <div>
                    <div className="uploaded"><img src={props.starry && props.starry.studentRequirements &&  props.starry.studentRequirements.englishProficiency} /></div>
                    <p>English Proficiency </p>
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