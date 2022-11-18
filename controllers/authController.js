const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/adminModel.js');
const Checklist = require('../models/checklistModel.js');
const { request } = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { studentRequirementsCutoff } = require("./studentController")

const createHashPassword = async (password)=>{
    // const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, 10)
    // console.log("salt", salt);
    console.log("hashPassword", hashPassword);
  return hashPassword
}


const validateStudentInDb = async (student) => {
  const student_requirements1_id = student.studentRequirements._id
  const studentRequirements1 = await Checklist.studentRequirementsModel.findById(student_requirements1_id);
  studentRequirements1.isRequirementsOk = true

      //VALIDATION LOGIC 
      if ( studentRequirements1.flownHours < studentRequirementsCutoff.flownHours){
        studentRequirements1.isRequirementsOk = false
      }
      if ( studentRequirements1.balance < studentRequirementsCutoff.balance){
        studentRequirements1.isRequirementsOk = false
      }
      // studentRequirements1.save();
  
      if ( !studentRequirements1.license.startsWith("https://") || !studentRequirements1.radioLicense.startsWith("https://") || !studentRequirements1.medicalLicense.startsWith("https://") || !studentRequirements1.englishProficiency.startsWith("https://") ) {
  
        studentRequirements1.isRequirementsOk = false
  
      }

      await studentRequirements1.save()
      student.studentRequirements = studentRequirements1
      await student.save()
      return student
}

const createStudent = ()=>{
  return async (req, res, next) => {
    try {
      const email = req.body.email
      const password = req.body.password
   
      const hashPassword = await createHashPassword(password)
       //save student to db
    const studentRequirements1 = await Checklist.studentRequirementsModel.create({flownHours: 123 , balance: 66, licenseType: "cpl", englishProficiency: true, medicalLicense: "abc", radioLicense: "abc", license: "xyz", isRequirementsOk: true })
       
    // //VALIDATION LOGIC 
    // if ( studentRequirements1.flownHours < studentRequirementsCutoff.flownHours){
    //   studentRequirements1.isRequirementsOk = false
    // }
    // if ( studentRequirements1.balance < studentRequirementsCutoff.balance){
    //   studentRequirements1.isRequirementsOk = false
    // }
    // // studentRequirements1.save();

    // if ( !studentRequirements1.license.startsWith("https://") || !studentRequirements1.radioLicense.startsWith("https://") || !studentRequirements1.medicalLicense.startsWith("https://") || !studentRequirements1.englishProficiency.startsWith("https://") ) {

    //   studentRequirements1.isRequirementsOk = false

    // }
// ===============================
    
    const student1 = await Student.studentModel.create({name: req.body.name || "abc" , email: email, password: hashPassword , studentRequirements: studentRequirements1  })

      validateStudentInDb(student1)

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


//TODO: Fn
// function generateAccessToken (user) {
//   return jwt.sign(user, process.env.ACCESS TOKEN SECRET, { expiresIn:
//   "15s
//   })
//   }

//FORMAT
// Authorization: Bearer <access_token>
//verfify token
function verifyToken(req,res,next){
  console.log("verifyToken()");
  //get auth header
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined')
  {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    req.token = bearerToken

    next();
  }else{
    //Forbidden
    res.sendStatus(403)
  }
}


module.exports = {

    createHashPassword,
    createStudent,
    studentLogin,
    createAdmin,
    verifyToken,
    validateStudentInDb
  };
  