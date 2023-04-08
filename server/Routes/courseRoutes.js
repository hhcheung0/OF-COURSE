const { Router } = require('express')
const router = Router()

// require models
const Course = require('../Models/CourseModel')
const User = require('../Models/UserModel')

const { verifyToken } = require('../Tools/authTools')

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


router.put('/shoppingCart/add', (req,res)=>{
    const {courseID, tutorialID} = req.body;
    const username = verifyToken(req.cookies.jwt)

    User.findOne({username})
    .then(user => {
        const found = user.shoppingCartCourse.some(el => el.courseID === courseID)
        if(found){
            return res.status(400).send({success: false, error: "Course already added to shopping cart"})
        }else{
            User.updateOne({ username }, {$push: { shoppingCartCourse: {courseID, tutorialID}}})
        .then(()=> {
            res.send({success: true, error: 'Added to shopping cart'})
        })
        }
    })
    .catch(error => res.json({error}))
})

router.put('/shoppingCart/remove', (req,res)=>{
    const {courseID} = req.body;
    const username = verifyToken(req.cookies.jwt)

    User.findOne({username})
    .then(user => {
        const found = user.shoppingCartCourse.some(el => el.courseID === courseID)
        if(!found){
            return res.status(400).send({success: false, error: "Course not found in your shopping cart"})
        }else{
            User.updateOne(
                {username},
                {$pull : {shoppingCartCourse : {courseID : courseID}}}
            )
            .then(() => {
                res.send({success: true, error: 'Course removed from shopping cart'})
            })
            .catch(error => res.json(error))
        }
    })
    .catch(error => res.json({error}))
})

router.put('/enrolledCourse/enroll', (req,res)=>{
    //console.log(req.body);
    const {courseID, username} = req.body;

    Course.findOne({courseID})
    .then(course => {
        User.findOne({username})
        .then(user => {
            console.log(user.shoppingCartCourse)
        })
    })
    /*
    User.findOne({username})
    .then(user => {
        res.send(user)
    }
    )
    */
})

module.exports = router