const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require (  "firebase/storage" ) ;
const app = require("../firebase")
// const fs = require('fs');

// let txtFile = "test.png";
// let str = fs.readFileSync(txtFile,'utf8');

// console.log(str.name);
//FIXME: file object
// process.exit()


const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/png'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        console.log("e1")
        break;
      case 'storage/canceled':
        // User canceled the upload
        console.log("e2")

        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        console.log("e3")

        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);