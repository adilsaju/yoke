import React from 'react'
import {UserContext} from '../../Contexts/UserContext'
import { useState,useEffect, useContext } from 'react';
import SideMenu from '../Navbar/SideMenu';


const formData2 = new FormData();

const fetchTasks = async (loggedInUser) => {
  let url = `/students/${loggedInUser.id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  console.log("wah data")
  return data;
};

  const UploadDocument = () => {
    const {loggedInUser} = useContext(UserContext)
  
              const [students,setStudents] = useState([]);
              useEffect(() => {
                  const getTasks = async () => {
                  const tfs = await fetchTasks(loggedInUser);
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
               
                  let url2 = `/updateStudentPhoto/${loggedInUser.id}`;
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
      <div className='division'>
    
    <h2>Upload Documents</h2>
    {console.log(students)}
    {console.log("wah")}
    {/* <form>
    <div><label htmlFor="l1">Medical License : <img src={students.studentRequirements && students.studentRequirements.medicalLicense}></img></label><input type="file" name="l1" id="l1" /></div><br />
    <div><label htmlFor="l2">Private License : <img src={students.studentRequirements && students.studentRequirements.license}></img></label><input type="file" name="l2" id="l2" /></div><br />
    <div><label htmlFor="l3">Radio License : <img src={students.studentRequirements && students.studentRequirements.radioLicense}></img></label><input type="file" name="l3" id="l3" /></div><br />
    <div><label htmlFor="l4">English Proficiency : <img src={students.studentRequirements && students.studentRequirements.englishProficiency}></img></label><input type="file" name="l4" id="l4" /></div><br />
    <button>Submit</button> */}

    <form >
    Medical License : <img src={students.studentRequirements && students.studentRequirements.medicalLicense}></img><br></br>
      <input type="file" onChange={handleFileSelect}/><br></br>
      <br></br>
      Private License : <img src={students.studentRequirements && students.studentRequirements.license}></img> <br></br>
      <input type="file" onChange={handleFileSelect}/><br></br>
      <br></br>
      Radio License : <img src={students.studentRequirements && students.studentRequirements.radioLicense}></img><br></br>
      <input type="file" onChange={handleFileSelect}/><br></br>
      <br></br>
      English  : <img src={students.studentRequirements && students.studentRequirements.radioLicense}></img><br></br>
      <input type="file" onChange={handleFileSelect}/><br></br>
      <br></br>
      <br></br>
      <input onClick={handleSubmit} type="submit" value="Upload File" />
      
    </form>
    <br></br>
    {/* </form> */}
    </div>
    </div>
    </>
    
  )
}



export default UploadDocument


