import React, { useState, useEffect } from "react";
import CourseTab from "../components/CourseTab";
import TimetableTab from "../components/TimetableTab";

// import custom hooks
import useUser from "../hooks/useUser";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("courseTab");
  const { getUserByToken } = useUser()
  
    return (
      <div id="full-page-tab">
        <div className="tab-buttons">
          <button className={activeTab === "courseTab" ? "active" : ""} onClick={() => setActiveTab("courseTab")}>
            Courses
          </button>
          <button className={activeTab === "timetableTab" ? "active" : ""} onClick={() => setActiveTab("timetableTab")}>
            Timetable
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "courseTab" && <CourseTab />}
          {activeTab === "timetableTab" && <TimetableTab courseArray={getUserByToken().enrolledCourse} />}
        </div>
      </div>
    );
};

export default Homepage;