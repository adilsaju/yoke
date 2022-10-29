const mongoose = require('mongoose')
// const {requestSchema,requestModel} = require('./requestModel')


const adminSchema = new mongoose.Schema({
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
   //  approvedRequests: [requestSchema],
   // approvedRequests: [ mongoose.Schema.Types.ObjectId ]
 
 })

 adminSchema.index({ 'email' : 1 }, { unique: true });


 module.exports = {
   adminSchema: adminSchema,
   adminModel: mongoose.model('admin', adminSchema, 'admin'),
 }
 