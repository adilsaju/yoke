const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/adminModel.js');
const { request } = require('express');

//===============
const studentRequirementsCutoff = {
  
  flownHours: 100,
  balance: 50,
  englishProficiency: true,

}

const max_request_quota  = 10;

//================

const getStudents = () => {
  return async (req, res, next) => {
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

const putStudentById = () => {
  return async (req, res, next) => {
    console.log('putStudentById');
    try {
      const particularStudent =
        await Student.studentModel.findById(req.params.id);
      console.log(req.body);
      console.log(req.body.notes);

      particularStudent.notes = req.body.notes;
      particularStudent.save();
      // const sas = await Student.studentModel.findById(req.body.studentId)

      res.json(particularStudent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const uploadLicensesByStudentId = () => {
  return async (req, res, next) => {
    console.log('putStudentById');
    console.log(req.file);
    console.log(req.params.id);
    try {
      //TODO:

      res.json({
        message: `uploaded for student: ${req.params.id}`,
      });
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

const postRequestByStudentId = () => {
  return async (req, res, next) => {
    /*
        {
            "flightDate" : "2022-11-20T07:47:06.937Z",
            "studentId": "634c84017abbf81281febf50"
        }
        
        */
    try {
      console.log('posttttt');
      console.log(req.body);

      const particularStudent = await Student.studentModel.findById(
        req.body.studentId
      );

      console.log('particularStudent', particularStudent);

              //date validation
              try {
                 let d = req.flightDate.toISOString();
              } catch (error) {
                res
                .status(500)
                .json({ error: true, message: "invalid flightDate" });
                return
              }



              //return all requests of given student
              const requestsOfAStudent = await Request.requestModel.find({
                'requestedStudent._id': req.body.studentId
              });
              // if same student  and same date requests return error
        requestsOfAStudent.map((reqDBObj)=>{
          if (reqDBObj.flightDate.toLocaleDateString() === req.body.flightDate.toLocaleDateString())
          {
            res
            .status(500)
            .json({ error: true, message: "already requested same travel day" });
            return
          }
        })


              // if student  request early date, return error
              requestsOfAStudent.map((reqDBObj)=>{
                if (req.body.flightDate.toLocaleDateString() <= new Date())
                //TODO: 
                {
                  res
                  .status(500)
                  .json({ error: true, message: "very early, Cannot process given travel date" });
                  return
                }
              })

        //if student exceeds max quota of requests, return error
        let cnt = 0 ;
        requestsOfAStudent.map((req)=>{
            cnt  = cnt  + 1;

        })
        if ( cnt >= max_request_quota){
          res
          .status(500)
          .json({ error: true, message: "already requested enough" });
          return
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
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: error.message });
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

// Chart3 - get all request within 30days
const getChartThree = () => {
  return async (req, res, next) => {
    try {
      //const abc = await Request.requestModel.find({

      // $filter: {
      //   input: 'requestedDate',
      //   as: 'requests',
      //   cond: {
      //     $gte: [
      //       new Date(
      //         new Date().getTime() -
      //           15 * 24 * 60 * 60 * 1000
      //       ),
      //     ],
      //   },
      // },

      // ** filter 30days **
      // requestedDate: {
      //   $gte: [
      //     new Date(
      //       new Date().getTime() -
      //         15 * 24 * 60 * 60 * 1000
      //     ),
      //   ],
      // },

      //});
      //end of const abc

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
};

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

module.exports = {
  getStudents: getStudents,
  getStudentById: getStudentById,
  getRequestsByStudentId: getRequestsByStudentId,

  postRequestByStudentId: postRequestByStudentId,

  getRequests: getRequests,
  getRequestById: getRequestById,
  putStudentById: putStudentById,
  claireFn: claireFn,
  archive,
  getFinalList: getFinalList,
  getAdminById: getAdminById,
  approveRequestById: approveRequestById,
  uploadLicensesByStudentId: uploadLicensesByStudentId,
  getChartThree,
  declineRequestById,
};
