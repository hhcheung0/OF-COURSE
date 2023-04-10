const { Router } = require('express');
const router = Router();

// require models
const Course = require('../Models/CourseModel')
const User = require('../Models/UserModel')

// require tools
const { adminCheck } = require('../Tools/authTools')

// USER

// get an array of all users
router.get('/admin/user', adminCheck, (req, res) => {
    User.find().sort('userID')
    .then(userArray => {
        if (!userArray) return res.json({success: false, error: 'User array is empty'})
        return res.json({success: true, userArray})
    })
    .catch(error => res.json({error}))
});
// get a specific user
router.get('/admin/user/:userID', (req, res) => {
    User.findOne(req.params)
    .then(user => {
        if (!user) return res.json({error: 'User is not found'})
        return res.json(user)
    })
    .catch(error => res.json({error}))
});

// userID, username, password, accessRight, maxCredit, 
// enrolledCourse, completedCourse, shoppingCartCourse

// create an user
// ???
// DEFAULT VALUE FOR MAXCREDIT ??? (LINE 52)
router.post('/admin/user/create', (req, res) => {
    if (req.body['username'] == null) {
        res.send("Username cannot be empty.");
    }
    else if (req.body['password'] == null) {
        res.send("Password cannot be empty.");
    }
    User.find({username: req.body['username']})
    .then(existUser => {
        if (existUser) {
            res.send("User already exists.")
        }
        User.create({
                username: req.body['username'],
// ???
                password: bcrypt.hashSync(req.body['password'], 10) // hashing?
// ???
                //, accessRight ???
                //, maxCredit: 18
        })
        .then(() => {
            res.send("User created successfully.");
        })
    })
    .catch(error => res.json({error}))
});

// update an user (username & password only)
router.post('/admin/user/updateUser', (req, res) => {
    User.findOneAndUpdate({username: req.body['username']}, {
        username: req.body['username'],
// ???
        password: bcrypt.hashSync(req.body['password'], 10) // hashing?
    })
    .then(() => {
        res.send("User data updated successfully.");
    })
    .catch(error => res.json({error}))
});

// userID, username, password, accessRight, maxCredit, 
// enrolledCourse, completedCourse, shoppingCartCourse

// ???
// update an user's course info (add/create OR delete)
// add/create course (Enrolled Courses/Shopping Cart/Completed Courses )
router.post('/admin/user/update/addCourse', (req, res) => {
    User.findOneAndUpdate({username: req.body['username']}, {
        // add
    })
    .then(() => {

    })
    .catch(error => res.json({error}))
});

// delete course (Enrolled Courses/Shopping Cart/Completed Courses)
router.post('/admin/user/update/deleteCourse', (req, res) => {
    User.findOneAndUpdate({username: req.body['username']}, {
        // delete
    })
    .then(() => {

    })
    .catch(error => res.json({error}))
});

// delete an user
router.post('/admin/user/delete', (req, res) => {
    User.findOneAndDelete({username})
    .then(() => {
        res.send("Deleted user: " + username);
    })
    .catch(error => res.json({error}))
});


// COURSE

// get an array of all courses
router.get('/admin/course', (req, res) => {
    Course.find().sort('courseID')
    .then(courseArray => {
        if (!courseArray) return res.json({error: 'Course array is empty'})
        return res.json(courseArray)
    })
    .catch(error => res.json(error))
});

// get a specific course
router.get('/admin/course/:courseID', (req, res) => {
    Course.findOne(req.params)
    .then(course => {
        if (!course) return res.json({error: 'Course is not found'})
        return res.json(course)
    })
    .catch(error => res.json({error}))
});

// courseID, courseName, courseTime, courseLocation, department, instructor, courseCapacity, 
// enrolledID, prerequisiteCourseID, forbiddenCourseID, credit, tutorialInfo, outline, comment

// create a course
router.post('/admin/course/create', (req, res) => {
    Course.findOne({courseID: req.body['courseID']})
    .then(existCourse => {
        if (existCourse) {
            res.send("User already exists.");
        }
        Course.create({
            courseID: req.body['courseID'],
            courseName: req.body['courseName'],
// ???
            courseTime: [req.body['courseTime']], // how to store into an array?
            courseLocation: req.body['courseLocation'],
            instructor: req.body['instructor'],
            department: req.body['department'],
            courseCapacity: req.body['courseCapacity'],
            prerequisiteCourseID: [req.body['prerequisiteCourseID']], // an array
            forbiddenCourseID: [req.body['forbiddenCourseID']], // an array
            credit: req.body['credit'],
            outline: req.body['outline'],
// ???
            tutorialInfo: [req.body['tutid'], req.body['tuttime'], req.body['tutloc'], req.body['tutor'], req.body['tutcap']] 
            // Tutorial form info. into one object arr??ay
        })
        .then(() => {
            res.send("Course created successfully.");
        })
    })
    .catch(error => res.json({error}))
});

// update a course
router.post('/admin/course/update', (req, res) => {
    Course.findOneAndUpdate({courseID: req.body['courseID']}, {
        courseID: req.body['courseID'],
        courseName: req.body['courseName'],
// ???
        courseTime: [req.body['courseTime']], // how to store into an array?
        courseLocation: req.body['courseLocation'],
        instructor: req.body['instructor'],
        department: req.body['department'],
        courseCapacity: req.body['courseCapacity'],
        prerequisiteCourseID: [req.body['prerequisiteCourseID']], // an array
        forbiddenCourseID: [req.body['forbiddenCourseID']], // an array
        credit: req.body['credit'],
        outline: req.body['outline'],
// ???
        tutorialInfo: [req.body['tutid'], req.body['tuttime'], req.body['tutloc'], req.body['tutor'], req.body['tutcap']] 
        // Tutorial form info. into one object arr??ay
    })
    .then(() => {
        res.send("Course data updated successfully.");
    })
    .catch(error => res.json({error}))
});

// delete a course
router.post('/admin/course/delete', (req, res) => {
    Course.findOneAndDelete({courseID: req.body['courseID']})
    .then(course => {
        if (!course) return res.send("Course not found.")
        res.send("Delete course: " + courseName)
    })
    .catch(error => res.json({error}))
});


module.exports = router