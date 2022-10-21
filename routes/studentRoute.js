const express = require('express');

const multer = require('multer');
const path = require('path');

const router = express.Router();
const Student = require('../models/StudentModel.js');
const Request = require('../models/requestModel.js');
const {
  getStudents,
  getStudentById,
  getRequestsByStudentId,
  postRequestByStudentId,
  getRequests,
  getRequestById,
  putStudentById,
  claireFn,
  getFinalList,
  archive,
  getAdminById,
  approveRequestById,
  uploadLicensesByStudentId,
  getChartThree,
  declineRequestById,
} = require('../controllers/studentController.js');

//getting all students
router.route('/students').get(getStudents());

//getting particular student by id
router
  .route('/students/:id')
  .get(getStudentById())
  //patch notes field api
  .patch(putStudentById());
//TODO: upload license PUT api

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router
  .route('/uploadLicenses/:id')
  //patch notes field api
  .patch(
    upload.single('image1'),
    uploadLicensesByStudentId()
  );

//getting all requests
// router.get('/requests',getRequests())

//getting all requests by a particular student
// url: /requests?student=634c84017abbf81281febf50
//FOR travel order page in student UI
router
  .route('/requests')
  .get(getRequestsByStudentId())
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

module.exports = router;
