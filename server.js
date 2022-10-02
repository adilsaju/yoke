require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Student = require("./models/Student.js")

const port = 5001

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true } )
const db = mongoose.connection 
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.error('connected to database'))

async function run() {


    const studentRequirements = await Student.studentRequirements.create({flownHours: 123 , balance: 66, licenseType: "cpl", englishProficiency: true})

    const studentDocumentVerification = await Student.studentDocumentVerification.create({medicalLicense: "43243" , radioLicense: "54365", license: "12212"})

    const request = await Student.requestSchema.create({})
    const request2 = await Student.requestSchema.create({})


    const admin = await Student.admin.create({name: "Claire" , email: "claire@gmail.com", password: "12345678" , approvedRequests: [request,request2], approvedStudentDocuments: [studentDocumentVerification]})

    const student = await Student.student.create({name: "Adill" , email: "adilsaju@gmail.com", password: "12345678", studentNumber: 35209583920, photo: "assffsafsafsa", program: "cpl", studentRequirements: studentRequirements,  requests: [request], studentDocumentVerification: studentDocumentVerification })
    // user.name = ""
    // await user.save()

    //const user  = new User({ name: "Kyle" , age: 26 })
    //await user.save()
}

run() 

//middleware
app.use(express.json())
//router 
// const subscribersRouter = require('./routes/s')
const router = express.Router()
//getting all
app.get('/',async (req,res)=>{
    try {
        const abc=await Student.student.find()
        res.json(abc)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
    // res.send('hw')
})


app.listen(port, ()=>{
    console.log('server started');
})



