import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const useAdmin = () => {
    const [userArray, setUserArray] = useState([])
    const [searchString, setSearchString] = useState('')
    const navigate = useNavigate()

    // Fetch userArray at first render
    useEffect(() => {
        fetch('http://localhost:3001/admin/user', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) return alert(json.error)
            else if (json.userArray) return setUserArray(json.userArray)
        })
    }, [])

    // Return a searched userArray
    const getUserArray = useCallback(() => {
        if (!searchString.length) return userArray
        else return userArray.filter(user => (String(user.userID) === searchString || user.username.toLowerCase().includes(searchString.toLowerCase())))
    }, [userArray, searchString])

    // Create/update an user, user: {username: String, password: String, accessRight: Boolean}
    // createOrUpdateUser({username: "admin", password:"admin", accessRight: true})
    const createOrUpdateUser = useCallback((user) => {
        fetch('http://localhost:3001/admin/user', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) alert('Unknown error! Please Try again.')
            else {
                navigate(0)
                alert(json.message)
            }
        })
    }, [navigate])

    // Delete an user, username: String
    // deleteUser("admin")
    const deleteUser = useCallback((username) => {
        fetch('http://localhost:3001/admin/user', {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({username})
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) alert(json.message)
            else {
                navigate(0)
                alert(json.message)
            }
        })
    }, [navigate])

    // Add a course into user's array
    // If add to complete course array: addCourseToUser(userID, completedCourse, courseID, grade)
    // If others: addCourseToUser(userID, completedCourse, courseID, tutorialID)
    const addCourseToUser = useCallback((userID, arrayName, courseID, residual) => {
        fetch('http://localhost:3001/admin/user/addCourse', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({userID, arrayName, courseID, residual})
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) navigate(0)
            alert(json.message)
        })
    }, [navigate])

    // Remove a course from user's array
    const removeCourseFromUser = useCallback((userID, arrayName, courseID) => {
        fetch('http://localhost:3001/admin/user/removeCourse', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({userID, arrayName, courseID})
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) navigate(0)
            alert(json.message)
        })
    }, [navigate])

    // Create a course, course: {
    //     courseID: String,
    //     courseName: String,
    //     courseTime: [String],
    //     courseLocation: String,
    //     instructor: String,
    //     courseCapacity: Number,
    //     enrolledID: [String],
    //     prerequisiteCourseID: [String],
    //     forbiddenCourseID: [String],
    //     credit: Number,
    //     tutorialInfo: [Object: {
        //     tutorialID: String,
        //     tutorialTime: [String],
        //     tutorialLocation: String,
        //     tutor: String,
        //     tutorialCapacity: Number,
        //     enrolledID: [String]
        // }],
    //     outline: String,
    //     comment: [String]
    // }
    const createCourse = useCallback((course) => {
        console.log(course)
        fetch('http://localhost:3001/admin/course', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(course)
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) alert(json.message)
            else {
                navigate(0)
                alert(json.message)
            }
        })
    }, [navigate])

    // Update a course
    const updateCourse = useCallback((course) => {
        fetch('http://localhost:3001/admin/course', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(course)
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) alert(json.message)
            else {
                navigate(0)
                alert(json.message)
            }
        })
    }, [navigate])

    // Delete a course by courseID
    const deleteCourse = useCallback((courseID) => {
        fetch('http://localhost:3001/admin/course', {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({courseID})
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) alert(json.message)
            else {
                navigate(0)
                alert(json.message)
            }
        })
    }, [navigate])
    return {
        setSearchString,
        getUserArray,
        createOrUpdateUser,
        deleteUser,
        addCourseToUser,
        removeCourseFromUser,
        createCourse,
        updateCourse,
        deleteCourse
    }
}

export default useAdmin