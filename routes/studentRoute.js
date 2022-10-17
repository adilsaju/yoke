const express = require('express')
const router = express.Router()
const Student = require("../models/StudentModel.js")
const Request = require("../models/requestModel.js")


//getting all students
router.get('/students',async (req,res)=>{
    try {
        const abc=await Student.studentModel.find()
        res.json(abc)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})


//getting particular student by id
router.get('/students/:id',async (req,res)=>{
    try {
        const abc=await Student.studentModel.findById(req.params.id)
        res.json(abc)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})


// //getting all requests
// router.get('/requests',async (req,res)=>{
//     try {
//         const abc=await Request.requestModel.find()
//         res.json(abc)
//     } catch (error) {
//         res.status(500).json({ message: error.message})
//     }
// })


// //getting request by id
// router.get('/requests/:id',async (req,res)=>{
//     try {
//         //get requests column from student
//         const abc=await Request.requestModel.find(req.params.id)
//         res.json(abc)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

//getting all requests by a particular student
// url: /requests?student=634c84017abbf81281febf50
//FOR travel order page in student UI
router.get('/requests',async (req,res)=>{
    try {
        const studentId = req.query.student
        //get requests column from student
        // const abc=await Student.studentModel.findById(studentId).select('requests')
        console.log("rrrr")
        const abc=await  Request.requestModel.find({ "requestedStudent._id":  studentId})
        
        res.json(abc)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})




module.exports = router ;
