require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const {addData} = require("./scripts/data-create");
const studentRoute = require('./routes/studentRoute')
// const bodyParser = require('body-parser')
const Student = require('./models/studentModel')
const Checklist = require('./models/checklistModel')
const Request = require('./models/requestModel')
const Admin = require('./models/adminModel')
// const login = require('./routes/login')
const errorHandler = require('./middlewares/errorMiddleware')
const jwt = require('jsonwebtoken')
const cors = require('cors')


const port = process.env.PORT || 5001

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true } )
const db = mongoose.connection 
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.error('connected to database'))


Request.requestModel.collection.dropIndexes(function (err, results) {
    // Handle errors
});
// addData()
app.use(cors())

//middleware
app.use(express.json())
// app.disable('view cache');

//router 
app.use("/api/", studentRoute)

// app.use("/login", login)

//error handler middleware
app.use(errorHandler)
// app.use(bodyParser()) // support encoded bodies
// bodyParser.json([])
// app.use(errorHandler)
app.use((req, res, next) => {
  res.status(404);
  res.send({
    error: '404 Page: Not found',
  });
});

app.listen(port, ()=>{
    console.log('server started');
})



