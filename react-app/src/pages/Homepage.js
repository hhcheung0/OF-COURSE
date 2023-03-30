import React, { useState } from "react";
import CourseTab from "../components/CourseTab";
import TimetableTab from "../components/TimetableTab";

const Homepage = () => {
    const [activeTab, setActiveTab] = useState("courseTab");
  
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
          {activeTab === "timetableTab" && <TimetableTab />}
        </div>
      </div>
    );
};

export default Homepage;