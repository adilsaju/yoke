const mongoose = require('mongoose')
// const {requestSchema} = require('./requestModel')
const {studentRequirementsSchema} = require('./checklistModel')

// mongoose.pluralize(null);


const studentSchema = new mongoose.Schema({
   firebase_uid: String,
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      index: true,
   },
   password: {
      type: String,
      required: true
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
      default: Date.now
   },
   program: String,
   studentRequirements: studentRequirementsSchema,

   // requests: [requestSchema],
   // requests: [ mongoose.Schema.Types.ObjectId],
})
studentSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
   studentSchema: studentSchema,
   studentModel: mongoose.model('student', studentSchema, 'student'),
}