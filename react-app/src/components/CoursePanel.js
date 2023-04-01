// ADMIN PAGE

// import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate} from "react-router-dom";

const CoursePanel = () => {
    return (
        <div id="admin-course">
            <div class="row">
{/* courseSearchbar */}
                <h3 id="courseSearchbar">Search <input type="text"></input> </h3>
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
                    <div id="courseForm">
                        <form method="post">
{/* Left side of the form - Lecture*/}
                        <div class="column" id="left">
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
                        </div>
                        
                        <input type="submit" value="Add/Update" />
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
                    <button><Link to="/course">Course Information Page</Link></button>
                </div>
            </div>

        </div>
    );
}

export default CoursePanel