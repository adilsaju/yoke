const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/adminModel.js');
const studentRequirements = require('../models/checklistModel.js');
const { request } = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { validateStudentInDb } = require('./authController.js');
const { studentRequirementsCutoff } = require("./cutoff.js")

//===============
// const studentRequirementsCutoff = {
//   flownHours: 100,
//   balance: 50,
// };

const max_request_quota = 100;
const daysBeforeHecanBook = 7;

//================

const getStudents = () => {
  return async (req, res, next) => {
    // jwt.verify(req.token, 'secretkey', (err, authData)=>{
    //   if(err){
    //     res.sendStatus(403);

    //   }
    //   // else{
    //   //   res.json({
    //   //     message: "get students worked",
    //   //     authData
    //   //   })
    //   // }
    // })
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

const validateStudentById = () => {
  return async (req, res, next) => {
    console.log('hq');
    try {
      let  abc = await Student.studentModel.findById(
        req.params.id
      );

      abc = await validateStudentInDb(abc);
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
        'requestedStudent': req.params.id,
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

const undoApproveRequestById = () => {
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
      // if (particularRequest.isExpired === true) {
      //   res
      //     .status(500)
      //     .json({ message: 'sorry. already expired' });

      //   return;
      // }

      // if (particularRequest.isRejected === true) {
      //   res
      //     .status(500)
      //     .json({ message: 'already rejected' });

      //   return;
      // }

      if (particularRequest.isApproved !== true) {
        res
          .status(500)
          .json({ message: 'not approved. So no need to undo' });

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
      particularRequest.isApproved = false;
      particularRequest.approvedAdmin = particularAdmin;
      // particularRequest.adminVerifiedDate = new Date();
      // particularRequest.isExpired = false

      particularRequest.save();

      // const sas = await Student.studentModel.findById(req.body.studentId)

      res.json(particularRequest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const undoDeclineRequestById = () => {
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
      // if (particularRequest.isExpired === true) {
      //   res
      //     .status(500)
      //     .json({ message: 'sorry. already expired' });

      //   return;
      // }

      // if (particularRequest.isRejected === true) {
      //   res
      //     .status(500)
      //     .json({ message: 'already rejected' });

      //   return;
      // }

      if (particularRequest.isRejected !== true) {
        res
          .status(500)
          .json({ message: 'not declined. So no need to undo' });

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
      particularRequest.isRejected = false;
      particularRequest.reason = "";
      particularRequest.approvedAdmin = particularAdmin;
      // particularRequest.adminVerifiedDate = new Date();
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
    console.log("getRequestsByStudentId")
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
        'requestedStudent': studentId,
      }).sort({ flightDate: 1 }).populate("requestedStudent").populate("approvedAdmin");

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
        'requestedStudent': studentId,
      }).populate("requestedStudent").populate("approvedAdmin");

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
          'requestedStudent': req.body.studentId,
        });
      // if same student  and same date requests return error
      requestsOfAStudent.map((reqDBObj) => {
        // console.log("nintha:", reqDBObj.flightDate.toLocaleDateString())

        if (
          reqDBObj.flightDate.toLocaleDateString() ===
          new Date(req.body.flightDate).toLocaleDateString()
        ) {
         throw new Error('Already requested same travel day')

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

const sentToFC = () => {
  return async (req, res, next) => {
    const daftom = new Date();
daftom.setDate(daftom.getDate()+28);
let flgg = 1;
const today = new Date();
    console.log('senttoFc');
    try {
      
          Request.requestModel.updateMany({ $and: [
            {
              flightDate: {
                $lt:daftom
              }
            },
            {
              flightDate: {
                $gt:today
              }
            }
          ]}, 
            {IsSentToCoordinator:true}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        });

    

      res.json('success');
    } catch (error) {
      res.status(500).json({ message: error.message });
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
      ).populate("requestedStudent").populate("approvedAdmin");
      res.json(abc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const claireFn = () => {
  return async (req, res) => {
    try {
      // const pendingRequests = await Request.requestModel
      //   .find({
      //     isApproved: false,
      //     isRejected: false,
      //     isExpired: false,
      //     // adminVerifiedDate: null,
      //     // approvedAdmin: null
      //   })
      //   .sort({ flightDate: 1 });
        // pendingRequests.forEach((el)=>{
        //   console.log(el.populate("requestedStudent"))
        //  el.requestedStudent = el.populate("requestedStudent")
        // })
        const pendingRequests2 = await Request.requestModel.find({
          isApproved: false,
          isRejected: false,
          isExpired: false,
          // adminVerifiedDate: null,
          // approvedAdmin: null
        }).sort({ flightDate: 1 }).populate("requestedStudent").populate("approvedAdmin")
        console.log(pendingRequests2)
      res.json(pendingRequests2);
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
      const daftom = new Date();
      daftom.setDate(daftom.getDate()+28);
 
      const todayy = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const requestsInToday = await Request.requestModel
        .find({
          isApproved: true,
          isRejected: false,
          isExpired: false,
          IsSentToCoordinator: false
          // flightDate: {$eq : Date }

          // flightDate: {
          //   $eq: Date.now,
          // },

          // flightDate: { $gte: today, $lt: tomorrow },

          //TODO:

          // adminVerifiedDate: null,
          // approvedAdmin: null
        })
        .sort({ flightDate: 1 }).populate("requestedStudent").populate("approvedAdmin");

        let body2 = requestsInToday.filter((a) =>{
          return a.flightDate < daftom && a.flightDate > todayy
        })
        
      res.json(body2);
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
        .sort({ flightDate: 1, requestedDate: 1 }).populate("requestedStudent").populate("approvedAdmin");

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

    requestInfo.isRejected = true;
    //actually declinedadmin :(
    requestInfo.approvedAdmin=particularAdmin
    requestInfo.adminVerifiedDate = new Date();
    requestInfo.reason = req.body.reason


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







module.exports = {
  getStudents,
  getStudentById,
  getRequestsByStudentId,

  postRequestByStudentId,
  sentToFC,
  getRequests,
  getRequestById,
  updateStudentNotesById,
  claireFn,
  archive,
  getFinalList,
  getAdminById,
  approveRequestById,
  getChartThree,
  declineRequestById,
  getChartTwo,
  getChartOne,
  getRequestsByStudentIdValidated,
  undoApproveRequestById,
  // studentRequirementsCutoff,
  undoDeclineRequestById,
  validateStudentById
};
