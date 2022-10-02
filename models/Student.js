const mongoose = require('mongoose')
// mongoose.pluralize(null);
const studentRequirementsSchema = new mongoose.Schema({
   flownHours: Number,
   balance: Number,
   licenseType: String,
   englishProficiency: Boolean,

})

const studentDocumentVerificationSchema = new mongoose.Schema({
   medicalLicense: String,
   radioLicense: String,
   license: String,
   uploadedDate:  {
      type: Date,
      default: Date.now
   },
   isApproved: {
      type: Boolean,
      default: false
   },
   dateOfVerification: {
      type: Date,
      default: Date.now
   },
   isReuploadRequested: {
      type: Boolean,
      default: false
   },
   // student: studentSchema,
   // approvedAdmin: adminSchema,
})

const requestSchema = new mongoose.Schema({
   flightDate: {
      type: Date,
      default: Date.now
   },
   isApproved: {
      type: Boolean,
      default: false
   },
   requestedDate:  {
      type: Date,
      default: Date.now
   },
   adminVerifiedDate: {
      type: Date,
      default: Date.now
   }
   // student: studentSchema,
   // approvedAdmin: adminSchema,
})



const adminSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   approvedRequests: [requestSchema],
   approvedStudentDocuments: [studentDocumentVerificationSchema]

})

const studentSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   studentNumber: Number,
   photo: String,
   dateJoined: {
      type: Date,
      default: Date.now
   },
   program: String,
   studentRequirements: studentRequirementsSchema,
   isRequirementsOk: {
      type: Boolean,
      default: false
   },
   requests: [requestSchema],
   studentDocumentVerification: studentDocumentVerificationSchema,


})



module.exports = {
   studentRequirements: mongoose.model('studentRequirements', studentRequirementsSchema, 'studentRequirements'),
   studentDocumentVerification: mongoose.model('studentDocumentVerification', studentDocumentVerificationSchema, 'studentDocumentVerification'),
   request: mongoose.model('request', requestSchema, 'request'),
   admin: mongoose.model('admin', adminSchema, 'admin'),
   student: mongoose.model('student', studentSchema, 'student'),


}
