const express = require('express');

const multer = require('multer');
const path = require('path');

const router = express.Router();
const Student = require('../models/StudentModel.js');
const Request = require('../models/requestModel.js');

const storage = require('./multer-firebase');
const jwt = require('jsonwebtoken')
const {uploadPhoto,uploadL1,uploadL2,uploadL3,uploadL4, uploadArray, checkFileType} = require('./multer-utils')

const {
  getStudents,
  getStudentById,
  getRequestsByStudentId,
  postRequestByStudentId,
  getRequests,
  getRequestById,
  updateStudentNotesById,
  claireFn,
  getFinalList,
  archive,
  getAdminById,
  approveRequestById,
  uploadLicensesByStudentId,
  getChartThree,
  declineRequestById,
  getChartTwo,
  getChartOne,
  getRequestsByStudentIdValidated,
  sentEmail,
  updateStudentPhoto,
  uploadLicByStudentId,
} = require('../controllers/studentController.js');
const { verify } = require('crypto');

//getting all students
router.route('/students').get( verifyToken , getStudents());

//getting particular student by id
router
  .route('/students/:id')
  .get(getStudentById())
  //patch notes field api
  .patch(updateStudentNotesById());



// router
//   .route('/uploadLicenses/:id')
//   //patch license, privatelicense, medicallicense, englishprof field api
//   .post( uploadLicensesByStudentId(uploadArray));

// router
//   .route('/uploadEnglish/:id')
//   //patch license, privatelicense, medicallicense, englishprof field api
//   .post( uploadEnglishByStudentId(uploadL1))  ;

//   router
//   .route('/uploadMedicalLicense/:id')
//   //patch license, privatelicense, medicallicense, englishprof field api
//   .post( uploadMedicalLicByStudentId(uploadL2))  ;

//   router
//   .route('/uploadRadioLicense/:id')
//   //patch license, privatelicense, medicallicense, englishprof field api
//   .post( uploadRadioLicByStudentId(uploadL3))  ;

  router
  .route('/uploadLicense/:id')
  //patch license, privatelicense, medicallicense, englishprof field api
  .post( uploadLicByStudentId(uploadL4))  ;


// ======== INTERNAL API ==========
    router
    .route('/updateStudentPhoto/:id')
    //patch license, privatelicense, medicallicense, englishprof field api
    .post( updateStudentPhoto(uploadPhoto) );
// =======================

//getting all requests
// router.get('/requests',getRequests())

//getting all requests by a particular student
// url: /requests?student=634c84017abbf81281febf50
//FOR travel order page in student UI
router
  .route('/requests')
  // .get(getRequestsByStudentId())
  .get(getRequestsByStudentIdValidated())
  .post(postRequestByStudentId());

//getting request by id (used for student profile page as well)
router.route('/requests/:id').get(getRequestById());

router
  .route('/requests/:id/approve')
  .patch(approveRequestById());

router.route('/pendingRequests').get(claireFn());

//final List of that particular day
router.route('/finalList').get(getFinalList());

router.route('/archives').get(archive());

router.route('/admins/:id').get(getAdminById());

router
  .route('/requests/:id/decline')
  .patch(declineRequestById());

router.route('/past30daysRequests').get(getChartThree());

router.route('/studentsInEachProgram').get(getChartTwo());

router.route('/todaysDecisions').get(getChartOne());

router.route('/sentEmail').post(sentEmail());


router.route('/login').post((req, res)=>{
  console.log('login()');
  user = req.body.user
  jwt.sign({user}, 'secretkey' , {expiresIn: '300m' },  (err, token)=>{
    res.json({ token })
  })
});
//TODO: Fn
// function generateAccessToken (user) {
//   return jwt.sign(user, process.env.ACCESS TOKEN SECRET, { expiresIn:
//   "15s
//   })
//   }

//FORMAT
// Authorization: Bearer <access_token>
//verfify token
function verifyToken(req,res,next){
  //get auth header
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined')
  {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    req.token = bearerToken

    next();
  }else{
    //Forbidden
    res.sendStatus(403)
  }
}
module.exports = router;
