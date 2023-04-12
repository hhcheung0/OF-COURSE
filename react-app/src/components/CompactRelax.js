import { useState, useEffect, useCallback, useMemo } from "react"

// import custom hooks
import useConstant from "../hooks/useConstant"
import useEnroll from '../hooks/useEnroll';

const CompactRelax = ({courseArray}) =>{
    const { weekdayList, classTimeList, TimetableColorList } = useConstant()
    const [courses, setCourses] = useState([])
    const [timetableArray, setTimetableArray] = useState([...new Array(10).fill([...new Array(5).fill({})])])
    const {swap} = useEnroll()

    // This function write the class time into the timetable array
    const writeIntoArray = useCallback((courseArray) => {
        courseArray.forEach(({courseID, tutorialID}, colorIndex) => {
            // get the course
            const course = courses.find(course => course.courseID === courseID)

            // if there is no course, return (usually in first render)
            if (!course) return

            // write the course time
            const courseTimeArray = course.courseTime
            courseTimeArray.forEach((timecode) => {
                // j is the row to change and i is the column to change
                const j = Number(timecode[1])
                const i = weekdayList.map(weekday => weekday[0]).indexOf(timecode[0])

                // set the corresponding timeslot into {courseID, type, location}
                setTimetableArray(prev => prev.map((row, idx) => (idx !== j? row: (
                    row.map((element, idx) => (idx !== i? element: {
                        courseID,
                        type: 'LEC',
                        location: course.courseLocation,
                        color: colorIndex
                    }))
                ))))
            })

            // write the tutorial time
            if (tutorialID === null) return
            const tutorial = course.tutorialInfo.find(tutorial => tutorial.tutorialID === tutorialID)
            tutorial.tutorialTime.forEach((timecode) => {
                // j is the row to change and i is the column to change
                const j = Number(timecode[1]) 
                const i = weekdayList.map(weekday => weekday[0]).indexOf(timecode[0])
                
                // set the corresponding timeslot into {courseID, type, location}
                setTimetableArray(prev => prev.map((row, idx) => (idx !== j? row: (
                    row.map((element, idx) => (idx !== i? element: {
                        courseID,
                        type: tutorial.tutorialID,
                        location: course.courseLocation,
                        color: colorIndex
                    }))
                ))))
            })
        })
    }, [weekdayList, courses])

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

    
    const compactMode = () =>{
        //currDistance and currArray shows the distance and array currently selected
        let currDistance = timetableDistance()
        let currArray = timetableArray 

        courseArray.forEach(({courseID, tutorialID}) => {
            // get the course
            const course = courses.find(course => course.courseID === courseID)
            console.log(timetableArray)
            console.log(currArray)
            // if there is no course, return (usually in first render)
            if (!course) return             
            
            console.log(course.tutorialInfo)

            //only try to compare timetableDistance if the course has more than one tutorial
            if(course.tutorialInfo.length>1)
                course.tutorialInfo.forEach((tutorial) =>{
                    //try to swap a new time
                    if(tutorialID !== tutorial.tutorialID){
                        console.log(tutorial)
                        swap(courseID,tutorialID,courseID,tutorial.tutorialID)
                        console.log(timetableDistance())
                        console.log(currDistance)
                    }


                    
                })


        })
        
    }
    useEffect(() => {
        writeIntoArray(courseArray)
    }, [courseArray, writeIntoArray])

    return(
        <button onClick={()=>compactMode()}>Compact Mode</button>
    )

}
export default CompactRelax