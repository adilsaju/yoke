import React from 'react'
import {UserContext} from '../../Contexts/UserContext'
import { useState,useEffect, useContext } from 'react';
import SideMenu from '../Navbar/SideMenu';
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import '../../App.css'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Modal from 'react-modal';
import { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import { ToastContainer, toast } from 'react-toastify';
import  abcd2  from "../images/abcd2.png"


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    width: "70%",
  },
};

const formData2 = new FormData();


const sendImage = async (loggedInUser,formData,url, setStudents) => {

  // console.log("formdata",document.querySelector("#l1").files[0])
  const res = await fetch(url, {method: 'POST',
   body: formData,  
     headers: {
  }, });
  const data = await res.json();
  //TODO: update student state also
  setStudents(data)
  // window.location.reload();

  console.log("KPPPPPPPP:",data);
  return data;
}

const updateEnglish = async (loggedInUser, setStudents, file1) => {
  let url = `/api/uploadEnglish/${loggedInUser.id}`;
  console.log("sendurl",url);

  let files= document.querySelector("#l1")
  const formData  = new FormData();
  // formData.append("l1", document.querySelector("#l1").files[0]);
  // for(let i =0; i < files.files.length; i++) {
    // console.log("ky",files.files[i])
    formData.append("l1", file1 || files.files[0]);
// }
  return await sendImage(loggedInUser, formData,url,setStudents)
};
const updateLic = async (loggedInUser, setStudents, file1) => {
  let url = `/api/uploadLicense/${loggedInUser.id}`;
  console.log("sendurl",url);

  let files= document.querySelector("#l4")
  const formData  = new FormData();
  // for(let i =0; i < files.files.length; i++) {
    formData.append("l4", file1 || files.files[0]);
// }
  return await sendImage(loggedInUser,formData,url,setStudents)
};
const updateMedicalLic = async (loggedInUser, setStudents, file1) => {
  let url = `/api/uploadMedicalLicense/${loggedInUser.id}`;
  console.log("sendurl",url);

  console.log("ZZZZZZZZZZ",file1);
  // console.log("ZZZZZZZZZZ2",document.querySelector("#l4").files[0]);

  let files= document.querySelector("#l2")
  const formData  = new FormData();
  // for(let i =0; i < files.files.length; i++) {
    formData.append("l2", file1 || files.files[0]);
// }
  return await sendImage(loggedInUser,formData,url, setStudents)
};
const updateRadioLic = async (loggedInUser, setStudents, file1) => {
  let url = `/api/uploadRadioLicense/${loggedInUser.id}`;
  console.log("sendurl",url);
  
  let files= document.querySelector("#l3")
  const formData  = new FormData();
  // for(let i =0; i < files.files.length; i++) {
    formData.append("l3",file1 || files.files[0]);
// }
  return await sendImage(loggedInUser,formData,url,setStudents)
};

const uploadAll = async (loggedInUser, setStudents, medicalFile, radioFile, licFile, englishFile, navigate)  => {
  await updateRadioLic(loggedInUser, setStudents, radioFile)
  await updateMedicalLic(loggedInUser, setStudents, medicalFile)
  await updateLic(loggedInUser, setStudents, licFile)
  await updateEnglish(loggedInUser, setStudents, englishFile)
  // window.location.reload();
  navigate("/student-account-status")
}

const fetchTasks = async (loggedInUser) => {
  let url = `/api/students/${loggedInUser.id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  console.log("wah data")
  return data;
};

const notify1 = () => toast(`License Image Updated. Click Save to Confirm`,{
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

  const UploadDocument = () => {
    let subtitle;
    const [modalIsOpenMedical, setIsOpenMedical] = React.useState(false);
    const [modalIsOpenRadio, setIsOpenRadio] = React.useState(false);
    const [modalIsOpenLic, setIsOpenLic] = React.useState(false);
    const [modalIsOpenEnglish, setIsOpenEnglish] = React.useState(false);

  

    function openModalMedical() {
      setIsOpenMedical(true);
    }
    function openModalRadio() {
      setIsOpenRadio(true);
    }
    function openModalLic() {
      setIsOpenLic(true);
    }
    function openModalEnglish() {
      setIsOpenEnglish(true);
    }
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
    function closeModal() {
      setIsOpenMedical(false);
      setIsOpenRadio(false);
      setIsOpenLic(false);
      setIsOpenEnglish(false);

    }



  const navigate = useNavigate();

    const {loginCredentials} = useContext(UserContext)
  
              const [students,setStudents] = useState([]);
              const [pic1,setPic1] = useState([]);
              const [l1,setL1] = useState([]);
              // const [dataUri, setDataUri] = useState('');
              // const [licCam, setLicCam] = useState("");
              // const [englishCam, setEnglishCam] = useState("");
              // const [medicalCam, setMedicalCam] = useState("");
              // const [radioCam, setRadioCam] = useState("");
              const [medicalFile, setmedicalFile] = useState(null);
              const [radioFile, setradioFile] = useState(null);
              const [englishFile, setenglishFile] = useState(null);
              const [licFile, setlicFile] = useState(null);



              

              async function handleTakePhotoAnimationDoneLic (dataUri) {
                console.log('takePhoto');
                // setLicCam(dataUri);
                closeModal()
                pic1[3].src=dataUri
                notify1()


                const res = await fetch(dataUri);
                const blob = await res.blob();
                const file1 =  new File([blob], "abc1", { type: 'image/png' });
                setlicFile(file1)

                
              }
              async function handleTakePhotoAnimationDoneEnglish (dataUri) {
                console.log('takePhoto');
                // setEnglishCam(dataUri);
                closeModal()
                pic1[0].src=dataUri
                notify1()

                const res = await fetch(dataUri);
                const blob = await res.blob();
                const file1 =  new File([blob], "abc1", { type: 'image/png' });
                setenglishFile(file1)


              }
              async function handleTakePhotoAnimationDoneMedical (dataUri) {
                console.log('takePhoto');
                // setMedicalCam(dataUri);
                closeModal()
                pic1[1].src=dataUri
                notify1()

                // console.log("raaaaaaaaaaaaaaaaaa",  dataUri );
                // const file1 = new File([
                //   new Blob([dataUri])
                // ], "med1");

                const res = await fetch(dataUri);
                const blob = await res.blob();
                const file1 =  new File([blob], "abc1", { type: 'image/png' });



                console.log(file1)
                setmedicalFile(file1)




              }
              async function handleTakePhotoAnimationDoneRadio (dataUri) {
                console.log('takePhoto');
                // setRadioCam(dataUri);
                closeModal()
                pic1[2].src=dataUri
                notify1()


                const res = await fetch(dataUri);
                const blob = await res.blob();
                const file1 =  new File([blob], "abc1", { type: 'image/png' });
                setradioFile(file1)

              }


              const isFullscreen = false;


              useEffect(() => {
                // const player = document.getElementById('player');
                // const canvas = document.getElementById('canvas');
                // const context = canvas.getContext('2d');
                // const captureButton = document.getElementById('capture');
              
                // const constraints = {
                //   video: true,
                // };
              
                // captureButton.addEventListener('click', () => {
                //   // Draw the video frame to the canvas.
                //   context.drawImage(player, 0, 0, canvas.width, canvas.height);
                // });
              
                // // Attach the video stream to the video element and autoplay.
                // navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                //   player.srcObject = stream;
                // });




               setPic1([document.querySelector("#pic1"),document.querySelector("#pic2"),document.querySelector("#pic3"),document.querySelector("#pic4")])
               setL1([document.querySelector("#l1"),document.querySelector("#l2"),document.querySelector("#l3"),document.querySelector("#l4")])

                  const getTasks = async () => {
                  const tfs = await fetchTasks(loginCredentials.loggedInUser);
                  setStudents(tfs);
                  };
                  getTasks();
              }, []);
              const isEmpty = Object.keys(students).length === 0;
              console.log(isEmpty);

              //upload image
              const [selectedFile, setSelectedFile] = React.useState(null);
          
              const handleSubmit = async(event) => {

                console.log("idhar")
                event.preventDefault()
                const formData = new FormData();
                console.log(selectedFile);
                
                formData.append('image1',selectedFile);

                for (var pair of formData.entries()) {
                  console.log(pair[0]+ ', ' + pair[1]);  }
               
                  let url2 = `/api/updateStudentPhoto/${loginCredentials.loggedInUser.id}`;
                  const res = await fetch(url2, 
                    {
                      method: 'POST', 
                     body: formData,  
                     headers: { 'Content-Type': 'multipart/form-data'}, 
                    }
                    );
        
              }
         
              const handleFileSelect = (event) => {
                setSelectedFile(event.target.files[0])
              }
              
  return (
    <>

    <div className='fullpage'>
       <SideMenu/>
      <div className='division uploadDocs'>
        

          <div className="box">
            <div className="topOfTheBox">
              <h3>Upload Documents</h3>
            </div>
                {console.log(students)}
                {console.log("wah")}
                {/* <form>
                <div><label htmlFor="l1">Medical License : <img src={students.studentRequirements && students.studentRequirements.medicalLicense}></img></label><input type="file" name="l1" id="l1" /></div><br />
                <div><label htmlFor="l2">Private License : <img src={students.studentRequirements && students.studentRequirements.license}></img></label><input type="file" name="l2" id="l2" /></div><br />
                <div><label htmlFor="l3">Radio License : <img src={students.studentRequirements && students.studentRequirements.radioLicense}></img></label><input type="file" name="l3" id="l3" /></div><br />
                <div><label htmlFor="l4">English Proficiency : <img src={students.studentRequirements && students.studentRequirements.englishProficiency}></img></label><input type="file" name="l4" id="l4" /></div><br />
                <button>Submit</button> */}
            
            <div className="imageupload">
              {/* <div className="uploadSection"> */}
              <div className='uploadBoxes'>
                  <h3>Pilot's License</h3>
                
                    <div className="fitImg"><img id="pic4" src={students && students.studentRequirements && students.studentRequirements.license? ( students.studentRequirements.license.startsWith("https://")? students.studentRequirements.license : abcd2 )  : abcd2 }  /></div>
                    <div className="btnWrapper">
                      <label className='dBlueBtn' htmlFor="l4">Upload</label>
                      <input onInput={ () => { pic1[3].src=window.URL.createObjectURL(l1[3].files[0]) ; notify1();  } }   accept="image/*" type="file" name="l4" id="l4"   />
                      <label className='dBlueBtn' htmlFor="l4c" id="capture4"  onClick={openModalLic} >Scan &#128247;</label>
                    </div>
                </div>
                
                <div className='uploadBoxes'>
                  <h3>Medical License</h3>
                
                    <div className="fitImg"><img id="pic2" src={students && students.studentRequirements && students.studentRequirements.medicalLicense? ( students.studentRequirements.medicalLicense.startsWith("https://")? students.studentRequirements.medicalLicense : abcd2 )  : abcd2 } /></div>
                    <div className="btnWrapper">
                      <label className='dBlueBtn' htmlFor="l2">Upload </label>
                       <input onInput={ () => { pic1[1].src=window.URL.createObjectURL(l1[1].files[0]) ; notify1();  } }  accept="image/*" type="file" name="l2" id="l2"     />
                      <label className='dBlueBtn' htmlFor="l2c" id="capture2" onClick={openModalMedical} >Scan &#128247;</label>
                    </div>
                    {/* <video id="player" controls autoplay></video>
<button id="capture">Capture</button>
<canvas id="canvas" width="320" height="240"></canvas> */}
                </div>

                <div className='uploadBoxes'>
                  <h3>Radio License</h3>
                    <div className="fitImg"><img id="pic3" src={students && students.studentRequirements && students.studentRequirements.radioLicense? ( students.studentRequirements.radioLicense.startsWith("https://")? students.studentRequirements.radioLicense : abcd2 )  : abcd2 } /></div>
                    <div className="btnWrapper">
                      <label className='dBlueBtn' htmlFor="l3">Upload</label>
                      <input onInput={ () => { pic1[2].src=window.URL.createObjectURL(l1[2].files[0]) ; notify1();  } }   accept="image/*" type="file" name="l3" id="l3"  />
                      <label className='dBlueBtn' htmlFor="l3c" id="capture3"  onClick={openModalRadio} >Scan &#128247;</label>
                    </div>
                </div>
            
                <div className='uploadBoxes'>
                  <h3>English Proficiency</h3>
                
                    <div className="fitImg"><img id="pic1" src={students && students.studentRequirements && students.studentRequirements.englishProficiency? ( students.studentRequirements.englishProficiency.startsWith("https://")? students.studentRequirements.englishProficiency : abcd2 )  : abcd2 } /></div>
                    <div className="btnWrapper">
                      <label className='dBlueBtn' htmlFor="l1">Upload</label>
                      <input onInput={ () => { pic1[0].src=window.URL.createObjectURL(l1[0].files[0]) ; notify1();   } }  accept="image/*" type="file" name="l1" id="l1"    />
                      <label className='dBlueBtn' htmlFor="l1c" id="capture1"  onClick={openModalEnglish} >Scan &#128247;</label>
                    </div>
                    {/* onChange={ (e) => { updateEnglish(loginCredentials.loggedInUser)}  }  */}
                </div>
              {/* </div> */}

              
                {/* <button onClick={ (e) => { updateEnglish(loginCredentials.loggedInUser)}  }>Submit</button> */}
              
                {/* </form> */}
            </div>
            {/* end of imageupload */}
            
            <div className="whiteBg">
              <div className="buttonWrapper">
                  <Link to="/student-account-status">
                    <button className="transparentBtn duo">
                      Cancel
                    </button>
                    </Link>
                  <button className="yellowBtn duo" onClick={ (e) => { uploadAll(loginCredentials.loggedInUser, setStudents, medicalFile, radioFile, licFile, englishFile, navigate )} }   >Save</button>
                </div>
              
                        </div>
            </div>
          {/* end of box */}

      </div>
      {/* end of division */}
    
    </div>
    {/* end of fullpage */}


        {/* ============= english modal ================== */}
        <Modal
        isOpen={modalIsOpenEnglish}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="camTitle" ref={(_subtitle) => (subtitle = _subtitle)}>Scan</h2>
        <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDoneEnglish}
            isFullscreen={isFullscreen} imageType = {IMAGE_TYPES.PNG}
          />
      </Modal>
        {/* ============= medical modal ================== */}
        <Modal
        isOpen={modalIsOpenMedical}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="camTitle" ref={(_subtitle) => (subtitle = _subtitle)}>Scan</h2>
        <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDoneMedical}
            isFullscreen={isFullscreen} imageType = {IMAGE_TYPES.PNG}
          />
      </Modal>
        {/* ============= radio modal ================== */}
        <Modal
        isOpen={modalIsOpenRadio}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="camTitle" ref={(_subtitle) => (subtitle = _subtitle)}>Scan</h2>
        <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDoneRadio}
            isFullscreen={isFullscreen} imageType = {IMAGE_TYPES.PNG}
          />
      </Modal>
        {/* ============= lic modal ================== */}
        <Modal
        isOpen={modalIsOpenLic}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="camTitle" ref={(_subtitle) => (subtitle = _subtitle)}>Scan</h2>
        <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDoneLic}
            isFullscreen={isFullscreen} imageType = {IMAGE_TYPES.PNG}
          />
      </Modal>
      <ToastContainer position="bottom-left"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>
    </>
    
  )
}



export default UploadDocument


