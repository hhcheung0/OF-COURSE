import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";

// import custom hooks
import useCourse from "../hooks/useCourse";
import useTime from "../hooks/useTime";


const CourseInfo = () => {
    const [comment, addComment] = useState("");
    const [tutorial, addToShoppingCart] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    //get course info from database
    const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);

    //console.log(course);

    const handleAddToCart = (cartOption) => {
        cartOption.preventDefault();
        console.log(cartOption);
    }

    const handleAddComment = (comment) => {
        comment.preventDefault();
    }
    return(
        <>
            <h2>Course Information</h2>
            <form id="course-info" onSubmit={handleAddToCart}>
                <CourseTables course={course}/> 
                <TutorialTables course={course}/> 
            </form>
            <form id="course-info" onSubmit={handleAddComment}>
                <CommentTables course={course}/> 
                <div id="tutorial-button"> </div> 
                <CommentInput /> 
            </form>
        </>    
      
        
    )
}

const CourseTables =({course}) =>{
    //const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);
    //console.log(course);
    const {parseTimecodeArray} = useTime();

    return( 
        <>
        <div id="lecture-table">
            
            <h3> Lecture</h3>
            <table style={{marginBottom: '10px'}} id="abc">
                <tbody>
                    <tr>
                        <th> Course ID</th>
                        <td> {course.courseID}</td>
                    </tr>
                    <tr>
                        <th> Course Name</th>
                        <td> {course.courseName}</td>                    
                    </tr>
                    <tr>
                        <th> Time</th>
                        <td> {parseTimecodeArray(course.courseTime).join(', ')}</td>  
                    </tr>
                    <tr>
                        <th> Location</th>
                        <td>{course.courseLocation} </td>     
                    </tr>
                    <tr>
                        <th> Instructor</th>
                        <td>{course.instructor}</td>     
                    </tr>
                    <tr>
                        <th> Department</th>
                        <td> {course.department}</td>     
                    </tr>
                    <tr>
                        <th> Capacity</th>
                        <td > {course.courseCapacity}</td>     
                    </tr>
                    <tr>
                        <th> Pre-requisite Course(s)</th>
                        <td > {changeSlash(course.prerequisiteCourseID)}</td>     
                    </tr>
                    <tr>
                        <th>Forbidden Course(s)</th>
                        <td>  {changeSlash(course.forbiddenCourseID)} </td>     
                    </tr>
                    <tr>
                        <th>Credit</th>
                        <td> {course.credit}</td>     
                    </tr>
                    <tr>
                        <th> Outline</th>
                        <td> {course.outline}</td>     
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}
const TutorialButton =({tutorial}) =>{

    return(
        <div id = "button-placement" style={{marginTop : "145px"}}>
        <input type="radio" id={tutorial.tutorialID} name="tutorial"/>
        </div>
        
    )
}
const TutorialSubTable =({tutorial})=>{
    const {parseTimecodeArray} = useTime();
    return(
        <table style={{marginBottom: '10px'}}>
                
                    <tbody>
                        <tr>
                            <th> Tutorial ID</th>
                            <td> {tutorial.tutorialID} </td>
                        </tr>
                        <tr>
                            <th> Time</th>
                            <td> {parseTimecodeArray(tutorial.tutorialTime).join(', ')}</td>
                        </tr>
                        <tr>
                            <th> Location </th>
                            <td> {tutorial.tutorialLocation}</td>                    
                        </tr>
                        <tr>
                            <th> Tutor</th>
                            <td> {tutorial.tutor} </td>     
                        </tr>
                        <tr>
                            <th> Capacity</th>
                            <td> {tutorial.tutorialCapacity} </td>  
                        </tr>
                    </tbody>
                </table>
    )
}
const TutorialTables = ({course}) =>{

    return(
        <>
            <div id="tutorial-button">
                {course.tutorialInfo && course.tutorialInfo.map((tutorial,idx)=>(
                    <TutorialButton tutorial={tutorial} key ={idx}/>
                ))}
            </div>
            <div id = "tutorial-table">
                <div id="tutorial-all-heading">
                    <div id="tutorial-header"><h3> Tutorial</h3></div>
                    <div id="shopping-cart-button">
                        <input type="submit" value="Add to Cart"/>
                    </div>
                </div>
                {course.tutorialInfo && course.tutorialInfo.map((tutorial, idx) =>(
                    <TutorialSubTable tutorial={tutorial} key ={idx}/>
                ))}

            
            </div>
        </>
    )
}
const CommentSubTable = ({comment}) =>{

 return(
            <tr>
                <td> {comment}</td>
            </tr>  
 )
}
const CommentTables = ({course}) =>{
    return(
        <div id="tutorial-table">
            <h3> Comment</h3>
            <div id="comment-table">
                <table>
                    <tbody>
                        <tr>
                            <th> Comment</th>
                        </tr>

                        {course.comment && course.comment.map((comment,idx)=>(
                            <CommentSubTable comment={comment} key ={idx}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

const CommentInput = () =>{
    return(
        <div id="comment-input">
            <h3> Add Comment</h3>
                <textarea id="text-box"/>
                <input type="submit" id="submit-button" value="Add" style={{float: "right"}}/>
    </div>
    )
}

const changeSlash = (courseArray) =>{
    if (courseArray=="")
        return "/";
    return courseArray;
}

export default CourseInfo;