// ADMIN PAGE
import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import { BsTrash3} from 'react-icons/bs';

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
    const [ course, setCourse ] = useState({});
    const { getUserArray, setSearchString, createUser, deleteUser } = useAdmin();
    const [ user, setUser ] = useState({});

    return (
        <div id="admin-user">
        <div className="row">

{/* Left side of the userPanel */}
{/* admin-userLeft */}
            <div className="column" id="admin-userLeft">
                    <br></br>
{/* userSearchbar */}
                <UserSearchBar controller={setSearchString} />
{/* userTable */}
                <UserTable userArray={getUserArray()} controller={setUser} /> 
                    {/* <table id='userTable'>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Username</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mary</td>
                                <td><button id="showUser">Show</button></td>
                                <td><button id="deleteUser">🗑Delete</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Bob</td>
                                <td><button id="showUser">Show</button></td>
                                <td><button id="deleteUser">🗑Delete</button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Jason</td>
                                <td><button id="showUser">Show</button></td>
                                <td><button id="deleteUser">🗑Delete</button></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Peter</td>
                                <td><button id="showUser">Show</button></td>
                                <td><button id="deleteUser">🗑Delete</button></td>
                            </tr>
                        </tbody>
                    </table> */}
                <br></br>

{/* userForm */}
                <UserForm />
            </div>

{/* Right-side of the userPanel */}
{/* admin-userRight */}
            <div className="column" id="admin-userRight">
                    <User user={user} />
{/* userCourseTable */}
                    <div id="userCourseTable" className="container">
                        <UserCourseTable user={user} />
                        {/* <h3>Enrolled Courses</h3> */}
{/* userCourseTable-enrolled */}
                        {/* <table id='userCourseTable-enrolled'>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Credit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ARCH4180</td>
                                    <td>Applications of Architectural studies</td>
                                    <td>2</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>

                        <h3>Shopping Cart</h3> */}
{/* userCourseTable-shoppingCart */}
                        {/* <table id='userCourseTable-shoppingCart'>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Credit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ANTH4440</td>
                                    <td>Applications of Anthropology</td>
                                    <td>3</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br> */}


                        {/* <h3>Completed Courses</h3> */}
{/* userCourseTable-completed */}
                        {/* <table id='userCourseTable-completed'>
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
                                <tr>
                                    <td>GEOG2350</td>
                                    <td>Recent History of Geography</td>
                                    <td>3</td>
                                    <td>A</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                            </tbody>
                        </table> */}
                        <br></br>

{/* addCourseCategory */}
                        <div id="addCourseCategory">
                            {/* <div> */}
                                <h3>Add Courses</h3>
                                    <SearchBar controller={setSearch} />
                                <select name="addCourseCategory">
                                    <option value="enrolledCourses">Enrolled Courses</option>  
                                    <option value="shoppingCart">Shopping Cart</option>
                                    <option value="passedCourses">Completed Courses</option>
                                </select> 
                            {/* </div> */}
                            <div>
                                <h5>Completed Course Grade:
                                    <br></br>
                                <input type="text"></input></h5>
                            </div>
                        </div>
                        
{/* userCourseTable-add */}
                        <CourseAddTable courseArray={getCourse()} controller={setCourse} /> 
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

const UserTable = ({userArray, controller}) => {

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
const UserTableRow = ({user, controller}) => {
    const { deleteUser } = useAdmin();
    const [ username, setUsername ] = useState('')

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
                <td><button id="deleteUser" onClick={() => deleteUser(username)}>🗑Delete</button></td>
            </tr>
        }
        </>
    )
}

const UserForm = () => {
    const { createUser } = useAdmin()

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ accessRight, setAccessRight ] = useState()

    const handleUsernameChange = (e) => {console.log(e.target.id); setUsername(e.target.value); }
    const handlePasswordChange = (e) => {console.log(e.target.id); setPassword(e.target.value); }
    const handleAccessRightChange = (e) => {console.log(e.target.id); setAccessRight(e.target.value); }

    useEffect(() => {
        setUsername(username)
        setPassword(password)
        setAccessRight(accessRight)
    }, [username, password, accessRight])

    const handleSubmit = async (e) =>{
        e.preventDefault();
    }

    return(
        <>
            <div className="container" id="userForm">
                <form onSubmit={handleSubmit}>
                    <p><label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" onChange={handleUsernameChange} /></p>
                    <br/>

                    <p><label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handlePasswordChange}/></p>
                    

                    <div id='toggle-button-panel'>
                            <input type="radio" name="accessRight" id="Student" value={true} onChange={handleAccessRightChange} />
                            <label htmlFor="Student">Student</label>
                            <input type="radio" name="accessRight" id="Admin" value={false} onChange={handleAccessRightChange} default />
                            <label htmlFor="Admin">Admin</label>
                    </div>
                    <button onClick={() => createUser({username: username, password: password, accessRight: accessRight})}>Add</button>
                    {/* // createUser({username: "admin", password:"admin", accessRight: true}) */}
                    {/* <input type="submit" value="Add/Update" /> */}
                    
                </form>
                </div>
        </>
    )
}


// right side of the page
const User = ({user}) => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        setUsername(user.username)
    }, [username, user])

    return(
        <h3>Username: {username}</h3>   
    )
}

const UserCourseTable = ({user}) => {
    const [ enrolledCourse, setEnrolledCourse ] = useState({})
    const [ completedCourse, setCompletedCourse ] = useState({})
    const [ shoppingCartCourse, setShoppingCartCourse] = useState({})
    // const [ enrolledCourseID, setEnrolledCourseID ] = useState('')
    // const [ enrolledTutorialID, setEnrolledTutorialID ] = useState('')
    // const [ shoppingCartCourseID, setShoppingCartCourseID ] = useState('')
    // const [ shoppingCartTutorialID, setShoppingCartTutorialID ] = useState('')
    // const [ completedCourseID, setCompletedCourseID ] = useState('')
    // const [ grade, setGrade] = useState()
    const [ enrolledCourseIndex, setEnrolledCourseIndex ] = useState(null)
    const [ shoppingCartIndex, setShoppingCartCourseIndex ] = useState(null)
    const [ completedCourseIndex, setCompletedCourseIndex ] = useState(null)

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

    useEffect(() => {
        // const { enrolledCourse, completedCourse, shoppingCartCourse } = getUserByToken()
        setEnrolledCourse(user.enrolledCourse)
        setCompletedCourse(user.completedCourse)
        setShoppingCartCourse(user.shoppingCartCourse)
        if (!user.enrolledCourse) return
        setEnrolledCourseIndex(user.enrolledCourse.length? 0: null)
        if (!user.completedCourse) return
        setCompletedCourseIndex(user.completedCourse.length? 0: null)
        if (!user.shoppingCartCourse) return
        setShoppingCartCourseIndex(user.shoppingCartCourse.length? 0: null)
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
    
    return(
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
                        <EnrolledTableRow enrolledCourse={enrolled.courseID} enrolledTutorial={enrolled.tutorialID} key={idx}/>
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
                            shoppingCartTutorial={shoppingCart.tutorialID} 
                            key={idx}
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
                        <CompletedTableRow completedCourse={completed.courseID} completedGrade={completed.grade} key={idx}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const EnrolledTableRow = ({enrolledCourse, enrolledTutorial}) => {
    const { course } = useCourse(enrolledCourse);
    const { drop } = useEnroll()
    const [dropTutorial, setDropTutorial] = useState('')

    useEffect(() => { 
        setDropTutorial(enrolledTutorial); 
    }, [enrolledTutorial]); 

    return(
        <>
            {course && 
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    <td><button onClick={() => {drop(course.courseID, dropTutorial); window.location.reload()}}><BsTrash3 /> Drop</button></td>
                </tr>
            }
        </>
    )
}

const ShoppingCartTableRow = ({shoppingCartCourse,shoppingCartTutorial}) => {
    const { parseTimecodeArray } = useTime()
    const { course } = useCourse(shoppingCartCourse);
    const { removeFromCart } = useEnroll()
    //console.log(course)
    //console.log(shoppingCartTutorial)

    return(
        <>
            {course && 
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    <td><button onClick={() => {removeFromCart(course.courseID); window.location.reload()}}><BsTrash3 /> Delete</button></td>
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

const CompletedTableRow = ({completedCourse, completedGrade}) => {
    const { course } = useCourse(completedCourse)
    const { removeFromCompletedCourse } = useEnroll()
    //console.log(course)

    const calculateGrade = (gpa) => {
        return gpaToGrade[gpa] || '';
    }

    return(
        <>
            {course && 
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    <td>{calculateGrade(completedGrade)}</td>
                    <td><button onClick={() => {removeFromCompletedCourse(course.courseID); window.location.reload()}}><BsTrash3 /> Delete</button></td>
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

const CourseAddTable = ({courseArray, controller}) => {

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
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {courseArray && courseArray.map((course, idx) => (
                        <CourseAddTableRow course={course} key={idx} controller={controller} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
const CourseAddTableRow = ({course, controller}) => {
    const { parseTimecodeArray } = useTime()

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
                <td>{course.courseCapacity}</td>
                <td><button id="addCourse">Add</button></td>
            </tr>
        }
        </>
    )
}

export default UserPanel