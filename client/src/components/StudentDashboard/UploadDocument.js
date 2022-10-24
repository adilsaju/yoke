import React from 'react'


const UploadDocument = () => {
  return (
    <>
    <h2>Upload Documents</h2>

    <div><label htmlFor="l1">Medical License</label><input type="file" name="l1" id="l1" /></div><br />
    <div><label htmlFor="l2">Private License</label><input type="file" name="l2" id="l2" /></div><br />
    <div><label htmlFor="l3">Radio License</label><input type="file" name="l3" id="l3" /></div><br />
    <div><label htmlFor="l4">English Proficiency</label><input type="file" name="l4" id="l4" /></div><br />
    

    <button>Upload</button>
    </>
    
  )
}

export default UploadDocument