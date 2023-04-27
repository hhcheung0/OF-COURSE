import React, { useState, useEffect } from "react"
import { BsArrowDown, BsArrowUp, BsTrash3} from 'react-icons/bs';

// import hooks
import useUser from '../hooks/useUser'
import useCourse from "../hooks/useCourse";
import useTime from "../hooks/useTime";
import useEnroll from "../hooks/useEnroll";

// Define a global variable called "selected" to store selected courses in the shopping cart
var selected = []

const CourseTab = () => {

    // Define various state variables using the useState hook
    const [maxCredit, setMaxCredit] = useState('')
    const [enrolledCourse, setEnrolledCourse] = useState('')
    const [shoppingCartCourse, setShoppingCartCourse] = useState('')
    const [completedCourse, setCompletedCourse] = useState('')
    const [enrolledCredit, setEnrolledCredit] = useState(0)

     // Import the "getUserByToken" and "getEnrolledCredit" functions from the custom hooks
    const { getUserByToken } = useUser()
    const { getEnrolledCredit } = useEnroll()
    
    // Use the useEffect hook to fetch user data and enrolled credits when the component mounts or updates
    useEffect(() => {
        const { maxCredit, enrolledCourse, shoppingCartCourse, completedCourse } = getUserByToken()
        setMaxCredit(maxCredit)
        setEnrolledCourse(enrolledCourse)
        setShoppingCartCourse(shoppingCartCourse)
        setCompletedCourse(completedCourse)

        // Get the total enrolled credit using the "getEnrolledCredit" function and update the state variable
        getEnrolledCredit().then(res => setEnrolledCredit(res));
    }, [getUserByToken])

    //Render the CourseTab component with different child components, including EnrolledTable, ShoppingCartTable, SwapCourse, and CompletedTable
    //Display the current enrolled credit and maximum credit limit.
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

// Displays a table of enrolled courses
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
                    // Render a row for each enrolled course using the EnrolledTableRow component
                    <EnrolledTableRow enrolledCourse={enrolled.courseID} enrolledTutorial={enrolled.tutorialID} key={idx}/>
                ))}
                
            </tbody>
        </table>
        </>
    )
}

// Displays a row for an enrolled course or tutorial
const EnrolledTableRow = ({enrolledCourse, enrolledTutorial}) => {

    // Import custom hooks called "useTime", "useCourse" and "useEnroll"
    const { parseTimecodeArray } = useTime()
    const { course } = useCourse(enrolledCourse);
    const { drop } = useEnroll()
    const [dropTutorial, setDropTutorial] = useState('')

    useEffect(() => { 
        // Update the tutorial to be dropped when enrolledTutorial prop changes
        setDropTutorial(enrolledTutorial); 
    }, [enrolledTutorial]); 

    const handleOnDrop = (courseID, tutorialID) => {
        if (courseID !== null) {
            // Call the drop function from useEnroll hook to drop the course or tutorial
            drop(courseID, tutorialID)
                .then((response) => {
                    // Display the success/error message
                    const confirmed = window.alert(response.error, [
                        {text: 'OK', onPress: window.location.reload()},
                    ]);
                })
                .catch((error) => {
                    // Display the error message
                    alert(error.error); 
                });
        }
    };


    return(
        <>
            {course && 
                // Render the row for the enrolled course
                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseName}</td>
                    <td>LEC</td>
                    <td>{parseTimecodeArray(course.courseTime).join(', ')}</td>
                    <td>{course.courseLocation}</td>
                    <td>{course.credit}</td>
                    <td><button onClick={() => {if(window.confirm("Confirm to drop course?")){handleOnDrop(course.courseID, dropTutorial)}}}><BsTrash3 /> Drop</button></td>
                </tr>
            }
            {course.tutorialInfo && 
                // Render the row for the enrolled tutorial if there is one
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

// Displays a table of shopping cart courses
const ShoppingCartTable = ({shoppingCartCourse}) => {

    // Import a custom hook called "useEnroll"
    const { enroll } = useEnroll()

    // Called when the user clicks on a button to enroll in the selected courses
    const handleOnEnroll = async () => {

        // Check if any courses have been selected
        if(selected.length === 0){
            alert("Please select course in shopping cart!")
        }else{

            // If one or more courses have been selected, display a confirmation box
            if(window.confirm("Confirm to enroll course?")){
                for(var i = 0; i < selected.length; i++){
                    var tutorialID = null
                    tutorialID = shoppingCartCourse.find(c => c.courseID === selected[i]).tutorialID;
                    const response = await enroll(selected[i], tutorialID)

                    // Display an alert indicating whether the enrollment was successful or not
                    if(response.success){
                        alert(selected[i] + " enroll successful")
                    }else{
                        alert(selected[i] + " enroll failed. " + response.error)
                    }
                }
                // Reload the page to update the shopping cart and display the newly enrolled courses
                window.location.reload()
            }
        }
    }

    return(
        <>
            <div id="ShoppingCart">
                <h2>Shopping Cart</h2>
                <button onClick={handleOnEnroll}>Select</button> 
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
                    // Render a row for the current course using the "ShoppingCartTableRow" component
                    // which receives the course ID and tutorial ID as props
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

// Displays a row for an shooping cart course or tutorial
const ShoppingCartTableRow = ({shoppingCartCourse,shoppingCartTutorial}) => {

    // Import custom hooks called "useTime", "useCourse", and "useEnroll"
    const { parseTimecodeArray } = useTime()
    const { course } = useCourse(shoppingCartCourse);
    const { removeFromCart } = useEnroll()
    
    //Called when the user clicks on the checkbox next to a course
    const handleOnChange = (courseID) => {
        if (!selected.includes(courseID)){
            selected.push(courseID);
        } else {
            selected.splice(courseID, 1)
        }
    };

    //Called when the user clicks on the "Delete" button next to a course
    const handleOnDelete = (courseID) => {
        if (courseID !== null) {
            // Remove the current course from the shopping cart using the "removeFromCart" function
            removeFromCart(courseID)
                .then((response) => {
                    // If the removal is successful, display a confirmation message and refresh the page
                    const confirmed = window.alert(response.error, [
                        {text: 'OK', onPress: window.location.reload()},
                    ]); 
                })
                .catch((error) => {
                    // If the removal fails, display an error message
                    alert(error.error); 
                });
        }
    };

    // Render the table row for the current course
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
                    <td><button onClick={() => {if(window.confirm("Confirm to delete course?")){handleOnDelete(course.courseID)}}}><BsTrash3 /> Delete</button></td>
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

// Displays a table of completed courses, along with the current GPA
const CompletedTable = ({completedCourse}) => {

    // Import the "getGpa" function from the "useEnroll" hook
    const { getGpa } = useEnroll()

    // Define a state variable called "gpa" using the useState hook
    const [gpa, setGpa] = useState('')

    // Use the useEffect hook to fetch the current GPA when the component mounts
    useEffect(() => {
        getGpa().then(res => setGpa(res.toFixed(2)));
    }, [])
    
    // Render the CompletedTable component with a table of completed courses and the current GPA
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

// Define a constant called "gpaToGrade" that maps GPAs to letter grades
const gpaToGrade = {
    4.3: 'A+', 4.0: 'A', 3.7: 'A-',
    3.3: 'B+', 3.0: 'B', 2.7: 'B-',
    2.3: 'C+', 2.0: 'C', 1.7: 'C-', 
    1.0: 'D', 0.0: 'F'
};

// Displays a row for an completed course
const CompletedTableRow = ({completedCourse, completedGrade}) => {

    // Import the "course" function from the "useCourse" hook
    const { course } = useCourse(completedCourse);

    // Maps GPAs to letter grades using the "gpaToGrade" constant
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

// To store the selected course and tutorial information
var CourseFrom = ""
var CourseTo = ""
var TutorialFrom = ""
var TutorialTo = ""

// Allows the user to swap courses between their enrolled courses and shopping cart
const SwapCourse = ({enrolledCourse, shoppingCartCourse}) => {

    // Import the "swap" function from the "useEnroll" hook
    const { swap } = useEnroll()
    
    // Saves the selected course and tutorial information from the "enrolledCourse" dropdown
    const saveEnroll = (e) => {
        CourseFrom = e
        TutorialFrom = enrolledCourse.find(c => c.courseID === e).tutorialID;
    }

    // Saves the selected course and tutorial information from the "shoppingCartCourse" dropdown
    const saveShop = (e) => {
        CourseTo = e
        TutorialTo = shoppingCartCourse.find(c => c.courseID === e).tutorialID;
    }

    // Checks if both courses have been selected
    // If so, confirms the swap with the user and calls the "swap" function
    const toSwap = () => {
        if(CourseFrom === ""){
            alert("please select course")
        }else if(CourseTo === ""){
            alert("please select course")
        }else{
            if(window.confirm("Confirm to swap course?")){
                swap(CourseFrom, TutorialFrom, CourseTo, TutorialTo)
            }
        }
    }

    // Render the SwapCourse component with two dropdowns for selecting the courses to swap, and a button to initiate the swap
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

