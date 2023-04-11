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
    const {courseID, tutorialID} = req.body;
    const username = verifyToken(req.cookies.jwt)

    User.findOne({username})
    .then(user => {
        //console.log(user)
        Course.aggregate([
            {$match: {courseID}},
            {$project: {
                _id: 0,
                courseID: 1,
                courseName: 1,
                courseTime: 1,
                courseLocation: 1,
                courseCapacity: 1,
                enrolledID:1,
                prerequisiteCourseID: 1,
                forbiddenCourseID: 1,
                tutorial: {
                    $filter: {
                        input: '$tutorialInfo',
                        as: 'tutorial',
                        cond: { $eq: ['$$tutorial.tutorialID', tutorialID]}
                    }
                }
            }}
        ])
        .then(async goingToBeEnrolledCourse => {
            //console.log(goingToBeEnrolledCourse)
           
            async function findCourseCredit(courseID){
                const course = await Course.findOne({courseID: { $eq: courseID}})
                return course.credit
            }

            async function getUserEnrolledCredit(array){
                let enrolledCredit = 0;
                for(i = 0; i < array.length; i++){
                    //console.log(array[i].courseID)
                    const credit = await findCourseCredit(array[i].courseID)
                    //console.log(credit)
                    enrolledCredit += credit;
                }
                return enrolledCredit;
            }

            async function getCourseInfo(courseID){
                const course = await Course.aggregate([
                    {$match: {'courseID' : courseID}},
                    {$project: {
                        _id: 0,
                        courseTime: 1,
                        tutorial: {
                            $filter: {
                                input: '$tutorialInfo',
                                as: 'tutorial',
                                cond: { $eq: ['$$tutorial.tutorialID', user.enrolledCourse[i].tutorialID]}  //need to input user.enrolledCourse[i].tutorialID
                            }
                        }
                    }}
                ])
                return course
            }
    
            async function checkTimeClash(array){
                let occupiedTimeSlot = [];
                let timeClashed = false;
                for(i = 0; i < array.length; i++){
                    const course = await getCourseInfo(array[i].courseID)
                    let courseTimeSlot = []
                    if(course[0].tutorial.length == 0){
                        courseTimeSlot = course[0].courseTime
                    }else{
                        courseTimeSlot = course[0].courseTime.concat(course[0].tutorial[0].tutorialTime)
                    }
                    occupiedTimeSlot = occupiedTimeSlot.concat(courseTimeSlot)
                }
                
                for (i = 0; i < goingToBeEnrolledCourse[0].courseTime.length; i++){
                    //console.log(goingToBeEnrolledCourse[0].courseTime[i])
                    const Clashed = occupiedTimeSlot.some(el => el === goingToBeEnrolledCourse[0].courseTime[i])
                    if (Clashed){
                        timeClashed = true;
                        break;
                    }
                }
                
                if(!timeClashed && goingToBeEnrolledCourse[0].tutorial.length != 0){
                    //console.log(goingToBeEnrolledCourse[0].tutorial[0].tutorialTime[0])
                    
                    const Clashed = occupiedTimeSlot.some(el => el === goingToBeEnrolledCourse[0].tutorial[0].tutorialTime[0])
                    if (Clashed){
                        timeClashed = true;
                    }
                }
                
                return timeClashed;
            }

            function checkPrerequisiteAndForbidden(userCmpletedCourseArray){
                let unfulfilled = false;
                //console.log(userCmpletedCourseArray)
                
                if(goingToBeEnrolledCourse[0].forbiddenCourseID.length != 0){
                    for (i = 0; i < goingToBeEnrolledCourse[0].forbiddenCourseID.length; i++){
                        const forbidden = userCmpletedCourseArray.some(el => el.courseID === goingToBeEnrolledCourse[0].forbiddenCourseID[i])
                        if (forbidden){
                            unfulfilled = true;
                            break;
                        }
                    }
                }

                if(!unfulfilled && goingToBeEnrolledCourse[0].prerequisiteCourseID.length != 0){
                    for (i = 0; i < goingToBeEnrolledCourse[0].prerequisiteCourseID.length; i++){
                        //console.log(goingToBeEnrolledCourse[0].prerequisiteCourseID[i])
                        const fulfilled = userCmpletedCourseArray.some(el => el.courseID === goingToBeEnrolledCourse[0].prerequisiteCourseID[i])
                        //console.log("fulfilled: " + fulfilled)
                        if (!fulfilled){
                            unfulfilled = true;
                            break;
                        }
                    }
                }
                
               return unfulfilled;
            }

            let userEnrolledCredit = await getUserEnrolledCredit(user.enrolledCourse); //need to input user.enrolledCourse
            //console.log(userEnrolledCredit);

            let TimeClashed = await checkTimeClash(user.enrolledCourse); // need to input user.enrolledCourse
            //console.log(TimeClashed)

            let unfulfillRequirement = checkPrerequisiteAndForbidden(user.completedCourse)
            //console.log(unfulfillRequirement);
            
            if(goingToBeEnrolledCourse[0].enrolledID.length == goingToBeEnrolledCourse[0].courseCapacity){ 
                return res.status(400).send({success: false, error: "Course is full already"})
            }else if(userEnrolledCredit == user.maxCredit){ 
                return res.status(400).send({success: false, error: "User reached max credit already"})
            }else if(TimeClashed){
                return res.status(400).send({success: false, error: "The course has a time clash with your current timetable"})
            }else if(unfulfillRequirement){
                return res.status(400).send({success: false, error: "User either studied forbidden course or not fulfilled prerequisite course"})
            }else{
                User.updateOne({username},{$pull : {shoppingCartCourse : {courseID : courseID}}})
                .then(() => {
                    User.updateOne({username},{$push: {enrolledCourse: {courseID:courseID, tutorialID:tutorialID}}})
                    .then(()=> {
                        Course.updateOne({courseID : courseID},{$push: {enrolledID : user.userID}})
                        .then(()=> {
                            Course.updateOne({courseID : courseID, "tutorialInfo.tutorialID" : tutorialID},{$push: {"tutorialInfo.$.enrolledID" : user.userID}})
                            .then(() => {
                                res.send({success: true, error: 'Successful to enroll'})
                            })
                        })
                    })
                })
                .catch(error => res.json(error))
            }
        })
    })
    .catch(error => res.json({error}))    
})

router.put('/enrolledCourse/drop', (req,res)=> {
    const {courseID, tutorialID} = req.body;
    const username = verifyToken(req.cookies.jwt)

    User.findOne({username})
    .then(user => {
        User.updateOne(
            {username},
            {$pull : {enrolledCourse : {courseID : courseID}}}
        )
        .then(() => {
            Course.updateOne({courseID : courseID},{$pull: {enrolledID : user.userID}})
            .then(()=> {
                Course.updateOne({courseID : courseID, "tutorialInfo.tutorialID" : tutorialID},{$pull: {"tutorialInfo.$.enrolledID" : user.userID}})
                .then(() => {
                    res.send({success: true, error: 'Successful to drop'})
                })
                .catch(error => res.json(error))
            })
            .catch(error => res.json(error))
        })
        .catch(error => res.json(error))
    })
    .catch(error => res.json(error))
})

router.put('/comment/add', (req,res)=>{
    const {courseID, comment} = req.body;

    Course.updateOne({courseID}, {$push: {comment: comment}})
    .then(()=>{
            res.send({success: true, error: 'Comment added successfully'})
        })
    .catch(error => res.json({error}))
})

router.put('/comment/remove', (req,res)=>{
    const {courseID,comment} = req.body;

    Course.findOne({courseID})
    .then(course => {
        const found = course.comment.some(el =>  el === comment)
        if(!found){
            return res.status(400).send({success: false, error: "Comment not found"})
        }else{
            Course.updateOne(
                {courseID},
                {$pull : {comment : comment}}
            )
            .then(() => {
                res.send({success: true, error: 'Comment removed from course'})
            })
            .catch(error => res.json(error))
        }
    })
    .catch(error => res.json({error}))
})



module.exports = router