// ADMIN PAGE
import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'
import useUser from "../hooks/useUser";

const CoursePanel = () => {

    const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);
    const { parseTimecodeArray } = useTime();

    return (
        <div id="admin-course">
            <div class="row">
{/* courseSearchbar */}
                <h3 id="courseSearchbar">Search <input type="text"></input></h3>
                
            </div>
{/* courseTable */}
            <div class="row" id="courseTable">
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
{/* courseForm */}                    
                    <div class="container" id="courseForm">
                        <form method="post">
{/* Left side of the form - Lecture*/}
                        <div class="column" id="left">
                        <h3>Lecture</h3>
                            <label for="courseID">Course ID</label>
                            <input type="text" id="courseID" name="courseID" disabled/>
                            <br/>

                            <label for="courseName">Course Name</label>
                            <input type="text" id="courseName" name="courseName"/>
                            <br/>

                            <label for="courseTime">Time</label>
                            <input type="text" id="courseTime" name="courseTime"/>
                            <br/>
                            
                            <label for="courseLocation">Location</label>
                            <input type="text" id="courseLocation" name="courseLocation"/>
                            <br/>

                            <label for="instructor">Instructor</label>
                            <input type="text" id="instructor" name="instructor"/>
                            <br/>

                            <label for="department">Department</label>
                            <input type="text" id="department" name="department"/>
                            <br/>

                            <label for="courseCapacity">Capacity</label>
                            <input type="text" id="courseCapacity" name="courseCapacity"/>
                            <br/>

                            <label for="prerequisiteCourseID">Pre-requisite Course(s)</label>
                            <input type="text" id="prerequisiteCourseID" name="prerequisiteCourseID"/>
                            <br/>

                            <label for="forbiddenCourseID">Forbidden Course(s)</label>
                            <input type="text" id="forbiddenCourseID" name="forbiddenCourseID"/>
                            <br/>

                            <label for="credit">Credit</label>
                            <input type="text" id="credit" name="credit"/>
                            <br/>

                            <label for="outline">Outline</label>
                            <input type="text" id="outline" name="outline"/>
                            <br/>
                        </div>
{/* Right side of the form - Tutorial */}
                        <div class="column" id="right">
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
                        {/* <input type="submit" class="btn1" value="Add/Update" />
                        <input type="submit" class="btn2" value="Clear" /> */}
                        <button class="btn1">Add/Update</button>
                        <button class="btn2">Clear</button>

                        </div>
                        <br/>

                        </form>
                    </div>
            </div>

            <div class="row">
                <div class="column">
{/* courseComment */}
                    <table id="courseComment">
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
{/* courseCommentAdd */}
                <div class="column" id="courseCommentAdd">
                    <h3>To Add Comment:</h3>
                    <br/>
                    <button><Link to="/course">Course Browsing Page</Link></button>
                </div>
            </div>

        </div>
    );
}

export default CoursePanel