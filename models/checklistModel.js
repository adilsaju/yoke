const mongoose = require('mongoose')


const studentRequirementsSchema = new mongoose.Schema({
    flownHours: Number,
    balance: Number,
    licenseType: String,
    englishProficiency: String,
    medicalLicense: String,
    radioLicense: String,
    license: String,
    isResubmissionRequestedByAdmin: {
       type: Boolean,
       default: false
    },
    dateVerifiedByAdmin: {
        type: Date,
        default: Date.now
     },

     uploadedDate: {
        type: Date,
        default: Date.now
     },
     isRequirementsOk: {
      type: Boolean,
      default: false
   }
    // student: studentSchema,

 
 })
 
module.exports = {
    studentRequirementsSchema: studentRequirementsSchema,
    studentRequirementsModel: mongoose.model('studentRequirements', studentRequirementsSchema, 'studentRequirements'),
}