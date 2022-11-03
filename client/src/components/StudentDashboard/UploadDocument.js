import React from 'react'
import {UserContext} from '../../Contexts/UserContext'
import { useState,useEffect, useContext } from 'react';
import SideMenu from '../Navbar/SideMenu';
import { useNavigate } from "react-router-dom";
import '../../App.css'

const formData2 = new FormData();


const sendImage = async (loggedInUser,formData,url) => {

  // console.log("formdata",document.querySelector("#l1").files[0])
  const res = await fetch(url, {method: 'POST',
   body: formData,  
     headers: {
  }, });
  const data = await res.json();
  console.log("KPPPPPPPP:",data);
  return data;
}

const updateEnglish = async (loggedInUser) => {
  let url = `/uploadEnglish/${loggedInUser.id}`;
  console.log("sendurl",url);

  let files= document.querySelector("#l1")
  const formData  = new FormData();
  // formData.append("l1", document.querySelector("#l1").files[0]);
  for(let i =0; i < files.files.length; i++) {
    // console.log("ky",files.files[i])
    formData.append("l1", files.files[i]);
}
  return await sendImage(loggedInUser, formData,url)
};
const updateLic = async (loggedInUser) => {
  let url = `/uploadLicense/${loggedInUser.id}`;
  console.log("sendurl",url);

  let files= document.querySelector("#l4")
  const formData  = new FormData();
  for(let i =0; i < files.files.length; i++) {
    formData.append("l4", files.files[i]);
}
  return await sendImage(loggedInUser,formData,url)
};
const updateMedicalLic = async (loggedInUser) => {
  let url = `/uploadMedicalLicense/${loggedInUser.id}`;
  console.log("sendurl",url);

  let files= document.querySelector("#l2")
  const formData  = new FormData();
  for(let i =0; i < files.files.length; i++) {
    formData.append("l2", files.files[i]);
}
  return await sendImage(loggedInUser,formData,url)
};
const updateRadioLic = async (loggedInUser) => {
  let url = `/uploadRadioLicense/${loggedInUser.id}`;
  console.log("sendurl",url);
  
  let files= document.querySelector("#l3")
  const formData  = new FormData();
  for(let i =0; i < files.files.length; i++) {
    formData.append("l3", files.files[i]);
}
  return await sendImage(loggedInUser,formData,url)
};

const fetchTasks = async (loggedInUser) => {
  let url = `/students/${loggedInUser.id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  console.log("wah data")
  return data;
};

  const UploadDocument = () => {
  const navigate = useNavigate();

    const {loginCredentials} = useContext(UserContext)
  
              const [students,setStudents] = useState([]);
              useEffect(() => {
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
               
                  let url2 = `/updateStudentPhoto/${loginCredentials.loggedInUser.id}`;
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
        <div className="backBar">
            <button  onClick={(e) => { navigate(-1)  }}  >
              Back 
            </button>
        </div>

          <div className="box">
            <div className="topOfTheBox">
              <h2>Upload Documents</h2>
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
              <div>
                <h3>Medical License</h3>
                  
                  <div className="fitImg"><img src={students.studentRequirements && students.studentRequirements.medicalLicense} /></div>
                  <label htmlFor="l2">Upload </label>
                  <input type="file" name="l2" id="l2"   onChange={ (e) => { updateMedicalLic(loginCredentials.loggedInUser)}  }   />
                
              </div>

              <div>
                <h3>Radio License</h3>
                  <div className="fitImg"><img src={students.studentRequirements && students.studentRequirements.radioLicense} /></div>
                  <label htmlFor="l3">Upload</label>
                  <input type="file" name="l3" id="l3"  onChange={ (e) => { updateRadioLic(loginCredentials.loggedInUser)}  }  />
                
              </div>

              <div>
                <h3>Pilot's License</h3>
                
                  <div className="fitImg"><img src={students.studentRequirements && students.studentRequirements.license}/></div>
                  <label htmlFor="l4">Upload</label>
                  <input type="file" name="l4" id="l4" onChange={ (e) => { updateLic(loginCredentials.loggedInUser)}  }   />
                
              </div>

              <div>
                <h3>English Proficiency</h3>
                
                  <div className="fitImg"><img src={students.studentRequirements && students.studentRequirements.englishProficiency} /></div>
                  <label htmlFor="l1">Upload</label>
                  <input type="file" name="l1" id="l1"   onChange={ (e) => { updateEnglish(loginCredentials.loggedInUser)}  }   />
              </div>
              
                {/* <button onClick={ (e) => { updateEnglish(loginCredentials.loggedInUser)}  }>Submit</button> */}
              
                {/* </form> */}
            </div>
            {/* end of imageupload */}
            
          </div>
          {/* end of box */}

      </div>
      {/* end of division */}
    
    </div>
    {/* end of fullpage */}
    </>
    
  )
}



export default UploadDocument


