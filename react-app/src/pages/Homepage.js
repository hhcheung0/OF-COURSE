import React, { useState } from "react";

const Homepage = () => {
    const [activeTab, setActiveTab] = useState("courseTab");
  
    return (
      <div id="full-page-tab">
        <div className="tab-buttons">
          <button
            className={activeTab === "courseTab" ? "active" : ""}
            onClick={() => setActiveTab("courseTab")}
          >
            Courses
          </button>
          <button
            className={activeTab === "timetableTab" ? "active" : ""}
            onClick={() => setActiveTab("timetableTab")}
          >
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

function CourseTab() {
    return (
      <div>
        <h1>Course</h1>
      </div>
    );
  }
  
  function TimetableTab() {
    return (
      <div>
        <h1>Timetable</h1>
      </div>
    );
  }

export default Homepage;