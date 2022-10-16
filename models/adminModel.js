const mongoose = require('mongoose')
// const {requestSchema,requestModel} = require('./requestModel')


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
   //  approvedRequests: [requestSchema],
   // approvedRequests: [ mongoose.Schema.Types.ObjectId ]
 
 })


 module.exports = {
   adminSchema: adminSchema,
   adminModel: mongoose.model('admin', adminSchema, 'admin'),
 }
 