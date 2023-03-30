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
            <CoursePanel />
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
            <div><h4>Search _______________________</h4></div>
            <div id='table-container'>
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
                            <td>Show button</td>
                            <td>Delete button</td>
                        </tr>
                    </tbody>
                </table>
            </div>
                {/* <table style={{marginBottom: '10px'}} id="username"> */}
        </>
    )
}

const CoursePanel = () => {
    return(
        <div>
            <h1>Hi</h1>
        </div>
    )
}