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


const createHashPassword = async (password)=>{
    // const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, 10)
    // console.log("salt", salt);
    console.log("hashPassword", hashPassword);
  return hashPassword
}

const createStudent = ()=>{
  return async (req, res, next) => {
    try {
      const email = req.body.email
      const password = req.body.password
   
      const hashPassword = await createHashPassword(password)
       //save student to db
       const student1 = await Student.studentModel.create({name: "abc" , email: email, password: hashPassword })
       res.status(201).json({error:false, message: "user added success", data: student1})
    } catch (error) {
      res.status(500).json({error: true, message: "failed", data: error})
    }
  };
}

const createAdmin = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
 
    const hashPassword = await createHashPassword(password)
     //save student to db
     const adm1 = await Admin.adminModel.create({name: req.body.name || "abc" , email: email, password: hashPassword })
     res.status(201).json({error:false, message: "user added success", data: adm1})
  } catch (error) {
    res.status(500).json({error: true, message: "failed", data: error})
  }
};

//**login from webdevSimplified */
const studentLogin = () => {
  return async (req, res) => {

    //jwt sign

      console.log('login()');
      user = req.body

     const token =  await jwt.sign({user}, 'secretkey' , {expiresIn: '30000m' }) ;
    



    const studentUser = await Student.studentModel.findOne({
      email: req.body.email,
    });

    const adminUser = await Admin.adminModel.findOne({
      email: req.body.email,
    });

    if (studentUser != null) {

    try {
      if (
        await bcrypt.compare(
          req.body.password,
          studentUser.password
        )
      ) {
        console.log("scc");
        res.send({error: false, message: 'login success' , data: studentUser, token: token, isAdmin: false });
      } else {
        console.log("pwd incorrect");
        res.json({error: true, message: 'Not allowed. Password incorrect' });
      }
    } catch(error) {
      return res.status(500).json(error);
    }

  }else if  (adminUser != null) 
  {

    try {
      if (
        await bcrypt.compare(
          req.body.password,
          adminUser.password
        )
      ) {
        console.log("scc");
        res.send({error: false, message: 'login success' , data: adminUser, token: token, isAdmin: true });
      } else {
        console.log("pwd incorrect");
        res.json({error: true, message: 'Not allowed. Password incorrect' });
      }
    } catch(error) {
      return res.status(500).json(error);
    }




  }else {
      return res.status(400).send({error: true, message: 'cannot find email' });

  }

    
  };
};








//** middleware */
const authenticateToken = () => {
  return async (req, res, next) => {
    const studentEmail = Student.studentModel.findOne({
      email: req.body.email,
    });
    const studentUser = { email: studentEmail };

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, studentUser) => {
        if (err) return res.sendStatus(403);
        req.studentUser = studentUser;
        next();
      }
    );

    res.json(
      posts.filter(
        (post) =>
          post.studentEmail === req.studentEmail.email
      )
    );
  };
};

//***login required */
// const loginRequired = () => {
//   return async (req, res, next) => {
//     try {
//       const adminUser = await Admin.adminModel.findById(
//         req.params.id
//       );
//     } catch (error) {
//       res
//         .status(401)
//         .json({ message: 'Unauthorized user!' });
//     }
//     next();

//**from linkedin */
// if (req.studentUser) {
//   next();
// } else {
// return res
//   .status(401)
//   .json({ message: 'Unauthorized user!' });
//   };
// };
//};

/**register the user */
// const register = () => {
//   return async (req, res) => {
//     const newStudentUser =
//       await Student.studentModel.findById(req.body);

//     newStudentUser.hashPassword = bcrypt.hashSync(
//       req.body.password,
//       10
//     );
//     newStudentUser.save((err, studentUser) => {
//       if (err) {
//         return res.status(400).send({ message: err });
//       } else {
//         studentUser.hashPassword = undefined;
//         return res.json(newStudentUser);
//       }
//     });
//   };
// };

/**login to api */
// const studentLogin = () => {
//   return async (req, res) => {
//     Student.studentModel.findOne(
//       {
//         email: req.body.email,
//       },
//       (err, studentUser) => {
//         if (err) throw err;
//         if (!studentUser) {
//           res.status(401).json({
//             message:
//               'Authentication failed. No user found.',
//           });
//         } else if (studentUser) {
//           if (
//             !studentUser.comparePassword(
//               req.body.password,
//               user.hashPassword
//             )
//           )
//             res.status(401).json({
//               message:
//                 'Authentication failed. Wrong Password',
//             });
//         } else {
//           return res.json({
//             token: jwt.sign(
//               {
//                 email: studentUser.email,
//                 _id: studentUser.id,
//               },
//               'RESTFULAPIs'
//             ),
//           });
//         }
//       }
//     );
//   };
// };





module.exports = {

    createHashPassword,
    createStudent,
    studentLogin,
    createAdmin
  };
  