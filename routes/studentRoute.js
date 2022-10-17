const express = require('express')
const router = express.Router()
const Student = require("../models/StudentModel.js")
const Request = require("../models/requestModel.js")


//getting all students
router.get('/students',async (req,res,next)=>{
    try {
        const abc=await Student.studentModel.find()
        res.json(abc)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})


//getting particular student by id
router.get('/students/:id',async (req,res,next)=>{
    try {
        const abc=await Student.studentModel.findById(req.params.id)
        res.json(abc)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})


// //getting all requests
// router.get('/requests',async (req,res,next)=>{
//     try {
//         const abc=await Request.requestModel.find()
//         res.json(abc)
//     } catch (error) {
//         res.status(500).json({ message: error.message})
//     }
// })


// //getting request by id
// router.get('/requests/:id',async (req,res,next)=>{
//     try {
//         //get requests column from student
//         const abc=await Request.requestModel.findById(req.params.id)
//         res.json(abc)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

//getting all requests by a particular student
// url: /requests?student=634c84017abbf81281febf50
//FOR travel order page in student UI
router.route('/requests').get(async (req,res,next)=>{
    try {
        const studentId = req.query.student
        //get requests column from student
        // const abc=await Student.studentModel.findById(studentId).select('requests')
        console.log("rrrr")
        const abc=await  Request.requestModel.find({ "requestedStudent._id":  studentId})
        
        res.json(abc)
    } catch (error) {
        res.status(500).json({ error:true, message: error.message})
    }
}).post(async (req,res,next)=>{
/*
{
    "flightDate" : "2022-11-20T07:47:06.937Z",
    "studentId": "634c84017abbf81281febf50"
}

*/


    try {
        console.log("posttttt")
        console.log(req.body)

        const sas = await Student.studentModel.findById(req.body.studentId)

        console.log("sas",sas)
        //create obj
        const request = {
            //TODO: 
            flightDate : req.body.flightDate,
            requestedDate: new Date(),
            adminVerifiedDate: null,
            isApproved: false,
            isRejected: false,
            isExpired: false,
            requestedStudent: sas,
            approvedAdmin: null
        }
        //update in db
        const request1 = await Request.requestModel.create(request)
        console.log("request1:",request1)

        //get same data from db

        //response that data


        // const abc=await  Request.requestModel.find({ "requestedStudent._id":  studentId})
        
        res.json(request1)
    } catch (error) {
        res.status(500).json({ error:true, message: error.message})
    }
})




module.exports = router ;
