const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/adminModel.js');
const studentRequirements = require('../models/checklistModel.js');
const { request } = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')


//===============
const studentRequirementsCutoff = {
  flownHours: 200,
  balance: 50,
};

const max_request_quota = 10;
const daysBeforeHecanBook = 7;

//================

const getStudents = () => {
  return async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
      if(err){
        res.sendStatus(403);

      }else{
        res.json({
          message: "get students worked",
          authData
        })
      }
    })
    console.log('getStudents()');
    try {
      const abc = await Student.studentModel.find();
      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const getStudentById = () => {
  return async (req, res, next) => {
    console.log('hq');
    try {
      const abc = await Student.studentModel.findById(
        req.params.id
      );
      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const updateStudentNotesById = () => {
  return async (req, res, next) => {
    console.log('updateStudentNotesById');
    try {
      const particularStudent =
        await Student.studentModel.findById(req.params.id);
      console.log(req.body);
      console.log(req.body.notes);

      particularStudent.notes = req.body.notes;
      particularStudent.save();
      // const sas = await Student.studentModel.findById(req.body.studentId)
      //update all req with this student id as well
      const allReqsOfSameStudent =
      await Request.requestModel.find({
        'requestedStudent._id': req.params.id,
      })
      allReqsOfSameStudent.forEach((requestObj)=>{
        requestObj.requestedStudent = particularStudent
        requestObj.save();
      })
      res.json(particularStudent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};


//patch
const approveRequestById = () => {
  return async (req, res, next) => {
    console.log('putRequestById');
    try {
      console.log(req.body);
      // console.log(req.body.adminId)
      const particularRequest =
        await Request.requestModel.findById(req.params.id);

      if (!('adminId' in req.body)) {
        res.status(500).json({
          message: 'no adminId provided in request body',
        });

        return;
      }
      //MAIN CHECKS
      if (particularRequest.isExpired === true) {
        res
          .status(500)
          .json({ message: 'sorry. already expired' });

        return;
      }

      if (particularRequest.isRejected === true) {
        res
          .status(500)
          .json({ message: 'already rejected' });

        return;
      }

      if (particularRequest.isApproved === true) {
        res
          .status(500)
          .json({ message: 'already approved' });

        return;
      }

      let particularAdmin = null;

      if (
        req.body.adminId != null &&
        req.body.adminId != undefined
      ) {
        try {
          particularAdmin = await Admin.adminModel.findById(
            req.body.adminId
          );
        } catch (error) {
          res.status(500).json({
            message:
              'finding particular admin by given id failed',
          });

          return;
        }
      } else {
        res.status(500).json({ message: 'error.message' });

        return;
      }

      // console.log(req.body.notes);

      // particularRequest.notes = req.body.notes;
      particularRequest.isApproved = true;
      particularRequest.isRejected = false;
      particularRequest.approvedAdmin = particularAdmin;
      particularRequest.adminVerifiedDate = new Date();
      // particularRequest.isExpired = false

      particularRequest.save();

      // const sas = await Student.studentModel.findById(req.body.studentId)

      res.json(particularRequest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const getRequestsByStudentId = () => {
  return async (req, res, next) => {
    try {
      const studentId = req.query.student;

      if (
        studentId === null ||
        studentId === undefined ||
        studentId === ''
      ) {
        res
          .status(500)
          .json({ message: 'no student ID found' });

        return;
      }

      //get requests column from student
      // const abc=await Student.studentModel.findById(studentId).select('requests')
      console.log('rrrr');
      const abc = await Request.requestModel.find({
        'requestedStudent._id': studentId,
      });

      res.json(abc);
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: error.message });
    }
  };
};

/*
    {
        "flightDate" : "2022-11-20T07:47:06.937Z",
        "studentId": "634c84017abbf81281febf50"
    }
    
    */
//MACHINE VALIDATION OF CHECKLIST LOGIC
const getRequestsByStudentIdValidated = () => {
  return async (req, res, next) => {
    console.log("getRequestsByStudentIdValidated")
    try {
      const studentId = req.query.student;

      if (
        studentId === null ||
        studentId === undefined ||
        studentId === ''
      ) {
        res
          .status(500)
          .json({ message: 'no student ID found' });

        return;
      }

      //get requests column from student
      // const abc=await Student.studentModel.findById(studentId).select('requests')
      console.log('rrrr');
      const requestsDBArr = await Request.requestModel.find({
        'requestedStudent._id': studentId,
      });

      const newRequestsDBArr = JSON.parse(JSON.stringify(requestsDBArr))

      // validate
      for ( let i =0  ; i< requestsDBArr.length ; i++ )
      {

        let obj1 = requestsDBArr[i]
        // console.log(obj1.requestedStudent.studentRequirements.flownHours)
        if (obj1.requestedStudent.studentRequirements.flownHours >= studentRequirementsCutoff.flownHours) {
            //Ok
          console.log("first", "ok")
          newRequestsDBArr[i].requestedStudent.studentRequirements.flownHours = {
            value : obj1.requestedStudent.studentRequirements.flownHours,
            isOk: true
          }
        }
        else{
            console.log("first", "ok")
            newRequestsDBArr[i].requestedStudent.studentRequirements.flownHours = {
            value : obj1.requestedStudent.studentRequirements.flownHours,
              isOk: false
            }
      }
    }
      //TODO:
    //     if (obj1.requestedStudent.studentRequirements.balance > studentRequirementsCutoff.balance) {
    //       //Ok
    //   }
    //   else{
    //       //NOT OK

    //   }



      //Also set isRequirementsOk based on validator:

      // const request2 = await Request.requestModel.create(
      //   newRequestsDBArr
      // );

      // =============================
      //IMP!!!!!!!!!!!!!!!!!      NOW ITS RETURNING NEW JSON, NOT UPDATING THE DB
      res.json(newRequestsDBArr);
      return
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: error.message });
    }
  };
};

const postRequestByStudentId = () => {
  return async (req, res, next) => {
    try {
      console.log('posttttt');
      console.log(req.body);

      const particularStudent =
        await Student.studentModel.findById(
          req.body.studentId
        );

      console.log('particularStudent', particularStudent);
          console.log("cp1")
      //date validation
      try {
        let d = new Date(req.body.flightDate).toISOString();
      } catch (error) {
        res.status(500).json({
          error: true,
          message: 'invalid flightDate',
        });
        return;
      }

      if ( new Date(req.body.flightDate).toISOString() == "Invalid Date"){
        res.status(500).json({
          error: true,
          message: 'invalid flightDate',
        });
        return;

      }
      console.log("cp2")

      //return all requests of given student
      const requestsOfAStudent =
        await Request.requestModel.find({
          'requestedStudent._id': req.body.studentId,
        });
      // if same student  and same date requests return error
      requestsOfAStudent.map((reqDBObj) => {
        // console.log("nintha:", reqDBObj.flightDate.toLocaleDateString())

        if (
          reqDBObj.flightDate.toLocaleDateString() ===
          new Date(req.body.flightDate).toLocaleDateString()
        ) {
         throw new Error('already requested same travel day')

        }
      });

      // if student  request early date, return error
      requestsOfAStudent.map((reqDBObj) => {
        let after10Days = new Date();
        after10Days.setDate(after10Days.getDate()+ daysBeforeHecanBook);

        if (
          new Date(req.body.flightDate).toLocaleDateString() <
          after10Days
        ) {
          res.status(500).json({
            error: true,
            message:
              'very early, Cannot process given travel date',
          });
          return;
        }
      });

      //if student exceeds max quota of requests, return error
      let cnt = 0;
      requestsOfAStudent.map((req) => {
        cnt = cnt + 1;
      });
      if (cnt >= max_request_quota) {
        res.status(500).json({
          error: true,
          message: 'already requested enough',
        });
        return;
      }

      //create obj
      const request = {
        flightDate: req.body.flightDate,
        requestedDate: new Date(),
        adminVerifiedDate: null,
        isApproved: false,
        isRejected: false,
        isExpired: false,
        requestedStudent: particularStudent,
        approvedAdmin: null,
      };
      //update in db
      const request1 = await Request.requestModel.create(
        request
      );
      console.log('request1:', request1);

      //get same data from db

      //response that data

      // const abc=await  Request.requestModel.find({ "requestedStudent._id":  studentId})

      res.json(request1);
      return
    } catch (error) {
      res.json({ error: true, message: error.message });
      return
    }
  };
};

const getRequests = () => {
  return async (req, res, next) => {
    try {
      const abc = await Request.requestModel.find();
      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

// Chart1 - get all request within 30days
const getChartOne = () => {
  return async (req, res, next) => {
    try {
      const abc = await Request.requestModel.aggregate([
        {
          $match: {
            requestedDate: {
              $gte: new Date(
                new Date().getTime() -
                  1 * 24 * 60 * 60 * 1000
              ),
            },
          },
        },
        {
          $group: {
            _id: 1,
            isApproved: {
              $sum: {
                $cond: [
                  { $eq: ['$isApproved', true] },
                  1,
                  0,
                ],
              },
            },
            isRejected: {
              $sum: {
                $cond: [
                  { $eq: ['$isRejected', true] },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            isApproved: 1,
            isRejected: 1,
          },
        },
      ]);

      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}; //end of chart 1

// Chart2 - get all request within 30days
const getChartTwo = () => {
  return async (req, res, next) => {
    try {
      const abc = await Student.studentModel.aggregate([
        {
          $group: {
            _id: '$program',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: -1 },
        },
      ]);

      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}; //end of chart 2

// Chart3 - get all request within 30days
const getChartThree = () => {
  return async (req, res, next) => {
    try {
      const abc = await Request.requestModel.aggregate([
        {
          $match: {
            requestedDate: {
              $gte: new Date(
                new Date().getTime() -
                  30 * 24 * 60 * 60 * 1000
              ),
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$requestedDate',
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: -1 },
        },
      ]);

      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}; //end of chart 3

const getRequestById = () => {
  return async (req, res, next) => {
    try {
      //get requests column from student
      const abc = await Request.requestModel.findById(
        req.params.id
      );
      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const claireFn = () => {
  return async (req, res) => {
    try {
      const pendingRequests = await Request.requestModel
        .find({
          isApproved: false,
          isRejected: false,
          isExpired: false,
          // adminVerifiedDate: null,
          // approvedAdmin: null
        })
        .sort({ flightDate: 1 });

      res.json(pendingRequests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const getFinalList = () => {
  return async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const requestsInToday = await Request.requestModel
        .find({
          isApproved: true,
          isRejected: false,
          isExpired: false,
          // flightDate: {$eq : Date }

          // flightDate: {
          //   $eq: Date.now,
          // },

          flightDate: { $gte: today, $lt: tomorrow },

          //TODO:

          // adminVerifiedDate: null,
          // approvedAdmin: null
        })
        .sort({ flightDate: 1 });

      res.json(requestsInToday);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};
// ******** admin archive ********
const archive = () => {
  return async (req, res) => {
    try {
      const archivedRequests = await Request.requestModel
        .find({
          $or: [
            {
              isApproved: true,
            },
            {
              isRejected: true,
            },
            {
              isExpired: true,
            },
          ],
        })
        .sort({ flightDate: 1, requestedDate: 1 });

      res.json(archivedRequests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const getAdminById = () => {
  return async (req, res, next) => {
    console.log('getAdminById');
    try {
      const abc = await Admin.adminModel.findById(
        req.params.id
      );
      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

// ******** admin decline ********
const declineRequestById = () => {
  return async (req, res, next) => {
    const requestInfo = await Request.requestModel.findById(
      req.params.id
    );
    //MAIN CHECKS
    if (requestInfo.isApproved === true) {
      res.status(500).json({
        message:
          'sorry. already approved. Cannot reject again',
      });

      return;
    }

    if (requestInfo.isExpired === true) {
      res.status(500).json({
        message:
          'sorry. already approved. Cannot reject again',
      });

      return;
    }

    if (requestInfo.isRejected === true) {
      res.status(500).json({ message: 'already rejected' });

      return;
    }

    requestInfo.isRejected = true;

    try {
      const declineArequest = await requestInfo.save();
      res.json(declineArequest);

      // if (requestInfo == null) {
      //   return res.status(404).json({ message: 'Cannot find request' });
      // }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    // res.requestInfo = requestInfo
    next();
  }; //end of middleware
}; //end of declineRequest


async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'flightcoordinator.yoke@gmail.com',
      pass: 'wnamljtnjzuulvva'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <adilsaju@gmail.com>', // sender address
    to: "adilsaju@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


// ******** admin decline ********
const sentEmail = () => {
  return async (req, res, next) => {
    // const requestInfo = await Request.requestModel.findById(
    //   req.params.id
    // );
    let body1 = req.body.finalList
    body1 = {}

    try {

      main().catch(console.error);
      res.json("sent successfull");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    next();
  }; //end of middleware
}; //end of declineRequest


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


const uploadLicByStudentId = (upload) => {
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

      const student1 = await Student.studentModel.findById(req.params.id);
      const student_requirements1_id = student1.studentRequirements._id
      const student_requirements1 = await studentRequirements.studentRequirementsModel.findById(student_requirements1_id);
      student_requirements1.englishProficiency = req.file.publicUrl;
      student_requirements1.uploadedDate = new Date()
      student_requirements1.save()
      student1.studentRequirements = student_requirements1
      student1.save()
  
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
        student_requirements1.save()
        student1.studentRequirements = student_requirements1
        student1.save()
    
        res.json(student1);
       }
     


   })

 }
}



module.exports = {
  getStudents: getStudents,
  getStudentById: getStudentById,
  getRequestsByStudentId: getRequestsByStudentId,

  postRequestByStudentId: postRequestByStudentId,

  getRequests: getRequests,
  getRequestById: getRequestById,
  updateStudentNotesById: updateStudentNotesById,
  claireFn: claireFn,
  archive,
  getFinalList: getFinalList,
  getAdminById: getAdminById,
  approveRequestById: approveRequestById,
  uploadLicensesByStudentId: uploadLicensesByStudentId,
  getChartThree,
  declineRequestById,
  getChartTwo,
  getChartOne,
  getRequestsByStudentIdValidated: getRequestsByStudentIdValidated,
  sentEmail,
  updateStudentPhoto,
  uploadLicByStudentId
};
