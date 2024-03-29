const { Router } = require('express');
const bcrypt = require('bcrypt')
const router = Router();

// Required models
const Course = require('../Models/CourseModel')
const User = require('../Models/UserModel')

// Required tools
const { adminCheck } = require('../Tools/authTools')

// USER
// Get an array of all users
router.get('/admin/user', adminCheck, (req, res) => {
    User.find().sort('userID')
    .then(userArray => {
        if (!userArray) return res.json({success: false, error: 'User array is empty'})
        return res.json({success: true, userArray})
    })
    .catch(error => res.json({error}))
});

// Get a specific user
router.get('/admin/user/:userID', (req, res) => {
    User.findOne(req.params)
    .then(user => {
        if (!user) return res.json({error: 'User is not found'})
        return res.json(user)
    })
    .catch(error => res.json({error}))
});

// Create an user
router.post('/admin/user', adminCheck, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body['password'], 10);
      const existUser = await User.find({ username: req.body.username });
      if (existUser.length) {
        await User.updateOne(
            { username: req.body['username'] },
            {
                password: hashedPassword,
                accessRight: req.body.accessRight,
            }
        );

        return res.json({ success: true, message: 'User successfully updated' });

      } else {
        const users = await User.find().sort({userID: -1});
        await User.create({
            userID: users[0].userID + 1,
            username: req.body.username,
            password: hashedPassword,
            accessRight: req.body.accessRight,
            maxCredit: 18,
            enrolledCourse: [],
            completedCourse: [],
            shoppingCartCourse: [],
            icon: 1,
        });
        return res.json({ success: true, message: 'User successfully created' });
      }
    } catch (error) {
      console.error(error);
      return res.json({ success: false, error: error.message });
    }
  });

// Delete an user by username
router.delete('/admin/user', adminCheck, (req, res) => {
    User.deleteOne({username: req.body.username})
    .then((result) => {
        // Delete request can not be recognized
        if (!result.acknowledged) return res.json({success: false, message: "unknown error"})
        // If nothing is deleted
        else if (!result.deletedCount) return res.json({success: false, message: "No user is found"})
        else return res.json({success: true, message: 'Successfully deleted user'})
    })
})

// Add course into user's array
router.put('/admin/user/addCourse', adminCheck, (req, res) => {
    Course.findOne({courseID: req.body.courseID})
    .then((course) => {
        if (!course) return res.json({success: false, message: 'Course is not found'})
        User.updateOne({userID: req.body.userID}, {
            $push: {[req.body.arrayName]: req.body.arrayName === 'completedCourse'? {courseID: course.courseID, grade: req.body.residual}: {courseID: course.courseID, tutorialID: req.body.residual}}
        })
        .then((result) => {
            if (!result.acknowledged) return res.json({success: false, message: "unknown error"})
            else if (!result.matchedCount) return res.json({success: false, message: "user is not found"})
            else if (!result.modifiedCount) return res.json({success: false, message: "cannot update user"})
            else return res.json({success: true, message: "Successfully added course to user"})
        })
    })
})

// Remove course from user's array
router.put('/admin/user/removeCourse', adminCheck, (req, res) => {
    Course.findOne({courseID: req.body.courseID})
    .then(course => {
        if (!course) return res.json({success: false, message: 'Course is not found'})
        User.updateOne({userID: req.body.userID}, {
            $pull: {[req.body.arrayName]: {courseID: req.body.courseID}}
        })
        .then((result) => {
            if (!result.acknowledged) return res.json({success: false, message: "unknown error"})
            else if (!result.matchedCount) return res.json({success: false, message: "user is not found"})
            else if (!result.modifiedCount) return res.json({success: false, message: "cannot update user"})
            else return res.json({success: true, message: "Successfully removed course from user"})
        })
    })
})

// Update an user (username & password only)
router.post('/admin/user/updateUser', (req, res) => {
    User.findOneAndUpdate({username: req.body['username']}, {
        username: req.body['username'],
        password: bcrypt.hashSync(req.body['password'], 10) // hashing?
    })
    .then(() => {
        res.send("User data updated successfully.");
    })
    .catch(error => res.json({error}))
});

// userID, username, password, accessRight, maxCredit, 
// enrolledCourse, completedCourse, shoppingCartCourse

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
router.post('/admin/course', adminCheck, (req, res) => {
    Course.findOne({courseID: req.body['courseID']})
    .then(existCourse => {
        if (existCourse) {
            return res.json({success: true, message: "Course already exists."});
        }
        Course.create(req.body)
        .then((course) => {
            if (!course) return res.json({success: false, message: 'unknown error'})
            else return res.json({success: true, message: "Course created successfully."});
        })
        .catch(message => res.json({success:false, message}))
    })
});

router.put('/admin/course', adminCheck, (req, res) => {
    let course = req.body;
    
    if(course.tutorialInfo.length == 0){
        Course.updateOne({
            "courseID" : course.courseID,
        }, {
            "$set" : {
                "courseID" : course.courseID,
                "courseName" : course.courseName,
                "courseTime" : course.courseTime,
                "courseLocation" : course.courseLocation,
                "department" : course.department,
                "instructor" : course.instructor,
                "courseCapacity" : course.courseCapacity,
                "prerequisiteCourseID" : course.prerequisiteCourseID,
                "forbiddenCourseID" : course.forbiddenCourseID,
                "credit" : course.credit,
                "outline" : course.outline
            }
        })
        .then(result => {
            if (!result) return res.json({success: false, message: 'unknown error'})
            else return res.json({success: true, message: "Course updated successfully."});
        })
    }else{
        Course.findOne({
            "courseID" : course.courseID,
            "tutorialInfo" : {
                "$elemMatch" : {
                    "tutorialID" : course.tutorialInfo[0].tutorialID
                }
            }
        })
        .then(tutorialExisted => {
            if(tutorialExisted){
                if(course.tutorialInfo[0].tutorialCapacity == 0){
                    Course.updateOne(
                        {"courseID" : course.courseID},
                        {
                            "$set" : {
                                "courseID" : course.courseID,
                                "courseName" : course.courseName,
                                "courseTime" : course.courseTime,
                                "courseLocation" : course.courseLocation,
                                "department" : course.department,
                                "instructor" : course.instructor,
                                "courseCapacity" : course.courseCapacity,
                                "prerequisiteCourseID" : course.prerequisiteCourseID,
                                "forbiddenCourseID" : course.forbiddenCourseID,
                                "credit" : course.credit,
                                "outline" : course.outline
                            },
                            "$pull" : {
                                "tutorialInfo" : {
                                    "tutorialID" : course.tutorialInfo[0].tutorialID
                                }
                            }
                        }
                    )
                    .then(result => {
                        if (!result) return res.json({success: false, message: 'unknown error'})
                        else return res.json({success: true, message: "Course updated with deleting tutorial successfully."});
                    })
                    .catch(error => res.json(error))
                }else{
                    Course.updateOne({
                        "courseID" : course.courseID,
                        "tutorialInfo.tutorialID" : course.tutorialInfo[0].tutorialID
                    }, {
                        "$set" : {
                            "courseID" : course.courseID,
                            "courseName" : course.courseName,
                            "courseTime" : course.courseTime,
                            "courseLocation" : course.courseLocation,
                            "department" : course.department,
                            "instructor" : course.instructor,
                            "courseCapacity" : course.courseCapacity,
                            "prerequisiteCourseID" : course.prerequisiteCourseID,
                            "forbiddenCourseID" : course.forbiddenCourseID,
                            "credit" : course.credit,
                            "outline" : course.outline,
                            "tutorialInfo.$.tutorialID" : course.tutorialInfo[0].tutorialID,
                            "tutorialInfo.$.tutorialTime" : course.tutorialInfo[0].tutorialTime,
                            "tutorialInfo.$.tutorialLocation" : course.tutorialInfo[0].tutorialLocation,
                            "tutorialInfo.$.tutor" : course.tutorialInfo[0].tutor,
                            "tutorialInfo.$.tutorialCapacity" : course.tutorialInfo[0].tutorialCapacity,
                        }
                    })
                    .then(result => {
                        if (!result) return res.json({success: false, message: 'unknown error'})
                        else return res.json({success: true, message: "Course updated with updating tutorial successfully."});
                    })
                }
            }else{
                Course.updateOne({
                    "courseID" : course.courseID,
                }, {
                    "$set" : {
                        "courseID" : course.courseID,
                        "courseName" : course.courseName,
                        "courseTime" : course.courseTime,
                        "courseLocation" : course.courseLocation,
                        "department" : course.department,
                        "instructor" : course.instructor,
                        "courseCapacity" : course.courseCapacity,
                        "prerequisiteCourseID" : course.prerequisiteCourseID,
                        "forbiddenCourseID" : course.forbiddenCourseID,
                        "credit" : course.credit,
                        "outline" : course.outline
                    },
                    "$addToSet" : {
                        "tutorialInfo" : {
                            "tutorialID" : course.tutorialInfo[0].tutorialID,
                            "tutorialTime" : course.tutorialInfo[0].tutorialTime,
                            "tutorialLocation" : course.tutorialInfo[0].tutorialLocation,
                            "tutor" : course.tutorialInfo[0].tutor,
                            "tutorialCapacity" : course.tutorialInfo[0].tutorialCapacity,
                            "enrolledID" : []
                        }
                    }
                })
                .then(result => {
                    if (!result) return res.json({success: false, message: 'unknown error'})
                    else return res.json({success: true, message: "Course updated with adding tutorial successfully."});
                })
            }
        })
    }
});

router.delete('/admin/course', adminCheck, (req, res) => {
    Course.deleteOne({courseID: req.body.courseID})
    .then((result) => {
        // delete request can not be recognized
        if (!result.acknowledged) return res.json({success: false, message: "unknown error"})
        // if nothing is deleted
        else if (!result.deletedCount) return res.json({success: false, message: "No course is found"})
        else return res.json({success: true, message: 'Successfully deleted course'})
    })
})

// update a course
router.post('/admin/course/update', (req, res) => {
    Course.findOneAndUpdate({courseID: req.body['courseID']}, {
        courseID: req.body['courseID'],
        courseName: req.body['courseName'],
        courseTime: [req.body['courseTime']], // to store into an array
        courseLocation: req.body['courseLocation'],
        instructor: req.body['instructor'],
        department: req.body['department'],
        courseCapacity: req.body['courseCapacity'],
        prerequisiteCourseID: [req.body['prerequisiteCourseID']], // an array
        forbiddenCourseID: [req.body['forbiddenCourseID']], // an array
        credit: req.body['credit'],
        outline: req.body['outline'],
        tutorialInfo: [req.body['tutid'], req.body['tuttime'], req.body['tutloc'], req.body['tutor'], req.body['tutcap']] 
        // Tutorial form info. into one object array
    })
    .then(() => {
        res.send("Course data updated successfully.");
    })
    .catch(error => res.json({error}))
});

module.exports = router