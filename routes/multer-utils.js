const multer = require('multer');
const path = require('path');
const storage = require('./multer-firebase');


const uploadPhoto = multer({ storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    // limits: {fileSize: 10},
    fileFilter: function(req, file, cb){
      checkFileType(file,cb)
    }
  }).single('image1');
  
  const uploadL1 = multer({ storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    // limits: {fileSize: 10},
    fileFilter: function(req, file, cb){
      checkFileType(file,cb)
    }
  }).single('l1');
  
  const uploadL2 = multer({ storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    // limits: {fileSize: 10},
    fileFilter: function(req, file, cb){
      checkFileType(file,cb)
    }
  }).single('l2');
  
  const uploadL3 = multer({ storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    // limits: {fileSize: 10},
    fileFilter: function(req, file, cb){
      checkFileType(file,cb)
    }
  }).single('l3');
  
  const uploadL4 = multer({ storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    // limits: {fileSize: 10},
    fileFilter: function(req, file, cb){
      checkFileType(file,cb)
    }
  }).single('l4');
  
  const uploadArray = multer({ storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    // limits: {fileSize: 10},
    fileFilter: function(req, file, cb){
      checkFileType(file,cb)
    }
  }).array('licenses', 4);
  
  function checkFileType(file, cb){
    // allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype)
  
    if (mimetype && extname) {
      return cb(null, true)
    }else {
      // cb('Error: images only')
      return cb(null, true)
    }
  }
  

module.exports = {
  uploadPhoto,
uploadL1,
uploadL2,
uploadL3,
uploadL4,
uploadArray,
checkFileType
}