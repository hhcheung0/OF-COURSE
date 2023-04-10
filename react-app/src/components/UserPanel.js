// ADMIN PAGE
import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import { BsTrash3} from 'react-icons/bs';

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'
import useUser from "../hooks/useUser";
import useEnroll from "../hooks/useEnroll";


const UserPanel = () => {

    return (
        <div id="admin-user">
        <div className="row">

{/* Left side of the userPanel */}
{/* admin-userLeft */}
            <div className="column" id="admin-userLeft">
                    <br></br>
{/* userSearchbar */}
                    <h3 id="userSearchbar">Search  <input type="text"></input> </h3>
{/* userTable */}
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
                    </table>
                <br></br>
                <br></br>
{/* userForm */}
                <div className="container" id="userForm">
                <form method="post">
                    <p><label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username"/></p>
                    <br/>

                    <p><label htmlfor="password">Password</label>
                    <input type="text" id="password" name="password"/></p>
                    <br/>

                    <div id='toggle-button-panel'>
                            <input type="radio" name="course-toggle" id="Student" value={true} />
                            <label htmlFor="Student">Student</label>
                            <input type="radio" name="course-toggle" id="Admin" value={false} default />
                            <label htmlFor="Admin">Admin</label>
                    </div>
                    <button>Add/Update</button>
                    {/* <input type="submit" value="Add/Update" /> */}
                    <br/>
                </form>
                </div>
            </div>

{/* Right-side of the userPanel */}
{/* admin-userRight */}
            <div className="column" id="admin-userRight">
                    <User />
{/* userCourseTable */}
                    <div id="userCourseTable" className="container">
                        <UserCourseTable />
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
                                <tr>
                                    <td>BIOL2410</td>
                                    <td>Applications of Biology</td>
                                    <td>3</td>
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
                                <tr>
                                    <td>ARCH2110</td>
                                    <td>Advanced Architectural studies</td>
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
                                    <th>Semester</th>
                                    <th>Credit</th>
                                    <th>Grade</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>GEOG2350</td>
                                    <td>Recent History of Geography</td>
                                    <td>2021-2022 Sem 1</td>
                                    <td>3</td>
                                    <td>A</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                                <tr>
                                    <td>CHEM3860</td>
                                    <td>Recent History of Chemistry</td>
                                    <td>2021-2022 Sem 1</td>
                                    <td>3</td>
                                    <td>A</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                            </tbody>
                        </table> */}
                        <br></br>

{/* addCourseCategory */}
                        <div id="addCourseCategory">
                            <h3>Add Courses</h3>
                            <select name="addCourseCategory">
                            <option value="enrolledCourses">Enrolled Courses</option>  
                            <option value="shoppingCart">Shopping Cart</option>
                            <option value="passedCourses">Completed Courses</option>
                            </select> 
                            <input type="text"></input>
                        </div>
                            <h5>Completed Course Grade:
                            <input type="text"></input></h5>
                        
{/* userCourseTable-add */}
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
                                <tr>
                                    <td>PHIL2410</td>
                                    <td>Advanced Philosophy</td>
                                    <td>Fri 8:30-10:15</td>
                                    <td>CML Room 1</td>
                                    <td>20</td>
                                </tr>
                            </tbody>
                        </table>
                        <button id="add-button">Add</button>
                        {/* <input type="submit" id="submit-button" value="Add" style={{float: "right"}}/> */}
                    </div>  
            </div>
        </div>
        </div>
    );
}

const User = () => {
    const [username, setUsername] = useState('')
    const { getUserByToken } = useUser()

    useEffect(() => {
        const { username } = getUserByToken()
        setUsername(username)
    }, [getUserByToken])

    return(
        <h3>Username: {username}</h3>   
    )
}

const UserCourseTable = () => {
    const [ enrolledCourse, setEnrolledCourse ] = useState([])
    const [ completedCourse, setCompletedCourse ] = useState([])
    const [ shoppingCartCourse, setShoppingCartCourse] = useState([])
    const { getUserByToken } = useUser()

    // const [ courseName, setCourseName ] = useState('');
    // const [ credit, setCredit ] = useState();

    const handleEnrolledCourseChange = (e) => { console.log(e.target.id); setEnrolledCourse(e.target.value); }
    const handleCompletedCourse = (e) => { console.log(e.target.id); setCompletedCourse(e.target.value); }
    const handleShoppingCartCoure = (e) => { console.log(e.target.id); setShoppingCartCourse(e.target.value); }

    // const handleCourseNameChange = (e) => { console.log(e.target.id); setCourseName(e.target.value); }
    // const handleCreditChange = (e) => {console.log(e.target.id); setCredit(e.target.value); }

    useEffect(() => {
        const { enrolledCourse, completedCourse, shoppingCartCourse } = getUserByToken()
        setEnrolledCourse(enrolledCourse)
        setCompletedCourse(completedCourse)
        setShoppingCartCourse(shoppingCartCourse)
    }, [getUserByToken])
    
    return(
        <>
            <h3>Enrolled Courses</h3>
{/* userCourseTable-enrolled */}
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
                    {enrolledCourse && enrolledCourse.map((enrolled, idx) => (
                        <EnrolledTableRow enrolledCourse={enrolled.courseID} enrolledTutorial={enrolled.tutorialID} key={idx}/>
                    ))}
                    </tbody>
                </table>
                <br></br>

                <h3>Shopping Cart</h3>
{/* userCourseTable-shoppingCart */}
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
                    {shoppingCartCourse && shoppingCartCourse.map((shoppingCart, idx) => (
                        <ShoppingCartTableRow 
                            shoppingCartCourse={shoppingCart.courseID} 
                            shoppingCartTutorial={shoppingCart.tutorialID} 
                            key={idx}
                        />
                    ))}
                    </tbody>
                </table>
                <br></br>


                <h3>Completed Courses</h3>
{/* userCourseTable-completed */}
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
                    {completedCourse && completedCourse.map((completed, idx) => (
                        <CompletedTableRow completedCourse={completed.courseID} completedGrade={completed.grade} key={idx}/>
                    ))}
                    </tbody>
                </table>
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

export default UserPanel