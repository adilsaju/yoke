const express = require('express');

const multer = require('multer');
const path = require('path');

const router = express.Router();
const Student = require('../models/StudentModel.js');
const Request = require('../models/requestModel.js');

const storage = require('./multer-firebase');
const jwt = require('jsonwebtoken');
const {
  uploadPhoto,
  uploadL1,
  uploadL2,
  uploadL3,
  uploadL4,
  uploadArray,
  checkFileType,
} = require('./multer-utils');

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
  loginRequired,
  register,
  studentLogin,
  saltPassword,
  authenticateToken,
} = require('../controllers/studentController.js');
const { verify } = require('crypto');

//getting all students
router
  .route('/students')
  .get(verifyToken, getStudents(), saltPassword())
  .post(saltPassword());

//getting particular student by id
router
  .route('/students/:id')
  .get(getStudentById())
  //patch notes field api
  .patch(updateStudentNotesById())
  .post(authenticateToken());

const uploadPhoto = multer({
  storage: storage,
  // limits: { fieldSize: 10 * 1024 * 1024 },
  // limits: {fileSize: 10},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image1');

const uploadL1 = multer({
  storage: storage,
  // limits: { fieldSize: 10 * 1024 * 1024 },
  // limits: {fileSize: 10},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('l1');

const uploadL2 = multer({
  storage: storage,
  // limits: { fieldSize: 10 * 1024 * 1024 },
  // limits: {fileSize: 10},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('l2');

const uploadL3 = multer({
  storage: storage,
  // limits: { fieldSize: 10 * 1024 * 1024 },
  // limits: {fileSize: 10},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('l3');

const uploadL4 = multer({
  storage: storage,
  // limits: { fieldSize: 10 * 1024 * 1024 },
  // limits: {fileSize: 10},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('l4');

const uploadArray = multer({
  storage: storage,
  // limits: { fieldSize: 10 * 1024 * 1024 },
  // limits: {fileSize: 10},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array('licenses', 4);

function checkFileType(file, cb) {
  // allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  //check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: images only');
  }
}

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
  .post(uploadLicByStudentId(uploadL4));

// ======== INTERNAL API ==========
router
  .route('/updateStudentPhoto/:id')
  //patch license, privatelicense, medicallicense, englishprof field api
  .post(updateStudentPhoto(uploadPhoto));
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

module.exports = router;
