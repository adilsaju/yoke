const express = require('express')
const router = express.Router()

router.get('/students',async (req,res)=>{
    try {
        res.json({})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
    // res.send('hw')
})



module.exports = router ;


