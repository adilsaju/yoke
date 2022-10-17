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





module.exports = getStudents