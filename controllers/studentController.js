const express = require('express')
const router = express.Router()
const Student = require("../models/StudentModel.js")
const Request = require("../models/requestModel.js")



const getStudents = ()=>{

   return async (req,res,next)=>{
        console.log("getStudents()")
        try {
            const abc=await Student.studentModel.find()
            res.json(abc)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    }
}




const getStudentById =()=>{

return async (req,res,next)=>{
    console.log("hq")
    try {
        const abc=await Student.studentModel.findById(req.params.id)
        res.json(abc)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
} 


const putStudentById =()=>{

    return async (req,res,next)=>{
        console.log("putStudentById")
        try {
            const particularStudent=await Student.studentModel.findById(req.params.id)
            console.log(req.body)
            console.log(req.body.notes)

            particularStudent.notes = req.body.notes
            particularStudent.save()
            // const sas = await Student.studentModel.findById(req.body.studentId)

            res.json(particularStudent)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    }
    } 



const getRequestsByStudentId = () => {
    return async (req,res,next)=>{
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
    }
}



const postRequestByStudentId = () => {
    return async (req,res,next)=>{
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
                    //TODO: add date validation
                    //TODO: if same student  and same date requests return error!!!!!!!!
                    //TODO: if student exceeds max quota of requests, return error!!!!!!
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
        }
}



const getRequests =()=>{
    return async (req,res,next)=>{
        try {
            const abc=await Request.requestModel.find()
            res.json(abc)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    }
}

const getRequestById = ()=>{
    return async (req,res,next)=>{
        try {
            //get requests column from student
            const abc=await Request.requestModel.findById(req.params.id)
            res.json(abc)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}


module.exports = {getStudents:getStudents, getStudentById:getStudentById,
     getRequestsByStudentId:getRequestsByStudentId,

postRequestByStudentId:postRequestByStudentId,

getRequests:getRequests,
getRequestById: getRequestById,
putStudentById: putStudentById

}