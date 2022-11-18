const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/adminModel.js');
const studentRequirements = require('../models/checklistModel.js');
const { request } = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {validateStudentInDb} =  require("./authController")

   ///image key should be l1
   const uploadEnglishByStudentId = (upload) => {
    return upload, async (req, res) => {
    
        upload( req, res, async (error)=> {

          if (! req.params.id){
            res.status(500).json("Invalid params")
            return
          }
          console.log(req.params.id.length)
          if ( req.params.id.length !== 24 ){
            res.status(500).json("Invalid params")
            return
          }
    
          console.log("uploadEnglishByStudentId");
    
          if (error) {
    
         if( error != "Error: Unexpected end of form" ){
          //  console.log("fileeee",req.file);
          console.log(error);
           res.json({message: error})
           return
         }
         else if(req.file == undefined){
          res.json('undefined file error')
    
        }
        else {
    
          const student1 = await Student.studentModel.findById(req.params.id);
          const student_requirements1_id = student1.studentRequirements._id
          const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
          student_requirements1.englishProficiency = req.file.publicUrl;
          student_requirements1.uploadedDate = new Date()
          await student_requirements1.save()          
          student1.studentRequirements = student_requirements1
          // student1.save()

          // update isRequirementsOk 
          validateStudentInDb(student1)
      
          res.json(student1);
        }
        }
         else if(req.file == undefined){
             res.json('undefined file error')
    
           }
           else {
    
            const student1 = await Student.studentModel.findById(req.params.id);
            const student_requirements1_id = student1.studentRequirements._id
            const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
            student_requirements1.englishProficiency = req.file.publicUrl;
            student_requirements1.uploadedDate = new Date()
            await student_requirements1.save()
            student1.studentRequirements = student_requirements1
            // student1.save()

          // update isRequirementsOk 
          validateStudentInDb(student1)
        
            res.json(student1);
           }
         
    
    
       })
    
     }
  }
  
  const uploadMedicalLicByStudentId = (upload) => {
    return upload, async (req, res) => {
    
        upload( req, res, async (error)=> {
    
          console.log("uploadLicByStudentId");
    
          if (error) {
    
         if( error != "Error: Unexpected end of form" ){
          //  console.log("fileeee",req.file);
          console.log(error);
           res.json({message: error})
           return
         }
         else if(req.file == undefined){
          res.json('undefined file error')
    
        }
        else {
    
          let student1 = await Student.studentModel.findById(req.params.id);
          const student_requirements1_id = student1.studentRequirements._id
          const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
          student_requirements1.medicalLicense = req.file.publicUrl;
          student_requirements1.uploadedDate = new Date()
          await student_requirements1.save()
          student1.studentRequirements = student_requirements1
          // student1.save()
                    // update isRequirementsOk 
                    student1 = await validateStudentInDb(student1)
      
          res.json(student1);
        }
        }
         else if(req.file == undefined){
             res.json('undefined file error')
    
           }
           else {
    
            let student1 = await Student.studentModel.findById(req.params.id);
            const student_requirements1_id = student1.studentRequirements._id
            const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
            student_requirements1.medicalLicense = req.file.publicUrl;
            student_requirements1.uploadedDate = new Date()
            await student_requirements1.save()
            student1.studentRequirements = student_requirements1
            // student1.save()
          // update isRequirementsOk 
          student1 = await validateStudentInDb(student1)
        
            res.json(student1);
           }
         
    
    
       })
    
     }
  }
  
  
  const uploadRadioLicByStudentId = (upload) => {
    return upload, async (req, res) => {
    
        upload( req, res, async (error)=> {
    
          console.log("uploadLicByStudentId");
    
          if (error) {
    
         if( error != "Error: Unexpected end of form" ){
          //  console.log("fileeee",req.file);
          console.log(error);
           res.json({message: error})
           return
         }
         else if(req.file == undefined){
          res.json('undefined file error')
    
        }
        else {
    
          let student1 = await Student.studentModel.findById(req.params.id);
          const student_requirements1_id = student1.studentRequirements._id
          const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
          student_requirements1.radioLicense = req.file.publicUrl;
          student_requirements1.uploadedDate = new Date()
          await student_requirements1.save()
          student1.studentRequirements = student_requirements1
          // student1.save()
                    // update isRequirementsOk 
                    student1=     await  validateStudentInDb(student1)
      
          res.json(student1);
        }
        }
         else if(req.file == undefined){
             res.json('undefined file error')
    
           }
           else {
    
            let student1 = await Student.studentModel.findById(req.params.id);
            const student_requirements1_id = student1.studentRequirements._id
            const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
            student_requirements1.radioLicense = req.file.publicUrl;
            student_requirements1.uploadedDate = new Date()
            await student_requirements1.save()
            student1.studentRequirements = student_requirements1
            // student1.save()
          // update isRequirementsOk 
          student1=  await validateStudentInDb(student1)
        
            res.json(student1);
           }
       })
     }
  }
  

  const uploadLicByStudentId = (upload) => {
    return upload, async (req, res) => {
    
      upload( req, res, async (error)=> {
  
        console.log("uploadLicByStudentId");
  
        if (error) {
  
       if( error != "Error: Unexpected end of form" ){
        //  console.log("fileeee",req.file);
        console.log(error);
         res.json({message: error})
         return
       }
       else if(req.file == undefined){
        res.json('undefined file error')
  
      }
      else {
  
        let  student1 = await Student.studentModel.findById(req.params.id);
        const student_requirements1_id = student1.studentRequirements._id
        const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
        student_requirements1.license = req.file.publicUrl;
        student_requirements1.uploadedDate = new Date()
        await student_requirements1.save()
        student1.studentRequirements = student_requirements1
        // student1.save()
                  // update isRequirementsOk 
                  //TODO
                  student1 = await    validateStudentInDb(student1)
    
        res.json(student1);
      }
      }
       else if(req.file == undefined){
           res.json('undefined file error')
  
         }
         else {
  
          let student1 = await Student.studentModel.findById(req.params.id);
          const student_requirements1_id = student1.studentRequirements._id
          const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
          student_requirements1.license = req.file.publicUrl;
          student_requirements1.uploadedDate = new Date()
          await student_requirements1.save()
          student1.studentRequirements = student_requirements1
          // student1.save()

                    // update isRequirementsOk 
                  //TODO
                  student1 = await     validateStudentInDb(student1)
      
          res.json(student1);
         }
       
  
  
     })
  
   }
  }

  //TODO:
  const uploadLicensesByStudentId = (uploadArray) => {
    return uploadArray, async (req, res) => {
  
      upload( req, res, async (error)=> {
       // console.log("sc",error instanceof storageErrors);
  
       // console.log(error == "Error: Unexpected end of form");
  
       if( error != "Error: Unexpected end of form" ){
         console.log("fileeee",req.file);
         res.json({message: error})
         return
       }else{
         if(req.file == undefined){
           res.json('undefined file error')
  
         }
         else {
  
           // const abc = await Student.studentModel.findById(req.params.id);
           // abc.photo = {
           //   name: req.file.filename,
           //   image: {
           //     data: req.file.filename,
           //     contentType: 'image/png'
           //   }
           // }
           // abc.save()
           // res.json(abc);
  
           const abc = await Student.studentModel.findById(req.params.id);
           abc.photo = req.file.publicUrl;
           abc.save()
           res.json(abc);
  
  
           // console.log(req.file);
           // res.send('ok')
         }
       }
  
  
     })
  
   }
  };


  const updateStudentPhoto = (upload) => {
    return upload, async (req, res) => {
     
       upload( req, res, async (error)=> {
         if (error) {
   
        if( error != "Error: Unexpected end of form" ){
         //  console.log("fileeee",req.file);
         console.log(error);
          res.json({message: error})
          return
        }
        else if(req.file == undefined){
         res.json('undefined file error')
   
       }
       else {
   
         const abc = await Student.studentModel.findById(req.params.id);
         abc.photo = req.file.publicUrl;
         abc.save()
         res.json(abc);
   
         // console.log(req.file);
         // res.send('ok')
       }
       }
        else if(req.file == undefined){
            res.json('undefined file error')
   
          }
          else {
   
            const abc = await Student.studentModel.findById(req.params.id);
            abc.photo = req.file.publicUrl;
            abc.save()
            res.json(abc);
   
            // console.log(req.file);
            // res.send('ok')
          }
        
   
   
      })
   
    }
   }
   
   module.exports = {

    uploadLicensesByStudentId,
    updateStudentPhoto,
    uploadLicByStudentId,
    uploadEnglishByStudentId,
    uploadMedicalLicByStudentId,
    uploadRadioLicByStudentId
  };
  