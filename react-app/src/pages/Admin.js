import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate} from "react-router-dom";

import UserPanel from "../components/UserPanel";
import CoursePanel from "../components/CoursePanel";

const Admin = () => {
    // Set "userPanelTab" as the default tab when entering the admin page
    const [activeTab, setActiveTab] = useState("userPanelTab");
    
    return (
    // Whole Admin page
    <div id="full-page-tab">
        <div className="tab-buttons">
            {/* First tab: UserPanel Tab (User Information Tab for CRUD actions on User Information) */}
            <button className={activeTab === "userPanelTab" ? "active" : ""} onClick={() => setActiveTab("userPanelTab")}>
                User Information
            </button>
            {/* Second tab: CoursePanel Tab (Course Information Tab for CRUD actions on Course Information) */}
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