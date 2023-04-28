// ADMIN PAGE - UserPanel (User Information Tab)

import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import { BsTrash3 } from 'react-icons/bs';

// Import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'
import useUser from "../hooks/useUser";
import useEnroll from "../hooks/useEnroll"
import useAdmin from "../hooks/useAdmin";


const UserPanel = () => {
    // Define various state variables using the useState hook
    // and import the functions from the custom hooks
    const { getCourse, setSearch } = useCourse();
    const { parseTimecodeArray } = useTime();
    const [course, setCourse] = useState({});
    const { getUserArray, setSearchString, removeCourseFromUser } = useAdmin();
    const [user, setUser] = useState({});
    // For controlling which array when adding course for user
    const [targetArrayName, setTargetArrayName] = useState('enrolledCourse')
    // For storing input grade
    const [grade, setGrade] = useState('')

    const handleSelect = useCallback((e) => {
        setTargetArrayName(e.target.value)
    }, [])

    // Render the UserPanel component with different child components, 
    // including UserSearchBar, UserTable, UserForm, User, UserCourseTable, SearchBar, and CourseAddTable
    return (
        <div id="admin-user">
            <div className="row">

                {/* Left side of the userPanel */}
                {/* admin-userLeft */}
                <div className="column" id="admin-userLeft">
                    <br></br><br></br>
                    <UserSearchBar controller={setSearchString} />
                    <UserTable userArray={getUserArray()} controller={setUser} />
                    <br></br>
                    <UserForm user={user} />
                </div>

                {/* Right-side of the userPanel */}
                {/* admin-userRight */}
                <div className="column" id="admin-userRight">
                    <User user={user} />
                    <div id="userCourseTable" className="container">
                        <UserCourseTable user={user} remover={removeCourseFromUser} />
                        <br></br>
                        {/* addCourseCategory */}
                        <div id="addCourseCategory">
                            <h3>Add Courses</h3>
                            <SearchBar controller={setSearch} />
                            <select name="addCourseCategory" value={targetArrayName} onChange={handleSelect}>
                                <option value="enrolledCourse">Enrolled Courses</option>
                                <option value="shoppingCartCourse">Shopping Cart</option>
                                <option value="completedCourse">Completed Courses</option>
                            </select>

                            {targetArrayName === "completedCourse" ?
                                <div>
                                    <h5>Completed Course Grade:</h5>
                                    <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)}></input>
                                </div> : <div></div>}
                        </div>
                        {/* userCourseTable-add */}
                        <CourseAddTable courseArray={getCourse()} arrayName={targetArrayName} grade={grade} user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Left side of the page
// Display a search bar of registered users
const UserSearchBar = (props) => {
    // State variable using the useState hook
    const [searchString, setSearchString] = useState('')

    const handleChange = (e) => {
        props.controller(e.target.value)
        setSearchString(e.target.value)
    }

    return (
        <div id='search-bar'>
            <h3 id="userSearchbar">Search
                <input
                    type="text"
                    onChange={handleChange}
                    value={searchString}
                />
            </h3>
        </div>
    )
}

// Display a table of users
const UserTable = ({ userArray, controller }) => {

    return (
        <div className="row" id="table-user">
            <table id='userTable'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {userArray && userArray.map((user, idx) => (
                        // Render a row for each user using the UserTableRow component
                        <UserTableRow user={user} key={idx} controller={controller} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// Display a row for the user
const UserTableRow = ({ user, controller }) => {
    // Import a custom hook "useAdmin"
    // and a state variable using the useState hook
    const { deleteUser } = useAdmin();
    const [username, setUsername] = useState('')

    useEffect(() => {
        setUsername(user.username)
    }, [username, user])

    return (
        <>
            {user &&
                // Render the row for the user
                <tr>
                    <td> {user.userID} </td>
                    <td> {user.username} </td>
                    {/* "Show" button - display the user's course information on the right side of the page tab */}
                    <td><button id="showUser" onClick={() => controller(user)}>Show</button></td>
                    {/* "Delete" button */}
                    <td><button id="deleteUser" onClick={() => { if (window.confirm("Confirm to delete user?")) { deleteUser(username) } }}>🗑Delete</button></td>
                </tr>
            }
        </>
    )
}

// Display a form of users for Add/Update and Clear
const UserForm = ({ user }) => {
    // Import a custom hook "useAdmin"
    const { createOrUpdateUser } = useAdmin()
    // State variables using the useState hook
    const [formType, setFormType] = useState('Add');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [accessRight, setAccessRight] = useState(null)
    // Called when the admin clicks the "Clear" button
    const handleClear = (e) => {
        e.preventDefault()
        setUsername('')
        setPassword('')
        setAccessRight('')
        setFormType('Add')
        //console.log(outline)
    }
    // Use the useEffect hook to decide when to change the form to "Update", instead of "Add" 
    // and to fetch user data
    useEffect(() => {
        // If the username is selected from the UserTable, 
        // the form will be "Update", and password and/or accessRight of the user can be updated
        if (user.username) {
            console.log(user.username)
            setFormType('Update')
        }
        setUsername(user.username)
        setAccessRight(user.accessRight)
    }, [user])
    // Called when the following (respective) variables change
    const handleUsernameChange = (e) => { console.log(e.target.id); setUsername(e.target.value); }
    const handlePasswordChange = (e) => { console.log(e.target.id); setPassword(e.target.value); }
    const handleAccessRightChange = (e) => { console.log(e.target.id); setAccessRight(e.target.value) }

    useEffect(() => {
        console.log(accessRight)
    }, [accessRight])

    return (
        <>
            <div className="container" id="userForm">
                <form>
                    <p><label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} disabled={formType === "Update" ? true : false} /></p>
                    <br />
                    <p><label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={handlePasswordChange} /></p>
                    <div id='toggle-button-panel'>
                        <input type="radio" name="accessRight" id="Student" value={false} onChange={handleAccessRightChange} />
                        <label htmlFor="Student">Student</label>
                        <input type="radio" name="accessRight" id="Admin" value={true} onChange={handleAccessRightChange} />
                        <label htmlFor="Admin">Admin</label>
                    </div>
                    <div className="column d-flex justify-content-center">
                        {/* "Add" or "Update" button */}
                        <button className="btn1" onClick={() => createOrUpdateUser({ username: username, password: password, accessRight: accessRight })}>{formType === "Update" ? "Update" : "Add"}</button>
                        {/* (Form) "Clear" button */}
                        <button className="btn2" onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </>
    )
}


// Right side of the page
// Display the username 
// (if the user is not selected from the table: "Please select a user from the table")
const User = ({ user }) => {
    // State variables using the useState hook
    const [username, setUsername] = useState('')
    useEffect(() => {
        setUsername(user.username)
    }, [user])

    return (
        <h3>{username ? `Username: ${username}` : "Please select a user from the table"} </h3>
    )
}

// Display Enrolled Courses, Shopping Cart, and Completed Courses of a specific user
const UserCourseTable = ({ user, remover }) => {
    // State variables using the useState hook
    const [enrolledCourse, setEnrolledCourse] = useState({})
    const [completedCourse, setCompletedCourse] = useState({})
    const [shoppingCartCourse, setShoppingCartCourse] = useState({})
    const [enrolledCourseIndex, setEnrolledCourseIndex] = useState(null)
    const [shoppingCartIndex, setShoppingCartCourseIndex] = useState(null)
    const [completedCourseIndex, setCompletedCourseIndex] = useState(null)
    // Called when the following (respective) variables change
    const handleEnrolledCourseChange = (e) => { console.log(e.target.id); setEnrolledCourse(e.target.value); }
    const handleCompletedCourse = (e) => { console.log(e.target.id); setCompletedCourse(e.target.value); }
    const handleShoppingCartCourse = (e) => { console.log(e.target.id); setShoppingCartCourse(e.target.value); }

    const handleRemove = useCallback((arrayName, courseID) => {
        remover(user.userID, arrayName, courseID)
    }, [remover, user])
    // Use the useEffect hook to fetch the user's course data
    useEffect(() => {
        setEnrolledCourse(user.enrolledCourse)
        setCompletedCourse(user.completedCourse)
        setShoppingCartCourse(user.shoppingCartCourse)
        if (!user.enrolledCourse) return
        setEnrolledCourseIndex(user.enrolledCourse.length ? 0 : null)
        if (!user.completedCourse) return
        setCompletedCourseIndex(user.completedCourse.length ? 0 : null)
        if (!user.shoppingCartCourse) return
        setShoppingCartCourseIndex(user.shoppingCartCourse.length ? 0 : null)
    }, [user])

    return (
        <>
            <h3>Enrolled Courses</h3>
            {/* userCourseTable-enrolled */}
            {/* Display a table of user's Enrolled Courses */}
            <div className="row" id="table-courses">
                <table id='userCourseTable-enrolled'>
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Credit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.enrolledCourse && user.enrolledCourse.map((enrolled, idx) => (
                            // Render a row for user's each enrolled course using the EnrolledTableRow component
                            <EnrolledTableRow enrolledCourse={enrolled.courseID} key={idx} remover={handleRemove} />
                        ))}
                    </tbody>
                </table>
                <br></br>
            </div>

            <h3>Shopping Cart</h3>
            {/* userCourseTable-shoppingCart */}
            {/* Display a table of user's Shopping Cart*/}
            <div className="row" id="table-courses">
                <table id='userCourseTable-shoppingCart'>
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Credit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.shoppingCartCourse && user.shoppingCartCourse.map((shoppingCart, idx) => (
                            // Render a row for user's each shopping cart using the ShoppingCartTableRow component
                            <ShoppingCartTableRow
                                shoppingCartCourse={shoppingCart.courseID}
                                key={idx}
                                remover={handleRemove}
                            />
                        ))}
                    </tbody>
                </table>
                <br></br>
            </div>

            <h3>Completed Courses</h3>
            {/* userCourseTable-completed */}
            {/* Display a table of user's Completed Courses */}
            <div className="row" id="table-courses">
                <table id='userCourseTable-completed'>
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Credit</th>
                            <th>Grade</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.completedCourse && user.completedCourse.map((completed, idx) => (
                            // Render a row for user's each completed course using the EnrolledTableRow component and the grade of each course
                            <CompletedTableRow completedCourse={completed.courseID} completedGrade={completed.grade} key={idx} remover={handleRemove} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

// Display a row for user's each enrolled course
const EnrolledTableRow = ({ enrolledCourse, remover }) => {
    // Import a custom hook "useCourse"
    const { course } = useCourse(enrolledCourse);

    return (
        <>
            {course &&
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    {/* "Drop" button to drop the course from the Enrolled Courses table */}
                    {/* Display a confirmation box */}
                    <td><button onClick={() => { if (window.confirm("Confirm to drop course?")) { remover('enrolledCourse', course.courseID) } }}><BsTrash3 />Drop</button></td>
                </tr>
            }
        </>
    )
}

// Display a row for user's each shopping cart course
const ShoppingCartTableRow = ({ shoppingCartCourse, remover }) => {
    // Import a custom hook "useCourse"
    const { course } = useCourse(shoppingCartCourse);

    return (
        <>
            {course &&
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    {/* "Remove" button to remove the course from the Shopping Cart table */}
                    {/* Display a confirmation box */}
                    <td><button onClick={() => { if (window.confirm("Confirm to remove course?")) { remover('shoppingCartCourse', course.courseID) } }}><BsTrash3 /> Remove</button></td>
                </tr>
            }
        </>
    )
}

// Define a constant called "gpaToGrade" to map GPAs to letter grades
const gpaToGrade = {
    4.3: 'A+', 4.0: 'A', 3.7: 'A-',
    3.3: 'B+', 3.0: 'B', 2.7: 'B-',
    2.3: 'C+', 2.0: 'C', 1.7: 'C-',
    1.0: 'D', 0.0: 'F'
};

// Display a row for user's each complete course
const CompletedTableRow = ({ completedCourse, completedGrade, remover }) => {
    // Import a custom hook "useCourse"
    const { course } = useCourse(completedCourse)
    // Map GPAs to letter grades using the "gpaToGrade" constant
    const calculateGrade = (gpa) => {
        return gpaToGrade[gpa] || '';
    }

    return (
        <>
            {course &&
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    <td>{calculateGrade(completedGrade)}</td>
                    {/* "Delete" button to delete the course from the Completed Courses table */}
                    {/* Display a confirmation box */}
                    <td><button onClick={() => { if (window.confirm("Confirm to delete course?")) { remover('completedCourse', course.courseID) } }}><BsTrash3 /> Delete</button></td>
                </tr>
            }
        </>
    )
}

// Display a search bar of courses
const SearchBar = (props) => {
    // State variables using the useState hook
    const [search, setSearch] = useState('')
    const handleChange = (e) => {
        props.controller(e.target.value)
        setSearch(e.target.value)
    }

    return (
        <div id='search-bar'>
            <input
                type="text"
                onChange={handleChange}
                value={search}
            />
        </div>
    )
}

// Display a table of courses to enable add to the user's course information
const CourseAddTable = ({ courseArray, arrayName, grade, user }) => {

    return (
        <div className="row" id='table-container'>
            <table id='userCourseTable-add'>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Tutorial</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {courseArray && courseArray.map((course, idx) => (
                        // Render a row for each course using the CourseAddTableRow component and the tutorial session of the course
                        <CourseAddTableRow course={course} key={idx} arrayName={arrayName} grade={grade} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// Display a row for each course
const CourseAddTableRow = ({ course, arrayName, grade, user }) => {
    // State variable using the useState hook for storing selected tutorial
    const [tutorialID, setTutorialID] = useState(course.tutorialInfo.length ? 'T01' : '')
    // Import custom hooks "useTime" and "useAdmin"
    const { parseTimecodeArray } = useTime()
    const { addCourseToUser } = useAdmin()

    const handleSelect = useCallback((e) => {
        setTutorialID(e.target.value)
    }, [])

    const handleAddToUser = useCallback((e) => {
        // Return if no user is selected
        if (!Object.keys(user).length) return alert('No user is selected!')
        // Return if add to completed course array but no grade provided
        if (arrayName === 'completedCourse' && !grade.length) return alert('Please add grade for this function!')
        // If trying to add a course to Completed Courses, must input grade as well
        if (grade.length) addCourseToUser(user.userID, arrayName, course.courseID, Number(grade))
        // If not trying to add a course to Completed Courses, but to either Enrolled Courses or Shopping Cart
        else addCourseToUser(user.userID, arrayName, course.courseID, tutorialID)
    }, [user, arrayName, course, grade, addCourseToUser, tutorialID])

    return (
        <>
            {course &&
                <tr>
                    <td>
                        {course.courseID}
                    </td>
                    <td>
                        {course.courseName}
                    </td>
                    <td>{parseTimecodeArray(course.courseTime).map((str, idx) => (
                        <div key={idx}>{str}</div>))}
                    </td>
                    <td>{course.courseLocation}</td>
                    <td>{course.courseCapacity - course.enrolledID.length}/{course.courseCapacity}</td>
                    <td>
                        <select name="tutorialID" value={tutorialID} onChange={handleSelect}>
                            {course.tutorialInfo && course.tutorialInfo.map((tutorial, idx) => (
                                <option key={idx} value={tutorial.tutorialID}>{tutorial.tutorialID}</option>
                            ))}
                        </select>
                    </td>
                    <td><button id="addCourse" onClick={handleAddToUser}>Add</button></td>
                </tr>
            }
        </>
    )
}

export default UserPanel