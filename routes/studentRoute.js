const express = require('express');

const multer = require('multer');
const path = require('path');

const router = express.Router();
const Student = require('../models/studentModel.js');
const Request = require('../models/requestModel.js');

const storage = require('./multer-firebase');
const jwt = require('jsonwebtoken')
const {uploadPhoto,uploadL1,uploadL2,uploadL3,uploadL4, uploadArray, checkFileType} = require('./multer-utils')

const {
  getStudents,
  getStudentById,
  validateStudentById,
  getRequestsByStudentId,
  postRequestByStudentId,
  sentToFC,
  getRequests,
  getRequestById,
  updateStudentNotesById,
  claireFn,
  getFinalList,
  archive,
  getAdminById,
  approveRequestById,
  getChartThree,
  declineRequestById,
  getChartTwo,
  getChartOne,
  getRequestsByStudentIdValidated,
  undoApproveRequestById,
  undoDeclineRequestById,
} = require('../controllers/studentController.js');

const {

  createStudent,
  studentLogin,
  createAdmin,
  verifyToken
} = require  ('../controllers/authController.js') ;


const {
  sentEmail,
  sentEmailStudentApproved,
  sentEmailStudentDeclined,

}= require  ('../controllers/emailController.js') ;

const {
  uploadLicensesByStudentId,
  updateStudentPhoto,
  uploadLicByStudentId,
  uploadEnglishByStudentId,
  uploadMedicalLicByStudentId,
  uploadRadioLicByStudentId

}= require  ('../controllers/imageController.js') ;

const { verify } = require('crypto');

//getting all students
router.route('/students').get( verifyToken , getStudents());

//getting particular student by id
router
  .route('/students/:id')
  .get(getStudentById())
  //patch notes field api
  .patch(updateStudentNotesById());


  router
  .route('/validateStudent/:id')
  .get(validateStudentById());


//UPLOAD =====================================================



router
  .route('/uploadEnglish/:id')
  .post( uploadEnglishByStudentId(uploadL1))  ;

  router
  .route('/uploadMedicalLicense/:id')
  .post( uploadMedicalLicByStudentId(uploadL2))  ;

  router
  .route('/uploadRadioLicense/:id')
  .post( uploadRadioLicByStudentId(uploadL3))  ;

  router
  .route('/uploadLicense/:id')
  .post( uploadLicByStudentId(uploadL4))  ;


  router
  .route('/uploadLicenses/:id')
  //patch license, privatelicense, medicallicense, englishprof field api
  .post( uploadLicensesByStudentId(uploadArray));


// ======== INTERNAL API ==========
    router
    .route('/updateStudentPhoto/:id')
    .post( updateStudentPhoto(uploadPhoto) );
// =======================

//getting all requests
// router.get('/requests',getRequests())

//getting all requests by a particular student
// url: /requests?student=634c84017abbf81281febf50
//FOR travel order page in student UI
router
  .route('/requests')
  .get(getRequestsByStudentId())
  //TODO validationnnnnnnnnnnnn
  // .get(getRequestsByStudentIdValidated())
  .post(postRequestByStudentId());

//getting request by id (used for student profile page as well)
router.route('/requests/:id').get(getRequestById());

//updating sentToFC
router
  .route('/requests/senttofc')
  .patch(sentToFC());

router
  .route('/requests/:id/approve')
  .patch(approveRequestById());

  router
  .route('/requests/:id/undoapprove')
  .patch(undoApproveRequestById());

  router
  .route('/requests/:id/undodecline')
  .patch(undoDeclineRequestById());

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
//pass student id
router.route('/sentEmailStudentApproved').post(sentEmailStudentApproved());
//pass student id
router.route('/sentEmailStudentDeclined').post(sentEmailStudentDeclined());

//AUTHENTICATION

router.route('/login').post(studentLogin());


router.route('/addStudent').post(createStudent());
router.route('/addAdmin').post(createAdmin);


module.exports = router;
