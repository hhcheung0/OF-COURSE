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
    const {courseID} = req.body;
    const username = verifyToken(req.cookies.jwt)

    Course.findOne({courseID})
    .then(course => {
        // find user enrolled course credit
        User.findOne({username})
        .then(user => {
            async function findCourseCredit(courseID){
                const course = await Course.findOne({courseID: { $eq: courseID}})
                return course.credit
            }

            async function calUserEnrolledCredit(array){
                let enrolledCredit = 0;
                for(i = 0; i < array.length; i++){
                    //console.log(array[i].courseID)
                    const credit = await findCourseCredit(array[i].courseID)
                    //console.log(credit)
                    enrolledCredit += credit;
                }
                console.log(enrolledCredit)
                return enrolledCredit;
            }

            console.log(calUserEnrolledCredit(user.shoppingCartCourse));
            /*
            //console.log(course.enrolledID.length);
            if(course.enrolledID.length == course.courseCapacity){ //check if course capacity is full
                return res.status(400).send({success: false, error: "Course is full already"})
            }else if(enrolledCredit == user.maxCredit){
                return res.status(400).send({success: false, error: "User reached max credit already"})
            }
            */
        })
        

        /*
        User.findOne({username})
        .then(user => {
            let occupiedTimeSlot = [];
            for(i = 0; i < user.shoppingCartCourse.length; i++){
                console.log(user.shoppingCartCourse[i].courseID)
                
    
                Course.aggregate([
                    {$match: {'courseID' : user.shoppingCartCourse[i].courseID}},
                    {$project: {
                        _id: 0,
                        courseTime: 1,
                        tutorial: {
                            $filter: {
                                input: '$tutorialInfo',
                                as: 'tutorial',
                                cond: { $eq: ['$$tutorial.tutorialID', user.shoppingCartCourse[i].tutorialID]}
                            }
                        }
                    }}
                ])
                .then(course => {
                    console.log(course[0].courseTime)
                    console.log(course[0].tutorial[0].tutorialTime)
                    let courseTimeSlot = course[0].courseTime.concat(course[0].tutorial[0].tutorialTime)
                    occupiedTimeSlot = occupiedTimeSlot.concat(courseTimeSlot)
                })
            }
            console.log(occupiedTimeSlot)
        })
        */

        /*
        console.log(course.enrolledID.length);
        if(course.enrolledID.length == course.courseCapacity){ //check if course capacity is full
            return res.status(400).send({success: false, error: "Course is full already"})
        }else if()
        */
    })
    .catch(error => res.json({error}))
})

module.exports = router