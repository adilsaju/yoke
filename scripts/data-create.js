const Student = require('../models/StudentModel')
const Checklist = require('../models/checklistModel')
const Request = require('../models/requestModel')
const Admin = require('../models/adminModel')

console.log("rannnn")

//data creation
async function run() {


    const studentRequirements = await Checklist.studentRequirementsModel.create({flownHours: 123 , balance: 66, licenseType: "ykkkk", englishProficiency: true, medicalLicense: "abc", radioLicense: "abc", license: "ykkk"})

    const request = await Request.requestModel.create({})
    const request2 = await Request.requestModel.create({})

    const admin = await Admin.adminModel.create({name: "Claire" , email: "claire@gmail.com", password: "12345678" , approvedRequests: [request,request2]})

    const student = await Student.studentModel.create({name: "Jane" , email: "adilsaju@gmail.com", password: "12345678", studentNumber: 35209583920, photo: "assffsafsafsa", program: "cpl", studentRequirements: studentRequirements,  requests: [request] })
    // user.name = ""
    // await user.save()

    //const user  = new User({ name: "Kyle" , age: 26 })
    //await user.save()
}

exports.run = run