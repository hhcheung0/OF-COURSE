import { useState, useEffect } from 'react'

const useCourse = (courseID) => {
    const [courseArray, setCourseArray] = useState([])
    const [course, setCourse] = useState({})

    // fetch all course data from server and store at "courseArray"
    useEffect(() => {
        fetch(`http://localhost:3001/data/course/${courseID? courseID: ''}`)
        .then(res => res.json())
        .then(json => {
            if (!json) return
            else if (Array.isArray(json)) return setCourseArray(json)
            else return setCourse(json)
        })
    }, [courseID, setCourse, setCourseArray])
    
    return {
        courseArray,
        course
    }
}

export default useCourse