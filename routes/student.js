const express = require('express')
const router = express.Router()
const Student = require("../models/StudentModel.js")

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


module.exports = router ;
