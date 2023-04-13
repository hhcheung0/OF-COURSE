const { Router } = require('express')
const router = Router()

const Course = require('../Models/CourseModel')
const User = require('../Models/UserModel')

const { checkUser, verifyToken } = require('../Tools/authTools')

const weekdayList = [
    ['M', 'Monday'],
    ['T', 'Tuesday'],
    ['W', 'Wednesday'],
    ['H', 'Thursday'],
    ['F', 'Friday']
]

const writeCourseIntoArray = (allCourses, courseArray, target) => {

    // For each of the course in enrolledCourse
    courseArray.forEach(({courseID}, colorIndex) => {
        // get the course
        const course = allCourses.find(course => course.courseID === courseID)

        // if there is no course, return (safety escape)
        if (!course) return

        // write the course time
        const courseTimeArray = course.courseTime
        courseTimeArray.forEach((timecode) => {
            // j is the row to change and i is the column to change
            const j = Number(timecode[1])
            const i = weekdayList.map(weekday => weekday[0]).indexOf(timecode[0])

            // set the corresponding timeslot into {courseID, type, location}
            target[j][i] = {
                courseID,
                type: 'LEC',
                location: course.courseLocation,
                color: colorIndex
            }
        })
    })
    return target
}
const getTutorialCombination = (allCourses, courseArray) => {
    // reference: https://stackoverflow.com/questions/53311809/all-possible-combinations-of-a-2d-array-in-javascript
    function combos(list, n = 0, result = [], current = []){
        if (n === list.length) result.push(current)
        else list[n].forEach(item => combos(list, n+1, result, [...current, item]))
     
        return result
    }
    
    let array = []
    // For each of the course in enrolledCourse
    courseArray.forEach(({courseID}, colorIndex) => {
        // get the course
        const course = allCourses.find(course => course.courseID === courseID)

        // if there is no course, return (safety escape)
        if (!course) return

        // if no tutorial, skip
        if (!course.tutorialInfo.length) return
        // return the modified tutorialInfo
        array.push(course.tutorialInfo.map((tutorial) => ({
            time: tutorial.tutorialTime,
            courseID: course.courseID,
            type: tutorial.tutorialID,
            location: tutorial.tutorialLocation,
            color: colorIndex
        })))
    })

    return combos(array)
}
const bruteForce = (target, tutorialCombination, scoringAlgorithm) => {
    const best = []
    for (const combination of tutorialCombination) {
        const copy = target.map(row => row.map(ele => ele))
        // write the tutorial time
        for (const tutorial of combination) {
            // j is the row to change and i is the column to change
            const {time, ...obj} = tutorial
            const j = Number(time[0][1]) 
            const i = weekdayList.map(weekday => weekday[0]).indexOf(time[0][0])
            
            if (Object.keys(copy[j][i]).length)
            // set the corresponding timeslot into {courseID, type, location}
            copy[j][i] = obj
            
        }
        console.log('one',copy)
    }
    return best
}
const timetableDistance = () =>{
    //outputs the distance criterion of a given timetableArray
    //smaller value means courses more tightly packed (compact mode)
    //larger value means courses more loosely packed (relax mode)
    let totalDistance = 0

    for(let day = 0; day < 5; day++){
        for(let hour = 0; hour < 10; hour++){
            const currentCourse = timetableArray[hour][day]
            let currentDistance=10;
            // If the current cell is empty, skip it
            if (Object.keys(currentCourse).length === 0) continue;

            //If the class is lecture, skip it
            if (currentCourse.type === "LEC") continue;
            
            //consider tutorials, see the closest distance with another course
            for (let nexthour = 0; nexthour < 10; nexthour++){
                
                //only consider times different from itself
                if(nexthour === hour) continue;
                //if the other cell is empty skip it
                const nextCourse = timetableArray[nexthour][day]
                if (Object.keys(nextCourse).length === 0) continue;
                
                currentDistance = Math.min(currentDistance,Math.abs(nexthour-hour))
            }
            totalDistance += currentDistance
        }
    }
    return totalDistance
}

const compactTimetable = async (courseArray) => {
    let timetableArray = Array(10).fill().map(() => Array(5).fill({}))
    const courses = await Course.find()

    writeCourseIntoArray(courses, courseArray, timetableArray)
    const tutorialCombination = getTutorialCombination(courses, courseArray)
    bruteForce(timetableArray, tutorialCombination, timetableDistance)
    return tutorialCombination
}

router.get('/timetable/mode/compact', async (req, res) => {
    const username = verifyToken(req.cookies.jwt)
    const user = await User.findOne({username})
    const result = await compactTimetable(user.enrolledCourse)
    return res.json(result)
})

module.exports = router