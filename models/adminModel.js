const mongoose = require('mongoose');
// const {requestSchema,requestModel} = require('./requestModel')
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  firebase_uid: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //  approvedRequests: [requestSchema],
  // approvedRequests: [ mongoose.Schema.Types.ObjectId ]
});

adminSchema.methods.comparePassword = (
  password,
  hashPassword
) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
  adminSchema: adminSchema,
  adminModel: mongoose.model('admin', adminSchema, 'admin'),
};
