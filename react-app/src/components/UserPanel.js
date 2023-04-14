// ADMIN PAGE
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import { BsTrash3 } from 'react-icons/bs';

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'
import useUser from "../hooks/useUser";
import useEnroll from "../hooks/useEnroll"
import useAdmin from "../hooks/useAdmin";


const UserPanel = () => {
    const { getCourse, setSearch } = useCourse();
    const { parseTimecodeArray } = useTime();
    const [course, setCourse] = useState({});
    const { getUserArray, setSearchString, removeCourseFromUser } = useAdmin();
    const [user, setUser] = useState({});
    // This state is for controlling which array when adding course for user
    const [targetArrayName, setTargetArrayName] = useState('enrolledCourse')
    // For storing input grade
    const [grade, setGrade] = useState('')

    const handleSelect = useCallback((e) => {
        setTargetArrayName(e.target.value)
    }, [])

    return (
        <div id="admin-user">
            <div className="row">

                {/* Left side of the userPanel */}
                {/* admin-userLeft */}
                <div className="column" id="admin-userLeft">
                    <br></br><br></br>
                    {/* userSearchbar */}
                    <UserSearchBar controller={setSearchString} />
                    {/* userTable */}
                    <UserTable userArray={getUserArray()} controller={setUser} />
                    <br></br>
                    {/* userForm */}
                    <UserForm user={user}/>
                </div>

                {/* Right-side of the userPanel */}
                {/* admin-userRight */}
                <div className="column" id="admin-userRight">
                    <User user={user} />
                    {/* userCourseTable */}
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

                            
                            {targetArrayName == "completedCourse" ? 
                            <div>
                                <h5>Completed Course Grade:</h5>
                                <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)}></input>
                            </div> : <div></div>}
                        </div>

                        {/* userCourseTable-add */}
                        <CourseAddTable courseArray={getCourse()} arrayName={targetArrayName} grade={grade} user={user} />
                        {/* <table id='userCourseTable-add'>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Time</th>
                                    <th>Location</th>
                                    <th>Capacity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PHIL2410</td>
                                    <td>Advanced Philosophy</td>
                                    <td>Fri 8:30-10:15</td>
                                    <td>CML Room 1</td>
                                    <td>20</td>
                                </tr>
                            </tbody>
                        </table> */}
                        {/* <button id="add-button">Add</button> */}
                        {/* <input type="submit" id="submit-button" value="Add" style={{float: "right"}}/> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

// left side of the page
const UserSearchBar = (props) => {
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
                        <UserTableRow user={user} key={idx} controller={controller} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
const UserTableRow = ({ user, controller }) => {
    const { deleteUser } = useAdmin();
    const [username, setUsername] = useState('')

    useEffect(() => {
        setUsername(user.username)
    }, [username, user])

    return (
        <>
            {user &&
                <tr>
                    <td> {user.userID} </td>
                    <td> {user.username} </td>
                    <td><button id="showUser" onClick={() => controller(user)}>Show</button></td>
                    <td><button id="deleteUser" onClick={() => {if(window.confirm("Confirm to delete user?")){deleteUser(username)}}}>🗑Delete</button></td>
                </tr>
            }
        </>
    )
}

const UserForm = ({user}) => {
    const { createOrUpdateUser } = useAdmin()

    const [ formType, setFormType ] = useState('Add');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [accessRight, setAccessRight] = useState(null)

    const handleClear = (e) => {
        e.preventDefault()

        setUsername('')
        setPassword('')
        setAccessRight('')
        setFormType('Add')
        //console.log(outline)
    }


    useEffect(() => {
        if(user.username){
            console.log(user.username)
            setFormType('Update')
        }
        setUsername(user.username)
        setAccessRight(user.accessRight)
    }, [user])

    const handleUsernameChange = (e) => { console.log(e.target.id); setUsername(e.target.value); }
    const handlePasswordChange = (e) => { console.log(e.target.id); setPassword(e.target.value); }
    const handleAccessRightChange = (e) => { console.log(e.target.id); setAccessRight(e.target.value)}

    useEffect(() => {
        console.log(accessRight)
    }, [accessRight])

    return (
        <>
            <div className="container" id="userForm">
                <form>
                    <p><label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} disabled={formType==="Update" ? true : false}/></p>
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
                    <button className="btn1" onClick={() => createOrUpdateUser({ username: username, password: password, accessRight: accessRight })}>{formType==="Update" ? "Update" : "Add"}</button>
                    <button className="btn2" onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </>
    )
}


// right side of the page
const User = ({ user }) => {
    const [username, setUsername] = useState('')
    useEffect(() => {
        setUsername(user.username)
    }, [user])

    return (
        <h3>{username ? `Username: ${username}` : "Please select a user from the table"} </h3>

    )
}

const UserCourseTable = ({ user, remover }) => {
    const [enrolledCourse, setEnrolledCourse] = useState({})
    const [completedCourse, setCompletedCourse] = useState({})
    const [shoppingCartCourse, setShoppingCartCourse] = useState({})
    // const [ enrolledCourseID, setEnrolledCourseID ] = useState('')
    // const [ enrolledTutorialID, setEnrolledTutorialID ] = useState('')
    // const [ shoppingCartCourseID, setShoppingCartCourseID ] = useState('')
    // const [ shoppingCartTutorialID, setShoppingCartTutorialID ] = useState('')
    // const [ completedCourseID, setCompletedCourseID ] = useState('')
    // const [ grade, setGrade] = useState()
    const [enrolledCourseIndex, setEnrolledCourseIndex] = useState(null)
    const [shoppingCartIndex, setShoppingCartCourseIndex] = useState(null)
    const [completedCourseIndex, setCompletedCourseIndex] = useState(null)

    const handleEnrolledCourseChange = (e) => { console.log(e.target.id); setEnrolledCourse(e.target.value); }
    const handleCompletedCourse = (e) => { console.log(e.target.id); setCompletedCourse(e.target.value); }
    const handleShoppingCartCourse = (e) => { console.log(e.target.id); setShoppingCartCourse(e.target.value); }
    // const handleEnrolledCourseIDChange = (e) => { console.log(e.target.id); setEnrolledCourseID(e.target.value); }
    // const handlenrolledTutorialIDChange = (e) => { console.log(e.target.id); setEnrolledTutorialID(e.target.value); }
    // const handleShopingCartCourseIDChange = (e) => { console.log(e.target.id); setShoppingCartCourseID(e.target.value); }
    // const handleShoppingCartTutorialIDChange = (e) => { console.log(e.target.id); setShoppingCartTutorialID(e.target.value); }
    // const handleCompletedCourseIDChange = (e) => { console.log(e.target.id); setCompletedCourseID(e.target.value); }
    // const handleGradeChange = (e) => { console.log(e.target.id); setGrade(e.target.value); }

    // useEffect(() => {
    //     return
    //     setEnrolledCourse({})
    //     setCompletedCourse({})
    //     setShoppingCartCourse({})
    // }, [enrolledCourse, completedCourse, shoppingCartCourse, user])

    const handleRemove = useCallback((arrayName, courseID) => {
        remover(user.userID, arrayName, courseID)
    }, [remover, user])

    useEffect(() => {
        // const { enrolledCourse, completedCourse, shoppingCartCourse } = getUserByToken()
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

    // useEffect(() => {
    // //     if (user === {})
    // //     return
    // //     setEnrolledCourse([])
    // //     setCompletedCourse([])
    // //     setShoppingCartCourse([])
    // if (!user.enrolledCourse || !user.completedCourse || !user.shoppingCartCourse) return
    // set
    // }, [enrolledCourse, completedCourse, shoppingCartCourse, user])

    return (
        <>
            <h3>Enrolled Courses</h3>
            {/* userCourseTable-enrolled */}
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
                            <EnrolledTableRow enrolledCourse={enrolled.courseID} key={idx} remover={handleRemove} />
                        ))}
                    </tbody>
                </table>
                <br></br>
            </div>
            <h3>Shopping Cart</h3>
            {/* userCourseTable-shoppingCart */}
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
                            <CompletedTableRow completedCourse={completed.courseID} completedGrade={completed.grade} key={idx} remover={handleRemove} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const EnrolledTableRow = ({ enrolledCourse, remover }) => {
    const { course } = useCourse(enrolledCourse);

    return (
        <>
            {course &&
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    <td><button onClick={() => { if(window.confirm("Confirm to drop course?")){remover('enrolledCourse', course.courseID)} }}><BsTrash3 />Drop</button></td>
                </tr>
            }
        </>
    )
}

const ShoppingCartTableRow = ({ shoppingCartCourse, remover }) => {
    const { course } = useCourse(shoppingCartCourse);

    return (
        <>
            {course &&
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    <td><button onClick={() => { if(window.confirm("Confirm to remove course?")){remover('shoppingCartCourse', course.courseID)} }}><BsTrash3 /> Remove</button></td>
                </tr>
            }
        </>
    )
}

const gpaToGrade = {
    4.3: 'A+', 4.0: 'A', 3.7: 'A-',
    3.3: 'B+', 3.0: 'B', 2.7: 'B-',
    2.3: 'C+', 2.0: 'C', 1.7: 'C-',
    1.0: 'D', 0.0: 'F'
};

const CompletedTableRow = ({ completedCourse, completedGrade, remover }) => {
    const { course } = useCourse(completedCourse)

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
                    <td><button onClick={() => { if(window.confirm("Confirm to delete course?")){remover('completedCourse', course.courseID)} }}><BsTrash3 /> Delete</button></td>
                </tr>
            }
        </>
    )
}


const SearchBar = (props) => {
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
                        <CourseAddTableRow course={course} key={idx} arrayName={arrayName} grade={grade} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
const CourseAddTableRow = ({ course, arrayName, grade, user }) => {
    // For storing selected tutorial
    const [tutorialID, setTutorialID] = useState(course.tutorialInfo.length ? 'T01' : '')
    const { parseTimecodeArray } = useTime()
    const { addCourseToUser } = useAdmin()

    const handleSelect = useCallback((e) => {
        setTutorialID(e.target.value)
    }, [])

    const handleAddToUser = useCallback((e) => {
        // return if no user selected
        if (!Object.keys(user).length) return alert('No user is selected!')
        // return if add to completed course array but no grade provided
        if (arrayName === 'completedCourse' && !grade.length) return alert('Please add grade for this function!')
        if (grade.length) addCourseToUser(user.userID, arrayName, course.courseID, Number(grade))
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