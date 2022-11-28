import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import ImageGallery from 'react-image-gallery';
import  abcd2  from "../images/abcd2.png"

// import './studentAccountStatus.css';
const fetchTasks = async (loggedInUser) => {
  let url = `/api/students/${loggedInUser.id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  console.log("fetch works")
  return data;
};

const StudentUpload = (props) => {
  const [images, setImages] = useState([])
  const [imagesId, setImagesId] = useState(0)
  const { loggedInUser, loginCredentials } = useContext(UserContext)

  const [request, requestStudent] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(loginCredentials.loggedInUser);
      requestStudent(tfs);
      setImages([
        {
          original: `${tfs.studentRequirements.license}`,
          thumbnail: `${tfs.studentRequirements.license}`,
        },
        {
          original: `${tfs.studentRequirements.medicalLicense}`,
          thumbnail: `${tfs.studentRequirements.medicalLicense}`,
        },
        {
          original: `${tfs.studentRequirements.radioLicense}`,
          thumbnail: `${tfs.studentRequirements.radioLicense}`,
        },
        {
          original: `${tfs.studentRequirements.englishProficiency}`,
          thumbnail: `${tfs.studentRequirements.englishProficiency}`,
        },
      ]);
    };
    getTasks();
  }, []);


  return (
    <div className="whiteBg">

      <div className='studentupload'>
        <div className="topOfTheBox">
          <h3 className='fontFira-bold'>Uploaded documents</h3>
          <Link to='/student-account-status/upload-document'><button className="yellowBtn desktopBtn">Update</button></Link>
        </div>


        <div className='imageupload'>
          <div>
          <div className="uploaded">
            <a className="button hover-shadow" href="#popup2" onClick={() => { setImagesId(0) }} ><img src={props.starry && props.starry.studentRequirements && props.starry.studentRequirements.license? ( props.starry.studentRequirements.license.startsWith("https://")? props.starry.studentRequirements.license : abcd2 )  : abcd2 } alt="uploaded documents by students" ></img></a>

          </div>
            {/* <div className="uploaded"><img src={props.starry && props.starry.studentRequirements && props.starry.studentRequirements.medicalLicense} /></div> */}
            <p>Pilot License</p>
          </div>



          <div>
            <div className="uploaded">
              <a className="button hover-shadow" href="#popup2" onClick={() => { setImagesId(1) }} ><img src={props.starry && props.starry.studentRequirements && props.starry.studentRequirements.medicalLicense? ( props.starry.studentRequirements.medicalLicense.startsWith("https://")? props.starry.studentRequirements.medicalLicense : abcd2 )  : abcd2 } alt="uploaded documents by students" ></img></a>
            </div>
            <p>Medical License</p>
          </div>

          {/* {props.starry.studentDocumentVerification.license} */}


          <div>
            <div className="uploaded">
              <a className="button hover-shadow" href="#popup2" onClick={() => { setImagesId(2) }} ><img src={props.starry && props.starry.studentRequirements && props.starry.studentRequirements.radioLicense? ( props.starry.studentRequirements.radioLicense.startsWith("https://")? props.starry.studentRequirements.radioLicense : abcd2 )  : abcd2 } alt="uploaded documents by students"  >
              </img></a>
            </div>
            <p>Radio License</p>
          </div>
          {/* {props.starry.studentDocumentVerification.radioLicense} */}


          <div>
            <div className="uploaded">
              <a className="button hover-shadow" href="#popup2" onClick={() => { setImagesId(2) }} >
                <img src={props.starry && props.starry.studentRequirements && props.starry.studentRequirements.englishProficiency? ( props.starry.studentRequirements.englishProficiency.startsWith("https://")? props.starry.studentRequirements.englishProficiency : abcd2 )  : abcd2 } alt="uploaded documents by students" >
                </img></a>
            </div>
            <p>English Proficiency </p>
          </div>
          <div id="popup2" className="overlay light">
            <a className="cancel" href="#"></a>
            <div className="popup">
              <h2>{request.requestedStudent && request.requestedStudent.name}</h2>
              <div className="content">
                <ImageGallery items={images} startIndex={imagesId} />
                <p>Click outside the popup to close.</p>
              </div>
            </div>
          </div>
          
          <Link to='/student-account-status/upload-document' className='mobileBtn'><button className="yellowBtn mobileBtn">Update</button></Link>
          
        </div>
        {/* end of imageupload */}
      </div>
      {/* end of studentupload  */}

      <br></br>


    </div>
  )
}


export default StudentUpload