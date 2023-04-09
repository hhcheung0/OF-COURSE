// ADMIN PAGE
import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'
import useUser from "../hooks/useUser";


const CoursePanel = () => {

    const { getCourse, setSearch } = useCourse();
    const { parseTimecodeArray } = useTime();
    const [ course, setCourse ] = useState({});

    return (
        <div id="admin-course">
            <div class="row">
{/* courseSearchbar */}
                {/* <h3 id="courseSearchbar">Search <input type="text"></input></h3> */}
                <div id='table-panel'>
                    <SearchBar controller={setSearch} />
                    <CourseTable courseArray={getCourse()} controller={setCourse} /> 
                </div>
            </div>

{/* courseTable */}
            {/* <div class="row" id="courseTable">
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
            </div> */}
            
            <div class="row">
{/* courseForm */}                    
                    <div class="container" id="courseForm">
                        <CourseForm course={course}/>
                        {/* <form method="post"> */}
{/* Left side of the form - Lecture*/}
                        {/* <div class="column" id="left">
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
                        </div> */}
{/* Right side of the form - Tutorial */}
                        {/* <div class="column" id="right">
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
                            <br/> */}
                        {/* <input type="submit" class="btn1" value="Add/Update" />
                        <input type="submit" class="btn2" value="Clear" /> */}
                        {/* <button class="btn1">Add/Update</button>
                        <button class="btn2">Clear</button>

                        </div>
                        <br/>

                        </form> */}
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



const SearchBar = (props) => {
    const [search, setSearch] = useState('')
    
    const handleChange = (e) => {
        props.controller(e.target.value)
        setSearch(e.target.value)
    }

    return (
        <div id='search-bar'>
            <h3>Search</h3>
            <input
                type="text"
                onChange={handleChange}
                value={search}
            />
        </div>
    )
}

const CourseTable = ({courseArray, controller}) => {

    return (
        <div class="row" id='table-container'>
            <table id='course-table'>
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
                    {courseArray && courseArray.map((course, idx) => (
                        <CourseTableRow course={course} key={idx} controller={controller} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const CourseTableRow = ({course, controller}) => {
    const { parseTimecodeArray } = useTime()


    return (
        <>
        {course &&
            <tr>
                <td>
                    <div className='link' onClick={() => controller(course)}>
                        {course.courseID}
                    </div>
                </td>
                <td>
                    <div className='link' onClick={() => controller(course)}>
                        {course.courseName}
                    </div>
                </td>
                <td>{parseTimecodeArray(course.courseTime).map((str, idx) => (
                    <div key={idx}>{str}</div>))}
                </td>
                <td>{course.courseLocation}</td>
                <td>{course.courseCapacity}</td>
                <td><button id="deleteCourse">🗑Delete</button></td>
            </tr>
        }
        </>
    )
}

// const retrieveData = (course) => {
//     course.preventDefault();
//     alert(course.courseID);
//         fetch('http://localhost:3001/:courseID', {
//             method: 'PUT',
//             headers: {'Content-type' : 'application/json'},
//             body: JSON.stringify({
//                 courseID: course.courseID,
//                 courseName: course.courseName,
//                 courseTime: course.courseTime,
//                 courseLocation: course.courseLocation,
//                 department: course.department,
//                 instructor: course.instructor,
//                 courseCapacity: course.courseCapacity,
//                 prerequisiteCourseID: course.prerequisiteCourseID,
//                 forbiddenCourseID: course.forbiddenCourseID,
//                 credit: course.credit,
//                 tutorialInfo: course.tutorialInfo,
//                 outline: course.outline,
//                 comment: course.comment,
//             })
//         })
//         .then(res => res.json())
//         .then(json => console.log(json));
//     }

//     const handleSubmit= (e) =>{
//         e.preventDefault();
//         const formID = e.target.id;
//         console.log(formID);
//         if (formID === "course-info"){
//             fetch('http://localhost:3001/data/addtocart', {
//                 method: 'PUT',
//                 credentials: 'include',
//                 headers: {'Content-type' : 'application/json'},
//                 body: JSON.stringify({
//                     courseID: course.courseID,
//                     tutorialID: tutorialID,
//                     username: username, 
//                 })
//             })
//             .then(res => res.json())
//             .then(json => {

//             })
//             .catch(err => console.error(err));
//         }
//     };

const CourseForm = ({course}) => { // state
    const { parseTimecodeArray } = useTime()
    const [ tutorial, setTutorial] = useState({}); // state, function to adjust the state
    const [ courseName, setCourseName] = useState("");
    console.log(course);
    console.log(course.tutorialInfo);

    return(
        <>
        {/* {course && */}
                    <form method="post">
{/* Left side of the form - Lecture*/}
                        <div class="column" id="left">
                        <h3>Lecture</h3>
                            <label for="courseID">Course ID</label>
                            <input type="text" id="courseID" name="courseID" value={course.courseID} disabled/>
                            <br/>

                            <label for="courseName">Course Name</label>
                            <input type="text" id="courseName" name="courseName" value={courseName}/>
                            <br/>

                            <label for="courseTime">Time</label>
                            <input type="text" id="courseTime" name="courseTime" value={parseTimecodeArray(course.courseTime).join(', ')}/> 
                            <br/>
                            
                            <label for="courseLocation">Location</label>
                            <input type="text" id="courseLocation" name="courseLocation" value={course.courseLocation}/>
                            <br/>

                            <label for="instructor">Instructor</label>
                            <input type="text" id="instructor" name="instructor" value={course.instructor}/>
                            <br/>

                            <label for="department">Department</label>
                            <input type="text" id="department" name="department" value={course.department}/>
                            <br/>

                            <label for="courseCapacity">Capacity</label>
                            <input type="text" id="courseCapacity" name="courseCapacity" value={course.courseLocation}/>
                            <br/>

                            <label for="prerequisiteCourseID">Pre-requisite Course(s)</label>
                            <input type="text" id="prerequisiteCourseID" name="prerequisiteCourseID" value={changeSlash(course.prerequisiteCourseID)}/>
                            <br/>

                            <label for="forbiddenCourseID">Forbidden Course(s)</label>
                            <input type="text" id="forbiddenCourseID" name="forbiddenCourseID" value={changeSlash(course.forbiddenCourseID)}/>
                            <br/>

                            <label for="credit">Credit</label>
                            <input type="text" id="credit" name="credit" value={course.credit}/>
                            <br/>

                            <label for="outline">Outline</label>
                            <input type="text" id="outline" name="outline" value={course.outline}/>
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
                    {/* // onChange={handleChange} */}
        {/* } */}
        </>
    )
}

const changeSlash = (courseArray) =>{
    if (courseArray === "")
        return "/";
    return courseArray;
}


export default CoursePanel