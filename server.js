require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const {addData} = require("./scripts/data-create");
const studentRoute = require('./routes/studentRoute')
// const bodyParser = require('body-parser')

// const login = require('./routes/login')
const errorHandler = require('./middlewares/errorMiddleware')
const jwt = require('jsonwebtoken')

const port = process.env.PORT || 5001

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true } )
const db = mongoose.connection 
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.error('connected to database'))

// addData()

//middleware
app.use(express.json())
// app.disable('view cache');

//router 
app.use("/", studentRoute)

// app.use("/login", login)

//error handler middleware
app.use(errorHandler)
// app.use(bodyParser()) // support encoded bodies
// bodyParser.json([])


app.listen(port, ()=>{
    console.log('server started');
})



