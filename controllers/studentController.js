const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/adminModel.js');
const { request } = require('express');

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
    try {
      //TODO:

      res.json({});
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
      //FIXME: if req.query.student is empty, its returning all data fix that
      const studentId = req.query.student;
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

      const sas = await Student.studentModel.findById(
        req.body.studentId
      );

      console.log('sas', sas);
      //create obj
      const request = {
        //TODO: add date validation
        //TODO: if same student  and same date requests return error!!!!!!!!
        //TODO: if student exceeds max quota of requests, return error!!!!!!
        flightDate: req.body.flightDate,
        requestedDate: new Date(),
        adminVerifiedDate: null,
        isApproved: false,
        isRejected: false,
        isExpired: false,
        requestedStudent: sas,
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
      const requestsInToday = await Request.requestModel
        .find({
          isApproved: true,
          isRejected: false,
          isExpired: false,
          // flightDate: {$eq : Date }
          flightDate: {
            $eq: Date.now,
          },
          //TODO:

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
const declineRequest = () => {
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
  declineRequest,
};
