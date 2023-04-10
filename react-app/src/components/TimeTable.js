import { useState, useEffect, useCallback, useMemo } from "react"

// import custom hooks
import useConstant from "../hooks/useConstant"

const Timetable = ({courseArray}) => {
    const { weekdayList, classTimeList, TimetableColorList } = useConstant()
    const [courses, setCourses] = useState([])
    const [timetableArray, setTimetableArray] = useState([...new Array(10).fill([...new Array(5).fill({})])])

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

    // This variable stores a 2D array of <td> elements
    const elementArray = useMemo(() => {
        // for checking whether consecutive timeslot is from the same course
        const isEqual = (course1, course2) => {
            return course1.courseID === course2.courseID && course1.type === course2.type
        }
        const result = []
        for (const j in timetableArray) {
            const tableRow = []
            for (const i in timetableArray[j]) {
                const course = timetableArray[j][i]
                if (Object.keys(course).length) {

                    // if the course is not the starting element, do not push anything
                    if (timetableArray[j-1] && isEqual(course, timetableArray[j-1][i]))
                        continue
                    // function for calculating the index of row te course end
                    const calEndRow = (course, j) => {
                        if (timetableArray[j] && isEqual(course, timetableArray[j][i])) return calEndRow(course, j+1)
                        else return j
                    }
                    const endRow = calEndRow(course, Number(j)+1)

                    tableRow.push(
                        <td key={i} rowSpan={endRow - j} style={{background: TimetableColorList[course.color]}}>
                            <div>{`${course.courseID} [${course.type}]`}</div>
                            <div>{`${course.location}`}</div>
                        </td>
                    )
                }
                else {
                    tableRow.push(<td key={i}></td>)
                }
            }
            result.push(tableRow)
        }
        return result
    }, [timetableArray, TimetableColorList])

    // fetch the courses array manually, I can't solve the infinite re-rendering
    useEffect(() => {
        fetch(`http://localhost:3001/data/course/`)
        .then(res => res.json())
        .then(json => {
            if (!json) return
            else if (Array.isArray(json)) return setCourses(json)
        })
    }, [setCourses])

    useEffect(() => {
        writeIntoArray(courseArray)
    }, [courseArray, writeIntoArray])

    return (
        <table id="homepage-timetable">
        <thead>
        <tr>
            <th></th>
            {weekdayList.map(weekday => weekday[1]).map((weekday, idx) => (
                <th key={idx} >{weekday}</th>
            ))}
        </tr>
        </thead>
        <tbody>
            {elementArray.map((row, j) => (
                <tr key={j}>
                    <td style={{ background: '#277582', color: 'white' }}>{classTimeList[j]}</td>
                    {row}
                </tr>
            ))}
        </tbody>
    </table>
    )
}

export default Timetable