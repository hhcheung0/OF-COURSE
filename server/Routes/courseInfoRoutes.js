const {Router} = require('express')
const bcrypt = require('bcrypt')

const Course = require('../Models/CourseModel')

const router = Router()

router.post('/courseInfo/:courseName',(req,res) =>{
    try{
        const courseName = req.params.courseName;
        const course = Course.findOne({courseName});
        console.log(course);
    }catch (error){
        console.error(error);
        res.send({message: "Error fetching Course Info"});
    }


})