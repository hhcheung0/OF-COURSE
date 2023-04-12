import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const useAdmin = () => {
    const [userArray, setUserArray] = useState([])
    const [searchString, setSearchString] = useState('')
    const navigate = useNavigate()

    // fetch userArray at first render
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

    // returning a searched user array
    const getUserArray = useCallback(() => {
        if (!searchString.length) return userArray
        else return userArray.filter(user => (String(user.userID) === searchString || user.username.toLowerCase().includes(searchString.toLowerCase())))
    }, [userArray, searchString])

    // create an user, user: {username: String, password: String, accessRight: Boolean}
    // createUser({username: "admin", password:"admin", accessRight: true})
    const createUser = useCallback((user) => {
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

    // delete an user, username: String
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

    // add a course into user's array
    // if add to complete course array: addCourseToUser(userID, completedCourse, courseID, grade)
    // if others: addCourseToUser(userID, completedCourse, courseID)
    const addCourseToUser = useCallback((userID, arrayName, courseID, ...grade) => {
        fetch('http://localhost:3001/admin/user/addCourse', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({userID, arrayName, courseID, ...grade})
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) navigate(0)
            alert(json.message)
        })
    }, [navigate])

    // create a course, course: {
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

    // delete a course by courseID
    const deleteCourse = useCallback((courseID) => {
        fetch('http://localhost:3001/admin/course', {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(courseID)
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
        createUser,
        deleteUser,
        addCourseToUser,
        createCourse,
        deleteCourse
    }
}

export default useAdmin