const express = require('express')
const router = express.Router()
const Student = require("../models/StudentModel.js")
const Request = require("../models/requestModel.js")
const {getStudents,getStudentById,getRequestsByStudentId, postRequestByStudentId, getRequests, getRequestById} = require("../controllers/studentController.js")

//getting all students
router.route('/students').get(getStudents())


//getting particular student by id
router.route('/students/:id').get(getStudentById())


//getting all requests
// router.get('/requests',getRequests())
//getting request by id
// router.get('/requests/:id',getRequestById())

//getting all requests by a particular student
// url: /requests?student=634c84017abbf81281febf50
//FOR travel order page in student UI
router.route('/requests').get(getRequestsByStudentId())
.post(postRequestByStudentId())




module.exports = router ;
