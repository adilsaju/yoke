const Student = require('../models/StudentModel')
const Checklist = require('../models/checklistModel')
const Request = require('../models/requestModel')
const Admin = require('../models/adminModel')

console.log("rannnn data addd()")

//data creation
async function addData() {


    const studentRequirements1 = await Checklist.studentRequirementsModel.create({flownHours: 123 , balance: 66, licenseType: "ykkkk", englishProficiency: true, medicalLicense: "abc", radioLicense: "abc", license: "ykkk"})



    const admin1 = await Admin.adminModel.create({name: "Claire" , email: "claire@gmail.com", password: "12345678" })

    const student1 = await Student.studentModel.create({name: "Jane" , email: "adilsaju@gmail.com", password: "12345678", studentNumber: 35209583920, photo: "assffsafsafsa", program: "cpl", studentRequirements: studentRequirements1 })

    const student2 = await Student.studentModel.create({name: "Joanne" , email: "adilsaju@gmail.com", password: "12345678", studentNumber: 35209583921, photo: "assffsafsafsa", program: "cpl", studentRequirements: studentRequirements1 })

    const request1 = await Request.requestModel.create({requestedStudent: student1,approvedAdmin: admin1})
    const request2 =await Request.requestModel.create({requestedStudent: student2,approvedAdmin: null})
    // user.name = ""
    // await user.save()

    //const user  = new User({ name: "Kyle" , age: 26 })
    //await user.save()
}

exports.addData = addData