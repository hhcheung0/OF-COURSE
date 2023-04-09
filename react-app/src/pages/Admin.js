import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate} from "react-router-dom";

// import custom hooks
// import useCourse from '../hooks/useCourse'
// import useTime from '../hooks/useTime'

import UserPanel from "../components/UserPanel";
import CoursePanel from "../components/CoursePanel";

const Admin = () => {
//     // const [userID] = useState("");
//     // const [username, setUsername] = useState("");
//     // const [password, setPassword] = useState("");
//     // const [user, setUser] = useState("");    // const [enrolledCourseID] = useState("");
//     // // const [shoppingCartCourseID] = useState("");
//     // // const [passedCourseID] = useState(""); // Completed Courses
    // const [activeTab, setActiveTab] = useState("userPanelTab");
    const [activeTab, setActiveTab] = useState("coursePanelTab");
    
    return (
    <div id="full-page-tab">
        <div className="tab-buttons">
            <button className={activeTab === "userPanelTab" ? "active" : ""} onClick={() => setActiveTab("userPanelTab")}>
                User Information
            </button>
            <button className={activeTab === "coursePanelTab" ? "active" : ""} onClick={() => setActiveTab("coursePanelTab")}>
                Course Information
            </button>
        </div>
        <div className="tab-content">
            {activeTab === "userPanelTab" && <UserPanel />}
            {activeTab === "coursePanelTab" && <CoursePanel />}
        </div>
    </div>
    );
};
export default Admin;

//     // // get user info from DB
//     // const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);  

// const UserSearchBar = (props) => {
//     const handleChange = (e) => {
//         props.controller(e.target.value)
//         setuser(e.target.value)
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