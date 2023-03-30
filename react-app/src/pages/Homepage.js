import React, { useState } from "react";
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

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

const CourseTab = () => {
    return (
        <div id="homepage-course">
          <div id="homepage-course-up">
            <div id = "homepage-course-upperleft">
              <div>
                <h2>Enrolled Courses</h2>
                <table id='homepage-table'>
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Course Name</th>
                      <th></th>
                      <th>Time</th>
                      <th>Location</th>
                      <th>Credit</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>MGNT1040</td>
                      <td>Introduction to Management 1</td>
                      <td>LEC</td>
                      <td>Tue 14:30–16:15</td>
                      <td>MMW Room 1</td>
                      <td>2</td>
                      <th><button>Drop</button></th>
                    </tr>
                    <tr>
                      <td>BIOL2410</td>
                      <td>Applications of Biology</td>
                      <td>LEC</td>
                      <td>Tue 8:30 – 10:15</td>
                      <td>YIA Room 1</td>
                      <td>3</td>
                      <th><button>Drop</button></th>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>T01</td>
                      <td>Fri 9:30 – 10:15</td>
                      <td>YIA Room 1</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id='homepage-table-container'>
                <h2>Shopping Cart</h2>
                <table id ="homepage-table">
                  <thead>
                    <tr>
                        <th></th>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th></th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Credit</th>
                        <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" /></td>
                      <td>MGNT1040</td>
                      <td>Introduction to Management 1</td>
                      <td>LEC</td>
                      <td>Tue 14:30–16:15</td>
                      <td>MMW Room 1</td>
                      <td>2</td>
                      <th><button>Delete</button></th>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>T01</td>
                      <td>Fri 9:30 – 10:15</td>
                      <td>YIA Room 1</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div id ="homepage-course-upperright">
              <h2>Swap Courses</h2>
              <div id="swap-container"> 
                <p>From:</p>
                <select>
                  <option value="">MGNT1040</option>
                  <option value="">MGNT1023</option>
                </select>
                <br/><br/>
                  <BsArrowDown size={70}/>&ensp;<BsArrowUp size={70}/>
                <br/><br/>
                <p>To:</p>
                <select>
                  <option value="">MGNT1041</option>
                  <option value="">BIOL2410</option>
                </select>
                <button>Swap</button>
              </div>
            </div>
          </div>

          <div id='homepage-course-bottom'>
              <h2>Completed Courses</h2>
              <table id ="homepage-table">
                <thead>
                  <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Semester</th>
                    <th>Credit</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GEOG1040</td>
                    <td>Recent History of Geography</td>
                    <td>2021-2022 Sem 1</td>
                    <td>3</td>
                    <td>A</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
    );
  };
  
  
const TimetableTab = () => {
return (
    <>
        <h1>Timetable</h1>
    </>
);
}

export default Homepage;