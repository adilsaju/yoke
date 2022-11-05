"use strict";

var express = require('express');

var router = express.Router();

var Student = require('../models/StudentModel.js');

var Request = require('../models/requestModel.js');

var Admin = require('../models/adminModel.js');

var studentRequirements = require('../models/checklistModel.js');

var _require = require('express'),
    request = _require.request;

var nodemailer = require("nodemailer");

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

function main(recipient, reason, body) {
  var testAccount, transporter, info;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(nodemailer.createTestAccount());

        case 2:
          testAccount = _context.sent;
          // create reusable transporter object using the default SMTP transport
          transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            // true for 465, false for other ports
            auth: {
              user: 'flightcoordinator.yoke@gmail.com',
              pass: 'wnamljtnjzuulvva'
            }
          }); // send mail with defined transport object

          _context.next = 6;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: '"Admin@flyingscholl" <adilsaju@gmail.com>',
            // sender address
            to: "".concat(recipient),
            // list of receivers
            subject: "".concat(reason),
            // Subject line
            text: "".concat(body),
            // plain text body
            html: "".concat(body) // html body

          }));

        case 6:
          info = _context.sent;
          console.log("Message sent: %s", info.messageId); // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview only available when sending through an Ethereal account

          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
} // ******** admin decline ********


var sentEmail = function sentEmail() {
  return function _callee(req, res, next) {
    var body1, email;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // const requestInfo = await Request.requestModel.findById(
            //   req.params.id
            // );
            body1 = req.body.finalList;
            body1 = {};
            body1 = JSON.stringify(body1); //TODO: get final list

            email = "tarun.1999thakur33@gmail.com";

            try {
              main(email, "Final List", body1)["catch"](console.error);
              res.json("sent successfull");
            } catch (error) {
              res.status(500).json({
                message: error.message
              });
            }

            next();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  }; //end of middleware
}; //end of declineRequest


var sentEmailStudentApproved = function sentEmailStudentApproved() {
  return function _callee2(req, res, next) {
    var message, fldt, studentmail, studentEmail;
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            message = req.body.text;
            fldt = req.body.travelDate;
            studentmail = req.body.mailId;
            body = "Hello, Your Request for ".concat("".concat(fldt), " has been approved."); // let studentId = req.body.studentEmail
            // const studentEmail = Student.studentModel.findById(studentId).select(email);

            studentEmail = studentmail;

            try {
              // body=`<b>Hello world?</b>`
              main(studentEmail, message, body)["catch"](console.error);
              res.json("sent successfull");
            } catch (error) {
              res.status(500).json({
                message: error.message
              });
            }

            next();

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  }; //end of middleware
}; //end of declineRequest


var sentEmailStudentDeclined = function sentEmailStudentDeclined() {
  return function _callee3(req, res, next) {
    var message, fldt, ROD, studentmail, studentEmail;
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            message = req.body.text;
            fldt = req.body.travelDate;
            ROD = req.body.declineReason;
            studentmail = req.body.mailId; // const studenEmail = Student.studentModel.findById(studentId).select(email);

            body = "Hello, Your Request for ".concat(fldt, " has been declined and the reason is : ").concat(ROD, " ");
            studentEmail = studentmail;

            try {
              // body=`<b>Hello world?</b>`
              main(studentEmail, message, body)["catch"](console.error);
              res.json("sent successfull");
            } catch (error) {
              res.status(500).json({
                message: error.message
              });
            }

            next();

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    });
  }; //end of middleware
}; //end of declineRequest


module.exports = {
  sentEmail: sentEmail,
  sentEmailStudentApproved: sentEmailStudentApproved,
  sentEmailStudentDeclined: sentEmailStudentDeclined
};