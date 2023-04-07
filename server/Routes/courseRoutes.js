const { Router } = require('express')
const router = Router()

// require models
const Course = require('../Models/CourseModel')
const User = require('../Models/UserModel')

// get an array of all courses
router.get('/data/course', (req, res) => {
    Course.find().sort('courseID')
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

router.put('/data/addtocart', (req,res)=>{
    const {courseID, tutorialID, username} = req.body;

    User.findOne({enrolledCourse: {$elemMatch: {courseID, tutorialID}}})
    .then(existCourse =>{
        if(existCourse){
            return res.status(400).send({success: false, error: "Course already added to shopping cart"})
        }
        User.updateOne({ username }, {$push: { shoppingCartCourse: {courseID, tutorialID}}})
        .then(()=> {
            res.send({success: true, error: 'Added to shopping cart'})
        })
    })
    .catch(error => res.json({error}))
    
})

module.exports = router