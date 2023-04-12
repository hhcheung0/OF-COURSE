import React, { useState, useEffect, useMemo } from "react"
import { BsArrowDown, BsArrowUp, BsTrash3} from 'react-icons/bs';

// import hooks
import useUser from '../hooks/useUser'
import useCourse from "../hooks/useCourse";
import useTime from "../hooks/useTime";
import useEnroll from "../hooks/useEnroll";

var selected = []
var creditCourse = []

const CourseTab = () => {

    const [maxCredit, setMaxCredit] = useState('')
    const [enrolledCourse, setEnrolledCourse] = useState('')
    const [shoppingCartCourse, setShoppingCartCourse] = useState('')
    const [completedCourse, setCompletedCourse] = useState('')
    const [enrolledCredit, setEnrolledCredit] = useState('')
    const { getUserByToken } = useUser()
    const { getEnrolledCredit } = useEnroll()
    
    
    useEffect(() => {
        const { maxCredit, enrolledCourse, shoppingCartCourse, completedCourse } = getUserByToken()
        setMaxCredit(maxCredit)
        setEnrolledCourse(enrolledCourse)
        setShoppingCartCourse(shoppingCartCourse)
        setCompletedCourse(completedCourse)
    }, [getUserByToken])

    //get total enrolled courses credit
    getEnrolledCredit().then(res => setEnrolledCredit(res));

    return (
        <div id="homepage-course-tab">
            <div id="homepage-course-up">
                <div id = "homepage-course-upperleft">
                    <EnrolledTable enrolledCourse={enrolledCourse}/>
                    <ShoppingCartTable shoppingCartCourse={shoppingCartCourse}/>
                </div>
                
                <div id ="homepage-course-upperright">
                    <div id = "homepage-course-text">
                        <p>total credits currently enrolled: {enrolledCredit}</p>
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

//missing alert message
const ShoppingCartTable = ({shoppingCartCourse}) => {

    //const [selectedCourses, setSelectedCourses] = useState([]);
    const { enroll } = useEnroll()

    const toEnroll = () => {
        if(selected.length === 0){
            alert("Please select course in shopping cart!")
        }else{
            for(var i = 0; i < selected.length; i++){
                var tutorialID = null
                tutorialID = shoppingCartCourse.find(c => c.courseID === selected[i]).tutorialID;
                console.log(tutorialID)
                enroll(selected[i], tutorialID)
                //alert message
            }

        }
        window.location.reload()
    }

    return(
        <>
            <div id="ShoppingCart">
                <h2>Shopping Cart</h2>
                <button onClick={toEnroll}>Enroll</button>
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

    //const [checkedState, setCheckedState] = useState('');
    

    const handleOnChange = (courseID) => {
        if (!selected.includes(courseID)){
            selected.push(courseID);
            console.log(selected)
        } else {
            selected.splice(courseID, 1)
        }
    };

    const handleOnClick = (courseID) => {
        if (courseID !== null) {
            removeFromCart(course.courseID)
                .then((response) => {
                    const confirmed = window.alert(response.error, [
                        {text: 'OK', onPress: window.location.reload()},
                    ]); // Display the success/error message
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.error); // Display the error message
                });
        }
    };

    return(
        <>
            {course && 
                <tr>
                    <td><input type="checkbox" value={course.courseID} onChange={()=>handleOnChange(course.courseID)}/></td>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>LEC</td>
                    <td>{parseTimecodeArray(course.courseTime).join(', ')}</td>
                    <td>{course.courseLocation}</td>
                    <td>{course.credit}</td>
                    <td><button onClick={() => handleOnClick(course.courseID)}><BsTrash3 /> Delete</button></td>
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

const CompletedTable = ({completedCourse}) => {

    const { getGpa } = useEnroll()
    const [gpa, setGpa] = useState('')
    
    getGpa().then(res => setGpa(res.toFixed(2)));

    return(
    <>
        <div id='CompletedTable'> 
            <h2>Completed Courses </h2> 
            <p>GPA {gpa}/4.30</p> 
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
                <CompletedTableRow 
                    completedCourse={completed.courseID} 
                    completedGrade={completed.grade} 
                    key={idx}
                />
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
        return gpaToGrade[gpa] || "";
    };

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

var CourseFrom = ""
var CourseTo = ""
var TutorialFrom = ""
var TutorialTo = ""

//missing alert function
const SwapCourse = ({enrolledCourse, shoppingCartCourse}) => {
    const { swap } = useEnroll()
    
    const saveEnroll = (e) => {
        CourseFrom = e
        TutorialFrom = enrolledCourse.find(c => c.courseID === e).tutorialID;
    }

    const saveShop = (e) => {
        CourseTo = e
        TutorialTo = shoppingCartCourse.find(c => c.courseID === e).tutorialID;
    }

    const toSwap = () => {
        if(CourseFrom === ""){
            alert("please select course")
        }else if(CourseTo === ""){
            alert("please select course")
        }else{
            console.log(CourseFrom, TutorialFrom, CourseTo, TutorialTo)
            swap(CourseFrom, TutorialFrom, CourseTo, TutorialTo)
        }
    }


    return(
    <div id="swap-container"> 
        <h2>Swap Courses</h2>
        <p>From:</p>
        <select onChange={(e) => {saveEnroll(e.target.value)}}>
            <option />
            {enrolledCourse && enrolledCourse.map((enrolled, idx) => {
                return(<option key={idx}>{enrolled.courseID}</option>)
            })}
        </select>

        <br/><br/>
        <BsArrowDown size={70}/>&ensp;<BsArrowUp size={70}/>
        <br/>
    
        <p>To:</p>
        <select onChange={(e) => {saveShop(e.target.value)}}>
            <option />
            {shoppingCartCourse && shoppingCartCourse.map((shoppingCart, idx) => {
                return(<option key={idx}>{shoppingCart.courseID}</option> )
            })}
        </select>
        <br/><br/>
        <button onClick={toSwap}>Swap</button>
    </div>
    )
}




export default CourseTab

