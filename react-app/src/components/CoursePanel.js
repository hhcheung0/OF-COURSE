// ADMIN PAGE

// import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate} from "react-router-dom";

// COURSE ID should not be manipulative

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
                    <div class="container" id="courseForm">
                        <form method="post">
{/* Left side of the form - Lecture*/}
                        <div class="column" id="left">
                        <h3>Lecture</h3>
                        <div id="courseFormInput">
                            <p><label for="courseid">Course ID</label>
                            <input type="text" id="courseid" name="courseid"/></p>
                            <br/>

                            <p><label for="coursename">Course Name</label>
                            <input type="text" id="coursename" name="coursename"/></p>
                            <br/>

                            <p><label for="coursetime">Time</label>
                            <input type="text" id="coursetime" name="coursetime"/></p>
                            <br/>
                            
                            <p><label for="courseloc">Location</label>
                            <input type="text" id="courseloc" name="courseloc"/></p>
                            <br/>

                            <p><label for="courseinst">Instructor</label>
                            <input type="text" id="courseinst" name="courseinst"/></p>
                            <br/>

                            <p><label for="coursedep">Department</label>
                            <input type="text" id="coursede[" name="coursedep"/></p>
                            <br/>

                            <p><label for="coursecap">Capacity</label>
                            <input type="text" id="coursecap" name="coursecap"/></p>
                            <br/>

                            <p><label for="coursepre">Pre-requisite Course(s)</label>
                            <input type="text" id="coursepre" name="coursepre"/></p>
                            <br/>

                            <p><label for="courseforb">Forbidden Course(s)</label>
                            <input type="text" id="courseforb" name="courseforb"/></p>
                            <br/>

                            <p><label for="coursecred">Credit</label>
                            <input type="text" id="coursecred" name="coursecred"/></p>
                            <br/>

                            <p><label for="courseoutl">Outline</label>
                            <input type="text" id="courseoutl" name="courseoutl"/></p>
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
                            <p><label for="tutid">Tutorial ID</label>
                            <input type="text" id="tutid" name="tutid"/></p>
                            <br/>

                            <p><label for="tuttime">Time</label>
                            <input type="text" id="tuttime" name="tuttime"/></p>
                            <br/>
                            
                            <p><label for="tutloc">Location</label>
                            <input type="text" id="tutloc" name="tutloc"/></p>
                            <br/>

                            <p><label for="tutor">Tutor</label>
                            <input type="text" id="tutor" name="tutor"/></p>
                            <br/>

                            <p><label for="tutcap">Capacity</label>
                            <input type="text" id="tutcap" name="tutcap"/></p>
                            <br/>
                        </div>
                        <input type="submit" class="btn1" value="Add/Update" />
                        <input type="submit" class="btn2" value="Clear" />
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