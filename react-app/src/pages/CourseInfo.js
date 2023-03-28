import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";

// import custom hooks
import useCourse from "../hooks/useCourse";
import useTime from "../hooks/useTime";


const CourseInfo = () => {
    const [comment, setComment] = useState("");
    const [tutorialID, addToShoppingCart] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    //get course info from database
    const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);

    //console.log(course);

    const handleSubmit= (e) =>{
        e.preventDefault();
        const formID = e.target.id;
        console.log(formID);
        if (formID === "course-info"){
            console.log("dasds");

            fetch('http://localhost:3001/addtocart', {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({
                    tutorial: tutorialID,
                })
            })
            .then(res => res.json())
        }
        else if (formID === "comment-info"){

        }




    };
    const CourseSection =({course}) =>{
        //const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);
        //console.log(course);
        const {parseTimecodeArray} = useTime();
    
        return( 
            <>
            <div id="lecture-section">
                
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
            <input type="radio" id={tutorial.tutorialID} name="tutorial" value={tutorialID} onChange={(e) => addToShoppingCart(e.target.value)}/>
            </div>
            
        )
    }
    const TutorialTable =({tutorial})=>{
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
    const TutorialSection = ({course}) =>{
    
        return(
            <>
                <div id="tutorial-button">
                    {course.tutorialInfo && course.tutorialInfo.map((tutorial,idx)=>(
                        <TutorialButton tutorial={tutorial} key ={idx}/>
                    ))}
                </div>
                <div id = "tutorial-section">
                    <div id="tutorial-all-heading">
                        <div id="tutorial-header"><h3> Tutorial</h3></div>
                        <div id="shopping-cart-button">
                            <input type="submit" value="Add to Cart"/>
                        </div>
                    </div>
                    {course.tutorialInfo && course.tutorialInfo.map((tutorial, idx) =>(
                        <TutorialTable tutorial={tutorial} key ={idx}/>
                    ))}
    
                
                </div>
            </>
        )
    }
    const CommentTable = ({comment}) =>{
    
     return(
                <tr>
                    <td> {comment}</td>
                </tr>  
     )
    }
    const CommentSection = ({course}) =>{
        return(
            <div id="tutorial-section">
                <h3> Comment</h3>
                <div id="comment-section">
                    <table>
                        <tbody>
                            <tr>
                                <th> Comment</th>
                            </tr>
    
                            {course.comment && course.comment.map((comment,idx)=>(
                                <CommentTable comment={comment} key ={idx}/>
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
                    <textarea id="text-box" value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <input type="submit" id="submit-button" value="Add" style={{float: "right"}}/>
        </div>
        )
    }
    
    const changeSlash = (courseArray) =>{
        if (courseArray=="")
            return "/";
        return courseArray;
    }
    return(
        <>
            <h2>Course Information</h2>
            <form id="course-info" onSubmit={handleSubmit}>
                <CourseSection course={course}/> 
                <TutorialSection course={course}/> 
            </form>
            <form id="comment-info" onSubmit={handleSubmit}>
                <CommentSection course={course}/> 
                <div id="tutorial-button"> </div> 
                <CommentInput /> 
            </form>
        </>    
      
        
    )
}



export default CourseInfo;