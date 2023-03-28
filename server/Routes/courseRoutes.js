const { Router } = require('express')
const router = Router()

// require models
const Course = require('../Models/CourseModel')

// get an array of all courses
router.get('/data/course', (req, res) => {
    Course.find()
    .then(courseArray => {
        if (!courseArray) return res.json({error: 'course array is empty'})
        return res.json(courseArray)
    })
    .catch(error => res.json(error))
})

// get a specific course
router.get('/data/course/:courseID', (req, res) => {
    Course.findOne(req.params)
    .then(course => {
        if (!course) return res.json({error: 'course is not found'})
        return res.json(course)
    })
    .catch(error => res.json({error}))
})

router.post('data/course/addtocart', (req,res)=>{
    console.log(req.body);
})

module.exports = router