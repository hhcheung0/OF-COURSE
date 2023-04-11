// ADMIN PAGE
import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'
import useUser from "../hooks/useUser";
import useComment from "../hooks/useComment";


const CoursePanel = () => {

    const { getCourse, setSearch } = useCourse();
    const { parseTimecodeArray } = useTime();
    const [ course, setCourse ] = useState({});
    const { removeComment } = useComment();

    return (
        <div id="admin-course">
            <div className="row">
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
            
            <div className="row">
{/* courseForm */}                    
                    <div className="grid-container" id="courseForm">
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

            <div className="row">
                <div className="column">
{/* courseComment */}
                    <div id="courseCommentSection">
                    <CourseCommentSection course={course} />
                    </div>
                    {/* <table id="courseComment">
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
                    </table> */}
                </div>
{/* courseCommentAdd */}
                <div className="column" id="courseCommentAdd">
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
        <div className="row" id='table-container'>
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

const CourseForm = ({course}) => { // state
    const { parseTimecodeArray } = useTime()
    const [ tutorial, setTutorial ] = useState({}); // state, function to adjust the state

    const [ courseID, setCourseID ] = useState(''); // handleCourseIDChange?
    const [ courseName, setCourseName ] = useState('')
    const [ courseTime, setCourseTime ] = useState([]);
    const [ courseLocation, setCourseLocation ] = useState('');
    const [ instructor, setInstructor ] = useState('');
    const [ department, setDepartment ] = useState('');
    const [ courseCapacity, setCourseCapacity ] = useState('');
    const [ prerequisiteCourseID, setPrerequisiteCourseID ] = useState([]);
    const [ forbiddenCourseID, setForbiddenCourseID ] = useState([]);
    const [ credit, setCredit ] = useState();
    const [ outline, setOutline ] = useState({});
    const [ tutorialInfo, setTutorialInfo ] = useState([]);

    // const [ comment, setComment ] = useState([]);

    const [ tutorialID, setTutorialID ] = useState('');
    const [ tutorialTime, setTutorialTime ] = useState('');
    const [ tutorialLocation, setTutorialLocation ] = useState([]);
    const [ tutor, setTutor ] = useState('');
    const [ tutorialCapacity, setTutorialCapacity ] = useState();

    const [ tutorialIndex, setTutorialIndex ] = useState(null)
    const [ tutorialFormNumber, setTutorialFormNubmer ] = useState([]);

    // console.log(course);
    console.log(course.tutorialInfo);

    const handleCourseNameChange = (e) => { console.log(e.target.id); setCourseName(e.target.value); }
    const handleCourseTimeChange = (e) => { console.log(e.target.id); setCourseTime(e.target.value);  }
    const handleCourseLocationChange = (e) => {console.log(e.target.id); setCourseLocation(e.target.value); }
    const handleInstructorChange = (e) => {console.log(e.target.id); setInstructor(e.target.value); }
    const handleDepartmentChange = (e) => {console.log(e.target.id); setDepartment(e.target.value); }
    const handleCourseCapacityChange = (e) => {console.log(e.target.id); setCourseCapacity(e.target.value); }
    const handlePrerequisiteCourseIDChange = (e) => {console.log(e.target.id); setPrerequisiteCourseID(e.target.value); }
    const handleForbidenCourseIDChange = (e) => {console.log(e.target.id); setForbiddenCourseID(e.target.value); }
    const handleCreditChange = (e) => {console.log(e.target.id); setCredit(e.target.value); }
    const handleOutlineChange = (e) => {console.log(e.target.id); setOutline(e.target.value); }
    const handleTutorialInfoChange = (e) => {console.log(e.target.id); setTutorialInfo(e.target.value); }


    // const handleCommentChange = (e) => {console.log(e.target.id); setComment(e.target.value); }

    const handleTutorialIDChange = (e) => {console.log(e.target.id); setTutorialID(e.target.value); }
    const handleTutorialTimeChange = (e) => {console.log(e.target.id); setTutorialTime(e.target.value); }
    const handleTutorialLocationChange = (e) => {console.log(e.target.id); setTutorialLocation(e.target.value); }
    const handleTutorChange = (e) => {console.log(e.target.id); setTutor(e.target.value); }
    const handleTutorialCapacityChange = (e) => {console.log(e.target.id); setTutorialCapacity(e.target.value); }

    const handleClear = (e) => {
        e.preventDefault()

        setCourseID('')
        setCourseName('')
        setCourseTime([])
        setCourseLocation('')
        setInstructor('')
        setDepartment('')
        setCourseCapacity('')
        setPrerequisiteCourseID([])
        setForbiddenCourseID([])
        setCredit('')
        setOutline('')
        setTutorialID('')
        setTutorialTime('')
        setTutorialLocation('')
        setTutor('')
        setTutorialCapacity('')
        console.log(outline)
    }

    useEffect(() => {
        setCourseID(course.courseID)
        setCourseName(course.courseName)
        setCourseTime(course.courseTime)
        setCourseLocation(course.courseLocation)
        setInstructor(course.instructor)
        setDepartment(course.department)
        setCourseCapacity(course.courseCapacity)
        setPrerequisiteCourseID(course.prerequisiteCourseID)
        setForbiddenCourseID(course.forbiddenCourseID)
        setCredit(course.credit)
        setOutline(course.outline)
        // setComment(course.comment)
        setTutorialInfo(course.tutorialInfo)
        if (!course.tutorialInfo) return
        setTutorialIndex(course.tutorialInfo.length? 0: null)
        setTutorialFormNubmer([...new Array(course.tutorialInfo.length).keys()])
    }, [course])

    useEffect(() => {
        console.log(tutorialFormNumber)
    }, [tutorialFormNumber])

    useEffect(() => {
        if (course.tutorialInfo === []) 
        return
        setTutorialID('')
        setTutorialTime('')
        setTutorialLocation('')
        setTutor('')
        setTutorialCapacity('')
        
        if (!course.tutorialInfo || !course.tutorialInfo[Number(tutorialIndex)]) return
        setTutorialID(course.tutorialInfo[Number(tutorialIndex)].tutorialID)
        setTutorialTime(course.tutorialInfo[Number(tutorialIndex)].tutorialTime)
        setTutorialLocation(course.tutorialInfo[Number(tutorialIndex)].tutorialLocation)
        setTutor(course.tutorialInfo[Number(tutorialIndex)].tutor)
        setTutorialCapacity(course.tutorialInfo[Number(tutorialIndex)].tutorialCapacity)
    }, [tutorialIndex, setTutorialID, setTutorialTime, setTutorialLocation, setTutor, setTutorialCapacity, course])

    const handleTutorialIndexChange = (e) => {
        setTutorialIndex(e.target.value)
    }

    return(
        <>
        {/* {course && */}
                    <form>
{/* Left side of the form - Lecture*/}
                        <div className="column" id="left">
                        <h3>Lecture</h3>
                            <label htmlFor="courseID">Course ID</label>
                            <input type="text" id="courseID" name="courseID" value={courseID} disabled/>
                            <br/>

                            <label htmlFor="courseName">Course Name</label>
                            <input type="text" id="courseName" name="courseName" value={courseName} onChange={handleCourseNameChange}/>
                            <br/>

                            <label htmlFor="courseTime">Time</label>
                            <input type="text" id="courseTime" name="courseTime" value={courseTime} onChange={handleCourseTimeChange} /> 
                            <br/>
                            
                            <label htmlFor="courseLocation">Location</label>
                            <input type="text" id="courseLocation" name="courseLocation" value={courseLocation} onChange={handleCourseLocationChange}/>
                            <br/>

                            <label htmlFor="instructor">Instructor</label>
                            <input type="text" id="instructor" name="instructor" value={instructor} onChange={handleInstructorChange}/>
                            <br/>

                            <label htmlFor="department">Department</label>
                            <input type="text" id="department" name="department" value={department} onChange={handleDepartmentChange}/>
                            <br/>

                            <label htmlFor="courseCapacity">Capacity</label>
                            <input type="text" id="courseCapacity" name="courseCapacity" value={courseCapacity} onChange={handleCourseCapacityChange}/>
                            <br/>

                            <label htmlFor="prerequisiteCourseID">Pre-requisite Course(s)</label>
                            <input type="text" id="prerequisiteCourseID" name="prerequisiteCourseID" value={prerequisiteCourseID} onChange={handlePrerequisiteCourseIDChange}/>
                            <br/>

                            <label htmlFor="forbiddenCourseID">Forbidden Course(s)</label>
                            <input type="text" id="forbiddenCourseID" name="forbiddenCourseID" value={forbiddenCourseID} onChange ={handleForbidenCourseIDChange}/>
                            <br/>

                            <label htmlFor="credit">Credit</label>
                            <input type="text" id="credit" name="credit" value={credit} onChange={handleCreditChange}/>
                            <br/>

                            <label htmlFor="outline">Outline</label>
                            <input type="text" id="outline" name="outline" value={outline} onChange={handleOutlineChange}/>
                            <br/>
                        </div>
{/* Right side of the form - Tutorial */}
                        <div className="column" id="right">
                        <h3>Tutorial 
                            <select name="tutNo" id="tutNo" onChange={handleTutorialIndexChange} value={String(tutorialIndex)} >
                            {tutorialFormNumber && tutorialFormNumber.map((number, idx) => (
                                <option value={number} key={idx}> {number+1} </option>
                            ))}
                            {/* <option value={0}>1</option>  
                            <option value={1}>2</option>
                            <option value={2}>3</option> */}
                            </select> 
                        </h3>
                            <label htmlFor="tutorialID">Tutorial ID</label>
                            <input type="text" id="tutorialID" name="tutorialID" value={tutorialID} onChange={handleTutorialIDChange}/>
                            <br/>

                            <label htmlFor="tutorialTime">Time</label>
                            <input type="text" id="tutorialTime" name="tutorialTime" value={tutorialTime} onChange={handleTutorialTimeChange}/>
                            <br/>
                            
                            <label htmlFor="tutoriaLocation">Location</label>
                            <input type="text" id="tutoriaLocation" name="tutoriaLocation" value={tutorialLocation} onChange={handleTutorialLocationChange}/>
                            <br/>

                            <label htmlFor="tutor">Tutor</label>
                            <input type="text" id="tutor" name="tutor" value={tutor} onChange={handleTutorChange}/>
                            <br/>

                            <label htmlFor="tutorialCapacity">Capacity</label>
                            <input type="text" id="tutorialCapacity" name="tutorialCapacity" value={tutorialCapacity} onChange={handleTutorialCapacityChange}/>
                            <br/>
                        {/* <input type="submit" class="btn1" value="Add/Update" />
                        <input type="submit" class="btn2" value="Clear" /> */}
                        
                        <button className="btn1"> Add/Update</button>
                        {/* <p>    </p> */}
                        <button className="btn2" onClick={handleClear}>Clear</button>

                        </div>
                        <br/>

                    </form>
                    {/* // onChange={handleChange} */}
        {/* } */}
        </>
    )
}
// const changeSlash = (courseArray) =>{
//     if (courseArray === "")
//         return "/";
//     return courseArray;
// }
const CourseCommentTable = ({courseID, comment}) =>{
    const { removeComment} = useComment();
    const [activeTab, setActiveTab] = useState("coursePanelTab");
    
    return(
               <tr>
                    <td>{comment}</td>
                    <td><button id="deleteComment" onClick={() => {removeComment(courseID,comment); window.location.reload()}}>🗑Delete</button></td>
               </tr>
    )
   }
const CourseCommentSection = ({course}) =>{
    const [ comment, setComment ] = useState(['']);
    const [ courseID, setCourseID ] = useState('');
    const handleCommentChange = (e) => {console.log(e.target.id); setComment(e.target.value); }
    const handleCourseIDChange = (e) => {console.log(e.target.id); setCourseID(e.target.value); }

    useEffect(() => {
        setComment(course.comment)
        setCourseID(course.courseID)
    }, [comment, courseID, course])

    // <input type="text" id="forbiddenCourseID" name="forbiddenCourseID" value={forbiddenCourseID} onChange ={handleForbidenCourseIDChange}/>

    return(
        <div id="courseCommentSection">
            <table id="courseComment">
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th></th>
                    </tr>

                    {course.comment && course.comment.map((comment,idx)=>(
                        <CourseCommentTable comment={comment} courseID={courseID} key ={idx}/>
                    ))}
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default CoursePanel