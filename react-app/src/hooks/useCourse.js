import { useState, useEffect } from 'react'

const useCourse = (courseID) => {
    const [courseArray, setCourseArray] = useState([])
    const [course, setCourse] = useState({})
    const [filter, setFilter] = useState({classTime: [], department: [], weekday: []})
    const [search, setSearch] = useState('')
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

    // Retrieve the array from courseArray and apply filter and store in filtered CourseArray
    // This function is called whenever filter is updated
    useEffect(() => {
        // helper function for returning boolean that whether the course satisfy the filter
        // (course) => bool
        const departmentFilter = (course) => {
            if (!filter.department.length) return true
            else return filter.department.includes(course.department)
        }
        // Determining whether the course satisfy the class time filter
        // (course) => bool
        const classTimeFilter = (course) => {
            if (!filter.classTime.length) return true
            else return filter.classTime.every(value => course.courseTime.some(time => time[1] === value))
        }
        const weekdayFilter = (course) => {
            if (!filter.weekday.length) return true
            else return filter.weekday.every(value => course.courseTime.some(time => time[0] === value))
        }
        setFilteredCourseArray(courseArray.filter(course => departmentFilter(course) && classTimeFilter(course) && weekdayFilter(course)))
    }, [courseArray, filter])

    // function for searching keywords in courseID and courseName
    const searchArray = (courseArray) => {
        if (!course) return courseArray
        return courseArray.filter(course => course.courseID.toLowerCase().includes(search.toLowerCase()) || course.courseName.toLowerCase().includes(search.toLowerCase()))
    }

    // get function for retrieving either the filtered or whole course array
    const getCourse = () => {
        if (Object.values(filter).some(array => array.length)) return searchArray(filteredCourseArray)
        else return searchArray(courseArray)
    }
    
    return {
        setFilter,
        setSearch,
        getCourse,
        course
    }
}

export default useCourse