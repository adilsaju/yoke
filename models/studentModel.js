const mongoose = require('mongoose');
// const {requestSchema} = require('./requestModel')
const {
  studentRequirementsSchema,
} = require('./checklistModel');

const bcrypt = require('bcrypt');
// const validator = require('validator');

// mongoose.pluralize(null);

const studentSchema = new mongoose.Schema({
  firebase_uid: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    //unique: true
  },
  password: {
    type: String,
    required: true,
  },
  notes: String,
  studentNumber: Number,
  // photo: {
  //    name: String,
  //    image: {
  //       data: Buffer,
  //       contentType: String
  //    }
  // },
  photo: String,
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  program: String,
  studentRequirements: studentRequirementsSchema,

  // requests: [requestSchema],
  // requests: [ mongoose.Schema.Types.ObjectId],
});

//*** static login method ***
// studentSchema.statics.login = async function (
//   email,
//   password
// ) {
//   if (!email || !password) {
//     throw Error('All fields must be filled');
//   }

//   const user = await this.findOne({ email });
//   if (!user) {
//     throw Error('Incorrect Email');
//   }

//   const match = await bcrypt.compare(
//     password,
//     user.password
//   );
//   if (!match) {
//     throw Error('Incorrect Password');
//   }

//   return user;
// };

module.exports = {
  studentSchema: studentSchema,
  studentModel: mongoose.model(
    'student',
    studentSchema,
    'student'
  ),
};
