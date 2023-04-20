import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate} from "react-router-dom";

// import custom hooks
// import useCourse from '../hooks/useCourse'
// import useTime from '../hooks/useTime'

import UserPanel from "../components/UserPanel";
import CoursePanel from "../components/CoursePanel";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("userPanelTab");
    
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