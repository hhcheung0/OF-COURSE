import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate} from "react-router-dom";

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'

const Admin = () => {
    const [userID] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");    // const [enrolledCourseID] = useState("");
    // const [shoppingCartCourseID] = useState("");
    // const [passedCourseID] = useState(""); // Completed Courses

    // get user info from DB
    const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);
    

    return (
        <div>
            {/* <UserCRUD />
            <CourseCRUD /> */}
            <h1>Admin page content</h1>
        </div>
    )
}