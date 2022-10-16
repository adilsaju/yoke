require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const {run} = require("./scripts/data-create");
const studentRoute = require('./routes/student')
// const login = require('./routes/login')

const port = process.env.PORT || 5001

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true } )
const db = mongoose.connection 
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.error('connected to database'))

run()

//middleware
app.use(express.json())
// app.disable('view cache');

//router 
app.use("/", studentRoute)

// app.use("/login", login)

app.listen(port, ()=>{
    console.log('server started');
})



