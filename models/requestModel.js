const mongoose = require('mongoose')

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
    },
    // student: studentSchema,
    // approvedAdmin: adminSchema,

   requestedStudent:  mongoose.Schema.Types.ObjectId,
   approvedAdmin:  mongoose.Schema.Types.ObjectId,
 })


 module.exports = {
    requestModel:  mongoose.model('request', requestSchema, 'request'),
    requestSchema: requestSchema
 }
