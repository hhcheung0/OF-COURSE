// ADMIN PAGE
import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'
import useUser from "../hooks/useUser";
import useComment from "../hooks/useComment";
import useAdmin from "../hooks/useAdmin";


const CoursePanel = () => {

    const { getCourse, setSearch } = useCourse();
    const { parseTimecodeArray } = useTime();
    const [ course, setCourse ] = useState({});
    const { removeComment } = useComment();
    const { createCourse, updateCourse, deleteCourse } = useAdmin();

    return (
        <div id="admin-course">
            <div className="row">
                <div id='table-panel'>
                    <SearchBar controller={setSearch} />
                    <CourseTable courseArray={getCourse()} controller={setCourse} deleter={deleteCourse}/> 
                </div>
            </div>
            
            <div className="row">                  
                    <div className="grid-container" id="courseForm">
                        <CourseForm course={course} creater={createCourse} updater={updateCourse}/>
                    </div>
            </div>

            <div className="row">
                <div className="column">
                    <div id="courseCommentSection">
                        <CourseCommentSection course={course} />
                    </div>
                </div>
                <div className="column" id="courseCommentAdd">
                    <h3>To Add Comment:</h3>
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

const CourseTable = ({courseArray, controller, deleter}) => {

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
                        <CourseTableRow course={course} key={idx} controller={controller} deleter={deleter}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const CourseTableRow = ({course, controller, deleter}) => {
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
                <td><button onClick={() => {if(window.confirm("Confirm to delete course?")){deleter(course.courseID)}}}>🗑Delete</button></td>
            </tr>
        }
        </>
    )
}

const CourseForm = ({course, creater, updater}) => { // state
    const [ formType, setFormType ] = useState('Add');

    const [ courseID, setCourseID ] = useState(''); // handleCourseIDChange?
    const [ courseName, setCourseName ] = useState('')
    const [ courseTime, setCourseTime ] = useState([]);
    const [ courseLocation, setCourseLocation ] = useState('');
    const [ instructor, setInstructor ] = useState('');
    const [ department, setDepartment ] = useState('');
    const [ courseCapacity, setCourseCapacity ] = useState('');
    const [ prerequisiteCourseID, setPrerequisiteCourseID ] = useState([]);
    const [ forbiddenCourseID, setForbiddenCourseID ] = useState([]);
    const [ credit, setCredit ] = useState('');
    const [ outline, setOutline ] = useState("");
    const [ tutorialInfo, setTutorialInfo ] = useState([]);

    const [ tutorialID, setTutorialID ] = useState('');
    const [ tutorialTime, setTutorialTime ] = useState('');
    const [ tutorialLocation, setTutorialLocation ] = useState([]);
    const [ tutor, setTutor ] = useState('');
    const [ tutorialCapacity, setTutorialCapacity ] = useState('');

    const [ tutorialIndex, setTutorialIndex ] = useState(null)
    const [ tutorialFormNumber, setTutorialFormNubmer ] = useState([]);

    // console.log(course);
    //console.log(course.tutorialInfo);

    const handleCourseIDChange = (e) => {console.log(e.target.id); setCourseID(e.target.value);}
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

        setFormType('Add')
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
        setTutorialIndex(null)
        setTutorialFormNubmer([])
        //console.log(outline)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let prerequisiteCourseArray = [];
        if(prerequisiteCourseID && prerequisiteCourseID != "") prerequisiteCourseArray = String(prerequisiteCourseID).split(',');
        let forbiddenCourseArray = [];
        if(forbiddenCourseID && forbiddenCourseID != "") forbiddenCourseArray = String(forbiddenCourseID).split(',');
        let tutorialArray = [];
        if(tutorialID && tutorialID != ""){
            tutorialArray = [{
                tutorialID: tutorialID,
                tutorialTime : String(tutorialTime).split(','),
                tutorialLocation : tutorialLocation,
                tutor : tutor,
                tutorialCapacity : Number(tutorialCapacity),
                enrolledID: []
            }]
        }

        let course = {
            courseID : courseID,
            courseName : courseName,
            courseTime : String(courseTime).split(','),
            courseLocation : courseLocation,
            department : department,
            instructor : instructor,
            courseCapacity : Number(courseCapacity),
            enrolledID: [],
            prerequisiteCourseID : prerequisiteCourseArray,
            forbiddenCourseID : forbiddenCourseArray,
            credit : Number(credit),
            outline : outline,
            comment : [],
            tutorialInfo : tutorialArray
        }

        //console.log(course)
        if(formType === "Add"){
            if(window.confirm("Confirm to add course?"))
                creater(course)
        }else{
            if(window.confirm("Confirm to update course?"))
                updater(course)
        }
    }

    useEffect(() => {
        if(course.courseID){
            setFormType("Update")
        }
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
        if (!course.tutorialInfo || course.tutorialInfo.length === 0){
            setTutorialIndex(null)
            setTutorialFormNubmer([])
        }else{
            setTutorialIndex(0)
            setTutorialFormNubmer([...new Array(course.tutorialInfo.length).keys()])
        }
    }, [course])

    /*
    useEffect(() => {
        console.log(tutorialFormNumber)
    }, [tutorialFormNumber])

    useEffect(() => {
        console.log(formType)
    }, [formType])
    */

    useEffect(() => {
        //console.log("tutorialIndex: " +tutorialIndex)
        if (tutorialIndex == null){
            setTutorialID('')
            setTutorialTime('')
            setTutorialLocation('')
            setTutor('')
            setTutorialCapacity('')
        }else{
            setTutorialID(course.tutorialInfo[Number(tutorialIndex)].tutorialID)
            setTutorialTime(course.tutorialInfo[Number(tutorialIndex)].tutorialTime)
            setTutorialLocation(course.tutorialInfo[Number(tutorialIndex)].tutorialLocation)
            setTutor(course.tutorialInfo[Number(tutorialIndex)].tutor)
            setTutorialCapacity(course.tutorialInfo[Number(tutorialIndex)].tutorialCapacity)
        }
    }, [tutorialIndex])

    const handleTutorialIndexChange = (e) => {
        setTutorialIndex(e.target.value)
    }

    return(
        <>
            <form>
                <div className="column" id="left">
                <h3>Lecture</h3>
                    <label htmlFor="courseID">Course ID</label>
                    <input type="text" id="courseID" name="courseID" value={courseID} onChange={handleCourseIDChange} disabled={formType=="Update" ? true : false}/>

                    <label htmlFor="courseName">Course Name</label>
                    <input type="text" id="courseName" name="courseName" value={courseName} onChange={handleCourseNameChange}/>

                    <label htmlFor="courseTime">Time</label>
                    <input type="text" id="courseTime" name="courseTime" value={courseTime} onChange={handleCourseTimeChange} /> 
                    
                    <label htmlFor="courseLocation">Location</label>
                    <input type="text" id="courseLocation" name="courseLocation" value={courseLocation} onChange={handleCourseLocationChange}/>

                    <label htmlFor="instructor">Instructor</label>
                    <input type="text" id="instructor" name="instructor" value={instructor} onChange={handleInstructorChange}/>

                    <label htmlFor="department">Department</label>
                    <input type="text" id="department" name="department" value={department} onChange={handleDepartmentChange}/>

                    <label htmlFor="courseCapacity">Capacity</label>
                    <input type="text" id="courseCapacity" name="courseCapacity" value={courseCapacity} onChange={handleCourseCapacityChange}/>

                    <label htmlFor="prerequisiteCourseID">Pre-requisite Course(s)</label>
                    <input type="text" id="prerequisiteCourseID" name="prerequisiteCourseID" value={prerequisiteCourseID} onChange={handlePrerequisiteCourseIDChange}/>

                    <label htmlFor="forbiddenCourseID">Forbidden Course(s)</label>
                    <input type="text" id="forbiddenCourseID" name="forbiddenCourseID" value={forbiddenCourseID} onChange ={handleForbidenCourseIDChange}/>

                    <label htmlFor="credit">Credit</label>
                    <input type="text" id="credit" name="credit" value={credit} onChange={handleCreditChange}/>

                    <label htmlFor="outline">Outline</label>
                    <input type="text" id="outline" name="outline" value={outline} onChange={handleOutlineChange}/>
                </div>
                <div className="column" id="right">
                    <h3>Tutorial 
                        <select name="tutNo" id="tutNo" onChange={handleTutorialIndexChange} value={String(tutorialIndex)} >
                        {tutorialFormNumber && tutorialFormNumber.map((number, idx) => (
                            <option value={number} key={idx}> {number+1} </option>
                        ))}
                        </select> 
                    </h3>
                        <label htmlFor="tutorialID">Tutorial ID</label>
                        <input type="text" id="tutorialID" name="tutorialID" value={tutorialID} onChange={handleTutorialIDChange}/>

                        <label htmlFor="tutorialTime">Time</label>
                        <input type="text" id="tutorialTime" name="tutorialTime" value={tutorialTime} onChange={handleTutorialTimeChange}/>
                        
                        <label htmlFor="tutoriaLocation">Location</label>
                        <input type="text" id="tutoriaLocation" name="tutoriaLocation" value={tutorialLocation} onChange={handleTutorialLocationChange}/>

                        <label htmlFor="tutor">Tutor</label>
                        <input type="text" id="tutor" name="tutor" value={tutor} onChange={handleTutorChange}/>

                        <label htmlFor="tutorialCapacity">Capacity</label>
                        <input type="text" id="tutorialCapacity" name="tutorialCapacity" value={tutorialCapacity} onChange={handleTutorialCapacityChange}/>
                    
                    <div className="row">
                        <div className="column d-flex justify-content-center">
                            <button className="btn1" onClick={handleSubmit}> {formType==="Update" ? "Update" : "Add"}</button>
                        </div>
                        <div className="column d-flex justify-content-center">
                            <button className="btn2" onClick={handleClear}>Clear</button>
                        </div>
                    </div>

                </div>
            </form>
        </>
    )
}

const CourseCommentTable = ({courseID, comment}) =>{
    const { removeComment} = useComment();
    const [activeTab, setActiveTab] = useState("coursePanelTab");
    
    return(
               <tr>
                    <td>{comment}</td>
                    <td><button id="deleteComment" onClick={() => {if(window.confirm("Confirm to delete comment?")){removeComment(courseID,comment); window.location.reload()}}}>🗑Delete</button></td>
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

    return(
        // <div id="courseCommentSection">
            <table id="courseComment">
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {course.comment && course.comment.map((comment,idx)=>(
                        <CourseCommentTable comment={comment} courseID={courseID} key ={idx}/>
                    ))}
                </tbody>
            </table>
        // </div>
    )
}

export default CoursePanel