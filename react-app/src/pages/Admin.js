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

const UserPanel = () => {
    return (
        <div id="admin-user">
        <div class="row">
{/* Left side of the userPanel */}
            <div class="column" id="left">
                    <br></br><br></br>
                    <h3 id="searchbar">Search <input type="text"></input> </h3>
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

                <div id="userForm">
                <form method="post">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username"/>
                    <br/>

                    <label for="userpw">Password</label>
                    <input type="text" id="userpw" name="password"/>
                    <br/>

                    <div id='toggle-button-panel'>
                        <div id="opt">
                            <input type="radio" name="course-toggle" id="studentCreate" value={true} />
                            <label htmlFor="student">Student</label>
                            <input type="radio" name="course-toggle" id="adminCreate" value={false} default />
                            <label htmlFor="admin">Admin</label>
                        </div>
                    </div>

                    <input type="submit" value="Add/Update" />
                    <br/>
                </form>
                </div>
            </div>
                {/* <table style={{marginBottom: '10px'}} id="username"> */}
{/* Right-side of the userPanel */}
            <div class="column" id="right">
            <div>
                    <h3>Username: Mary</h3>
                    <div id="usertable">
                        <h3>Enrolled Courses</h3>
                        <table id='user-enrolled'>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Credit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ARCH4180</td>
                                    <td>Applications of Architectural studies</td>
                                    <td>2</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                                <tr>
                                    <td>BIOL2410</td>
                                    <td>Applications of Biology</td>
                                    <td>3</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>Shopping Cart</h3>
                        <table id='user-shoppingcart'>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Credit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ANTH4440</td>
                                    <td>Applications of Anthropology</td>
                                    <td>3</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                                <tr>
                                    <td>ARCH2110</td>
                                    <td>Advanced Architectural studies</td>
                                    <td>3</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                            </tbody>
                        </table>


                        <h3>Completed Courses</h3>
                        <table id='user-completed'>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Semester</th>
                                    <th>Credit</th>
                                    <th>Grade</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>GEOG2350</td>
                                    <td>Recent History of Geography</td>
                                    <td>2021-2022 Sem 1</td>
                                    <td>3</td>
                                    <td>A</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                                <tr>
                                    <td>CHEM3860</td>
                                    <td>Recent History of Chemistry</td>
                                    <td>2021-2022 Sem 1</td>
                                    <td>3</td>
                                    <td>A</td>
                                    <td><button id="deleteCourse">🗑Delete</button></td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>Add Courses <p>
                            <select name="addCourseCategory" id="addCourseCategory">
                            <option value="enrolledCourses">Enrolled Courses</option>  
                            <option value="shoppingCart">Shopping Cart</option>
                            <option value="passedCourses">Completed Courses</option>
                            </select> 
                            <input type="text"></input> </p>
                        </h3>
                        <table id='user-addcourse'>
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Time</th>
                                    <th>Location</th>
                                    <th>Capacity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PHIL2410</td>
                                    <td>Advanced Philosophy</td>
                                    <td>Fri 8:30-10:15</td>
                                    <td>CML Room 1</td>
                                    <td>20</td>
                                </tr>
                            </tbody>
                        </table>
                        <button>Add</button>
                    </div>  
            </div>
            </div>
        </div>
        </div>
    );
}

const CoursePanel = () => {
    return (
        <div id="admin-course">
            <div class="row">
                <h3 id="searchbar">Search <input type="text"></input> </h3>
            </div>

            <div class="row" id="searchedCourse">
                <table>
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ARCH4180</td>
                            <td>Applications of Architectural studies</td>
                            <td>Tue 16:30-18:15</td>
                            <td>MMW Room 1</td>
                            <td>200</td>
                            <td><button id="deleteCourse">🗑Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
    
            <div class="row">
                    <div id="lectureForm">
                        <form method="post">
                        <div class="column" id="left">
{/* Left side of the form */}
                        <h3>Lecture</h3>
                            <label for="courseid">Course ID</label>
                            <input type="text" id="courseid" name="courseid"/>
                            <br/>

                            <label for="coursename">Course Name</label>
                            <input type="text" id="coursename" name="coursename"/>
                            <br/>

                            <label for="coursetime">Time</label>
                            <input type="text" id="coursetime" name="coursetime"/>
                            <br/>
                            
                            <label for="courseloc">Location</label>
                            <input type="text" id="courseloc" name="courseloc"/>
                            <br/>

                            <label for="courseinst">Instructor</label>
                            <input type="text" id="courseinst" name="courseinst"/>
                            <br/>

                            <label for="coursedep">Department</label>
                            <input type="text" id="coursede[" name="coursedep"/>
                            <br/>

                            <label for="coursecap">Capacity</label>
                            <input type="text" id="coursecap" name="coursecap"/>
                            <br/>

                            <label for="coursepre">Pre-requisite Course(s)</label>
                            <input type="text" id="coursepre" name="coursepre"/>
                            <br/>

                            <label for="courseforb">Forbidden Course(s)</label>
                            <input type="text" id="courseforb" name="courseforb"/>
                            <br/>

                            <label for="coursecred">Credit</label>
                            <input type="text" id="coursecred" name="coursecred"/>
                            <br/>

                            <label for="courseoutl">Outline</label>
                            <input type="text" id="courseoutl" name="courseoutl"/>
                            <br/>
                        </div>

                        <div class="column" id="right">
{/* Right side of the form */}
                        <h3>Tutorial
                            <select name="tutNo" id="tutNo">
                            <option value="one">1</option>  
                            <option value="two">2</option>
                            <option value="three">3</option>
                            </select> 
                        </h3>
                            <label for="tutid">Tutorial ID</label>
                            <input type="text" id="tutid" name="tutid"/>
                            <br/>

                            <label for="tuttime">Time</label>
                            <input type="text" id="tuttime" name="tuttime"/>
                            <br/>
                            
                            <label for="tutloc">Location</label>
                            <input type="text" id="tutloc" name="tutloc"/>
                            <br/>

                            <label for="tutor">Tutor</label>
                            <input type="text" id="tutor" name="tutor"/>
                            <br/>

                            <label for="tutcap">Capacity</label>
                            <input type="text" id="tutcap" name="tutcap"/>
                            <br/>
                        </div>
                        
                        <input type="submit" value="Add/Update" />
                        <br/>

                        </form>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Comment</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>I really enjoyed this course.</td>
                                <td><button id="deleteUser">🗑Delete</button></td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td>FANTASTIC, OFFER MORE CLASSES.</td>
                                <td><button id="deleteUser">🗑Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="column">
                    <h3>To Add Comment:</h3>
                    <br/>
                    <button><Link to="/course">Course Information Page</Link></button>
                </div>
            </div>

        </div>
    );
}

export default Admin;