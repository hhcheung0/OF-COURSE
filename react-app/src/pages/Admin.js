import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate} from "react-router-dom";

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'

const Admin = () => {
//     // const [userID] = useState("");
//     // const [username, setUsername] = useState("");
//     // const [password, setPassword] = useState("");
//     // const [user, setUser] = useState("");    // const [enrolledCourseID] = useState("");
//     // // const [shoppingCartCourseID] = useState("");
//     // // const [passedCourseID] = useState(""); // Completed Courses

//     // // get user info from DB
//     // const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);  
    return (
        <div>
            <UserPanel />
            {/* <CoursePanel /> */}
        </div>
    )
}

// const UserSearchBar = (props) => {
//     const handleChange = (e) => {
//         props.controller(e.target.value)
//         setSearch(e.target.value)
//     }
//     const [search, setSearch] = useState('')
//     return (
//         <div id='search-bar'>
//             <div>Search</div>
//             <input
//                 type="text"
//                 onChange={handleChange}
//                 value={search}
//             />
//         </div>
//     )
// }

const UserPanel = () => {

    // const columnDefs = [
    //     {field: 'User ID'},
    //     {field: 'Username'},
    //     {field: ''},
    //     {field: ''},
    // ];
    return(
        <div class="row">
            <div class="column">
                <div class="centered">
                    <h3>Search <input type="text"></input> </h3>
                    <table id='user-table'>
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
                
                <form method="post">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username"/>
                    <br/>

                    <label for="userpw">Password</label>
                    <input type="text" id="userpw" name="password"/>
                    <br/>

                    <div id='toggle-button-panel'>
                        <div>
                            <input type="radio" name="course-toggle" id="student" value={true} />
                            <label htmlFor="student">Student</label>
                            <input type="radio" name="course-toggle" id="admin" value={false} default />
                            <label htmlFor="admin">Admin</label>
                        </div>
                    </div>

                    <input type="submit" value="Add/Update" />
                    <br/>
                    </form>

                </div>
            </div>
                {/* <table style={{marginBottom: '10px'}} id="username"> */}

            <div class="column">
                <div class="centered">
                    <h3>Username: Mary</h3>

                        <div>
                        <h3>Enrolled Courses</h3>
                        <table id='user-enrolled'>
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

                        <h3>Shopping Cart</h3>
                        <table id='user-shoppingcart'>
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


                        <h3>Completed Courses</h3>
                        <table id='user-completed'>
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
                        </table>

                        <h3>Add Courses <input type="text"></input> </h3>
                        <input type="text"></input>
                        <table id='user-addcourse'>
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
                        <button>Add</button>
                        </div>  

                </div>
            </div>

        </div>
    )
}

// const CoursePanel = () => {
//     return(
//         <div>
//             <h1>Hi</h1>
//         </div>
//     )
// }

export default Admin;