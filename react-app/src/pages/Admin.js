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
        <>
            <div class="userLeft">
                <div class="centered">

                    <h4>Search <input type="text"></input> </h4>
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

            <div class="userRight">
                <div class="centered">

                </div>
            </div>
        </>
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