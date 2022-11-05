const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/adminModel.js');
const studentRequirements = require('../models/checklistModel.js');
const { request } = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const json2html = require('node-json2html');
// const { parse } = require('json2csv');
// var json2html = require('json2html')




async function main(recipient,reason, body) {
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
        //actual pwd is: Oneringtorulethemall
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Yoke App ✈️" <mailer@yoke.com>', // sender address
      to: `${recipient}`, // list of receivers
      subject: `${reason}`, // Subject line
      text: `${body}`, // plain text body
      html: `${body}`, // html body
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


      // let body1 = req.body.finalList
      // body1 = {}
      //TODO: get final list
// ===========
let body1 = await Request.requestModel
.find({
  isApproved: true,
  isRejected: false,
  isExpired: false,
})
.sort({ flightDate: 1 }).populate("requestedStudent").populate("approvedAdmin").select(["flightDate", "requestedDate", "requestedStudent", "approvedAdmin" ]);

// ===========

kk = `
<table style="text-align: center; border: 1px solid black;">
  <tr>
    <th>Flight Date</th>
    <th>Requested Date</th>
    <th>Student Name</th>
    <th>Approved Admin Name</th>

  </tr>`

  body1.forEach((el)=>{

kk+=`  <tr>
<td>${el.flightDate}</td>
<td>${el.requestedDate}</td>
<td>${el.requestedStudent.name}</td>
<td>${el.approvedAdmin && el.approvedAdmin.name}</td>
</tr>`

  })
  kk+=`
</table>
`
// const fields = ['flightDate', 'isApproved', 'requestedDate'];
// const opts = { fields };

//   const csv = parse(body1, opts);
//   console.log(csv);


// let kk = json2html.render(body1, {plainHtml: true})
      // body1=JSON.stringify(body1)
      // body1 = json2html.transform(body1)

      const email = "flightcoordinator.yoke@gmail.com"
      try {
  
        main(email,"Final List",kk).catch(console.error);
        res.json("sent successfull");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  
      next();
    }; //end of middleware
  }; //end of declineRequest
  
  
  const sentEmailStudentApproved = () => {
    return async (req, res, next) => {
      let message = req.body.text
      let fldt = req.body.travelDate
      let studentmail = req.body.mailId
      body = `Hello, Your Request for ${`${fldt}`} has been approved.`
      // let studentId = req.body.studentEmail

      // const studentEmail = Student.studentModel.findById(studentId).select(email);
      const studentEmail = studentmail
      try {
        // body=`<b>Hello world?</b>`
        main(studentEmail,message, body).catch(console.error);
        res.json("sent successfull");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      next();
    }; //end of middleware
  }; //end of declineRequest


  const sentEmailStudentDeclined = () => {
    return async (req, res, next) => {
      let message = req.body.text
      let fldt = req.body.travelDate
      let ROD = req.body.declineReason
      let studentmail = req.body.mailId

      // const studenEmail = Student.studentModel.findById(studentId).select(email);
     
      body = `Hello, Your Request for ${fldt} has been declined and the reason is : ${ROD} `
      const studentEmail = studentmail
      try {
        // body=`<b>Hello world?</b>`
        main(studentEmail,message, body).catch(console.error);
        res.json("sent successfull");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      next();
    }; //end of middleware
  };  //end of declineRequest



  module.exports = {

    sentEmail,
    sentEmailStudentApproved,
    sentEmailStudentDeclined,

  };
  