const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseID: {type: String, required: true, unique: true},
    courseName: {type: String, required: true, unique: true},
    courseTime: [{type: String, required: true}],
    courseLocation: {type: String, required: true},
    department: {type: String, required: true},
    instructor: {type: String, required: true},
    courseCapacity: {type: Number, required: true},
    enrolledID: [{type: Number, required: true}],
    prerequisiteCourseID: [{type: String, required: true}],
    forbiddenCourseID: [{type: String, required: true}],
    credit: {type: Number, required: true},
    tutorialInfo: [{type: Object}],
    outline: {type: String},
    comment: [{type: String, required: true}],
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course