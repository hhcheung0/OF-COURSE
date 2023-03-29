import { useState, useEffect } from 'react'

const useCourse = (courseID) => {
    const [courseArray, setCourseArray] = useState([])
    const [course, setCourse] = useState({})
    const [query, setQuery] = useState({})
    const [filter, setFilter] = useState({startingTime: [], department: []})
    const [filteredCourseArray, setFilteredCourseArray] = useState([])

    // fetch all course data from server and store at "courseArray"
    // or fetch a specific course by the courseID argument
    useEffect(() => {
        fetch(`http://localhost:3001/data/course/${courseID? courseID: ''}`)
        .then(res => res.json())
        .then(json => {
            if (!json) return
            else if (Array.isArray(json)) return setCourseArray(json)
            else return setCourse(json)
        })
    }, [courseID, setCourse, setCourseArray])

    useEffect(() => {
        console.log(filteredCourseArray)
    }, [filteredCourseArray])
    useEffect(() => {
        console.log(filter)
    }, [filter])

    useEffect(() => {
        if (!filter.department.length) {
            setFilteredCourseArray(courseArray.filter(course => filter.startingTime.some(value => course.courseTime.some(time => time[1] === value))))
        }
        else if (!filter.startingTime.length) {
            setFilteredCourseArray(courseArray.filter(course => filter.department.includes(course.department)))
        }
        else {
            setFilteredCourseArray(courseArray.filter(course => filter.department.includes(course.department) && filter.startingTime.some(value => course.courseTime.some(time => time[1] === value))))
        }
    }, [courseArray, filter])

    const getCourse = () => {
        if (filter.startingTime.length || filter.department.length) return filteredCourseArray
        else return courseArray
    }
    
    return {
        setFilter,
        getCourse,
        course
    }
}

export default useCourse