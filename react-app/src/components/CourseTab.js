import React, { useState, useEffect } from "react"
import { BsArrowDown, BsArrowUp, BsTrash3} from 'react-icons/bs';

// import hooks
import useUser from '../hooks/useUser'
import useCourse from "../hooks/useCourse";
import useTime from "../hooks/useTime";
import useEnroll from "../hooks/useEnroll";

//missing total credits
const CourseTab = () => {

    const [maxCredit, setMaxCredit] = useState('')
    const [enrolledCourse, setEnrolledCourse] = useState('')
    const [shoppingCartCourse, setShoppingCartCourse] = useState('')
    const [completedCourse, setCompletedCourse] = useState('')
    const { getUserByToken } = useUser()

    useEffect(() => {
        const { maxCredit, enrolledCourse, shoppingCartCourse, completedCourse } = getUserByToken()
        setMaxCredit(maxCredit)
        setEnrolledCourse(enrolledCourse)
        setShoppingCartCourse(shoppingCartCourse)
        setCompletedCourse(completedCourse)
    }, [getUserByToken])

    return (
        <div id="homepage-course-tab">
            <div id="homepage-course-up">
                <div id = "homepage-course-upperleft">
                    <EnrolledTable enrolledCourse={enrolledCourse}/>
                    <ShoppingCartTable shoppingCartCourse={shoppingCartCourse}/>
                </div>
                
                <div id ="homepage-course-upperright">
                    <div id = "homepage-course-text">
                        <p>total credits currently enrolled: 5</p>
                        <p>maximum credit limit: {maxCredit}</p>
                    </div>
                    <SwapCourse enrolledCourse={enrolledCourse} shoppingCartCourse={shoppingCartCourse}/>
                </div>
            </div>
            <div id='homepage-course-bottom'>
            <CompletedTable completedCourse={completedCourse}/>
            </div>
        </div>
    );
};

const EnrolledTable = ({enrolledCourse}) => {

    return(
        <>
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
                {enrolledCourse && enrolledCourse.map((enrolled, idx) => (
                    <EnrolledTableRow enrolledCourse={enrolled.courseID} enrolledTutorial={enrolled.tutorialID} key={idx}/>
                ))}
            </tbody>
        </table>
        </>
    )
}

//incompleted drop function
const EnrolledTableRow = ({enrolledCourse, enrolledTutorial}) => {
    const { parseTimecodeArray } = useTime()
    const { course } = useCourse(enrolledCourse);
    const { drop } = useEnroll()
    const [dropTutorial, setDropTutorial] = useState('')
    //console.log(course)
    //console.log(enrolledTutorial)

    useEffect(() => { 
        setDropTutorial(enrolledTutorial); 
    }, [enrolledTutorial]); 

    return(
        <>
            {course && 
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>LEC</td>
                    <td>{parseTimecodeArray(course.courseTime).join(', ')}</td>
                    <td>{course.courseLocation}</td>
                    <td>{course.credit}</td>
                    <td><button onClick={() => {drop(course.courseID, dropTutorial); window.location.reload()}}><BsTrash3 /> Drop</button></td>
                </tr>
            }
            {course.tutorialInfo && 
                course.tutorialInfo.map((tutorial, idx) => (
                    tutorial.tutorialID === enrolledTutorial &&
                    <tr key={idx}>
                        <td></td>
                        <td></td>
                        <td>{tutorial.tutorialID}</td>
                        <td>{parseTimecodeArray(tutorial.tutorialTime).join(', ')}</td>
                        <td>{tutorial.tutorialLocation}</td>
                        <td></td>
                    </tr>
                ))
            }
        </>
    )
}

//incompleted enroll function
const ShoppingCartTable = ({shoppingCartCourse}) => {

    //const [selectedCourses, setSelectedCourses] = useState([]);
    //const { enroll } = useEnroll()

    return(
        <>
            <div id="ShoppingCart">
                <h2>Shopping Cart</h2>
                <button >Enroll</button>
            </div>
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
                {shoppingCartCourse && shoppingCartCourse.map((shoppingCart, idx) => (
                    <ShoppingCartTableRow 
                        shoppingCartCourse={shoppingCart.courseID} 
                        shoppingCartTutorial={shoppingCart.tutorialID} 
                        key={idx}
                    />
                ))}
            </tbody>
            </table>
        </>
    )
}


const ShoppingCartTableRow = ({shoppingCartCourse,shoppingCartTutorial}) => {
    const { parseTimecodeArray } = useTime()
    const { course } = useCourse(shoppingCartCourse);
    const { removeFromCart } = useEnroll()
    //console.log(course)
    //console.log(shoppingCartTutorial)

    return(
        <>
            {course && 
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>LEC</td>
                    <td>{parseTimecodeArray(course.courseTime).join(', ')}</td>
                    <td>{course.courseLocation}</td>
                    <td>{course.credit}</td>
                    <td><button onClick={() => {removeFromCart(course.courseID); window.location.reload()}}><BsTrash3 /> Delete</button></td>
                </tr>
            }
            {course.tutorialInfo && 
                course.tutorialInfo.map((tutorial, idx) => (
                    tutorial.tutorialID === shoppingCartTutorial &&
                    <tr key={idx}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{tutorial.tutorialID}</td>
                        <td>{parseTimecodeArray(tutorial.tutorialTime).join(', ')}</td>
                        <td>{tutorial.tutorialLocation}</td>
                        <td></td>
                    </tr>
                ))
            }
        </>
    )
}

//missing average gpa
const CompletedTable = ({completedCourse}) => {
    var totalCredits = 0;
    var totalGPA = 0;
    
    return(
    <>
        <div id='CompletedTable'> 
            <h2>Completed Courses </h2> 
            <p>GPA {totalGPA / totalCredits}/4.30</p> 
        </div>
        <table id ="homepage-table">
        <thead>
            <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Credit</th>
            <th>Grade</th>
            </tr>
        </thead>
        <tbody>
                {completedCourse && completedCourse.map((completed, idx) => (
                    <CompletedTableRow completedCourse={completed.courseID} completedGrade={completed.grade} key={idx}/>
                ))}
        </tbody>
        </table>
    </>
    )
}

const gpaToGrade = {
    4.3: 'A+', 4.0: 'A', 3.7: 'A-',
    3.3: 'B+', 3.0: 'B', 2.7: 'B-',
    2.3: 'C+', 2.0: 'C', 1.7: 'C-', 
    1.0: 'D', 0.0: 'F'
};


const CompletedTableRow = ({completedCourse, completedGrade}) => {
    const { course } = useCourse(completedCourse);
    //console.log(course)

    const calculateGrade = (gpa) => {
        return gpaToGrade[gpa] || '';
    }

    return(
        <>
            {course && 
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>{course.credit}</td>
                    <td>{calculateGrade(completedGrade)}</td>
                </tr>
            }
        </>
    )
}

//incompleted swap function
const SwapCourse = ({enrolledCourse, shoppingCartCourse}) => {
    const { swap } = useEnroll()
    const[swapCourseFrom, setSwapCourseFrom] = useState('')
    const[swapTutorialFrom, setSwapTutorialFrom] = useState('')
    const[swapCourseTo, setSwapCourseTo] = useState('')
    const[swapTutorialTo, setSwapTutorialTo] = useState('')
    
    return(
    <div id="swap-container"> 
        <h2>Swap Courses</h2>
        <p>From:</p>
        <select 
            onChange={(e) => { 
                setSwapCourseFrom(e.target.value); 
                const tutorialID = enrolledCourse.find(c => c.courseID === e.target.value).tutorialID; 
                setSwapTutorialFrom(tutorialID); 
            }}
        >
            <option />
            {enrolledCourse && enrolledCourse.map((enrolled, idx) => {
                return(<option key={idx}>{enrolled.courseID}</option>)
            })}
        </select>

        <br/><br/>
        <BsArrowDown size={70}/>&ensp;<BsArrowUp size={70}/>
        <br/>
    
        <p>To:</p>
        <select onChange={(e) => { 
                setSwapCourseTo(e.target.value); 
                const tutorialID = shoppingCartCourse.find(c => c.courseID === e.target.value).tutorialID; 
                setSwapTutorialTo(tutorialID); 
            }}
        >
            <option />
            {shoppingCartCourse && shoppingCartCourse.map((shoppingCart, idx) => {
                return(<option key={idx}>{shoppingCart.courseID}</option> )
            })}
        </select>
        <br/><br/>
        <button onClick={() => {swap(swapCourseFrom, swapTutorialFrom, swapCourseTo, swapTutorialTo); window.location.reload()}}>Swap</button>
    </div>
    )
}


export default CourseTab

