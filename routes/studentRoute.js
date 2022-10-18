const express = require('express');
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
  uploadLicensesByStudentId
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
router
  .route('/uploadLicenses/:id')
  //patch notes field api
  .patch(uploadLicensesByStudentId());



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
router.get('/requests/:id',getRequestById())

router
.route('/requests/:id/approve')
    .patch(approveRequestById());

router.get('/pendingRequests', claireFn());

//final List of that particular day
router.get('/finalList', getFinalList());


router.get('/archives', archive());


router.route('/admins/:id').get(getAdminById());


module.exports = router;
