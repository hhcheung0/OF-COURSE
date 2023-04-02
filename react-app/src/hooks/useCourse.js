import { useState, useEffect } from 'react'

// import hooks
import useUser from './useUser'

const useCourse = (courseID) => {
    const [courseArray, setCourseArray] = useState([])
    const [course, setCourse] = useState({})
    const [filter, setFilter] = useState({classTime: [], department: [], weekday: []})
    const [search, setSearch] = useState('')
    const [eligibleToggle, setEligibleToggle] = useState(false)
    const [filteredCourseArray, setFilteredCourseArray] = useState([])

    const { getUserByToken } = useUser()

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

    // function for determining whether a course is eligible by user
    // return true if user choose to show all courses
    // return true if there are no pre-requisite courses or the user has completed the pre-requisite course
    const isEligible = (course) => {
        const { passedCourseID } = getUserByToken()
        if (!passedCourseID) return true
        if (!eligibleToggle) return true
        else return !course.prerequisiteCourseID.length || course.prerequisiteCourseID.some(course => passedCourseID.includes(course))
    }
    // function for searching keywords in courseID and courseName
    const searchArray = (courseArray) => {
        if (!course) return courseArray
        return courseArray.filter(course => course.courseID.toLowerCase().includes(search.toLowerCase()) || course.courseName.toLowerCase().includes(search.toLowerCase()))
    }


    // get function for retrieving either the filtered or whole course array
    // the eligible filter is implemented here
    const getCourse = () => {
        if (Object.values(filter).some(array => array.length)) return searchArray(filteredCourseArray).filter(course => isEligible(course))
        else return searchArray(courseArray).filter(course => isEligible(course))
    }
    
    return {
        setFilter,
        setSearch,
        setEligibleToggle,
        getCourse,
        course
    }
}

export default useCourse