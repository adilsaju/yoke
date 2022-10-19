const { getStorage, ref, getDownloadURL } = require( "firebase/storage" );
const { initializeApp } = require( "firebase/app" );
const app = require("../firebase")



// Create a reference to the file we want to download
const storage = getStorage();
const starsRef = ref(storage, 'test.png');

// Get the download URL
getDownloadURL(starsRef)
  .then((url) => {
    // Insert url into an <img> tag to "download"
    console.log(url)
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });