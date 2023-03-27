import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

// import custom hooks
import useCourse from "../hooks/useCourse";
import useTime,{parseTimecodeArray} from "../hooks/useTime";


const CourseInfo = () => {
    const [comment, addComment] = useState("");
    const [tutorial, addToShoppingCart] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    //get course info from database
    const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);

    //console.log(course);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <>
            <h2>Course Information</h2>
            <div id="course-info">
                <CourseTables />
                <TutorialTables />
            </div>
            <div id="course-info">
                <CommentTables />
                <div id="tutorial-button"> </div>
                <CommentInput />
            </div>
        </>    
      
        
    )
}
const myTime = (courseTime)=> {
    console.log(courseTime);
    let timeString = "";
    courseTime.forEach(async (time)=>{
        timeString = timeString + time + ", ";
    })
    console.log(timeString);
    return timeString.substring(0,timeString.length -2);

}
const CourseTables =() =>{
    const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);
    console.log(course);
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
                        <td> {myTime(parseTimecodeArray(course.courseTime))}</td>  
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

const TutorialTables = () =>{
     const { course } = useCourse(window.location.href.split("/").slice(-1)[0])

    return(
        <>
        <div id="tutorial-button">
            <div id = "button-placement" style={{marginTop : "120px"}}>
                <input type="radio" id="tutorial" name="tutorial"/>
            </div>
            <div id = "button-placement" style={{marginTop : "160px"}}>
                <input type="radio" id="tutorial" name="tutorial"/>
            </div>
            <div id = "button-placement" style={{marginTop : "160px"}}>
                <input type="radio" id="tutorial" name="tutorial"/>
            </div>
        </div>
        <div id = "tutorial-table">
            <h3> Tutorial</h3>
            

                <table style={{marginBottom: '10px'}}>
                
                    <tbody>
                        <tr>
                            <th> Tutorial ID</th>
                            <td id="tutorialID1">  </td>
                        </tr>
                        <tr>
                            <th> Time</th>
                            <td> Tue 5:30pm</td>
                        </tr>
                        <tr>
                            <th> Location </th>
                            <td> KKB Room 1</td>                    
                        </tr>
                        <tr>
                            <th> Tutor</th>
                            <td> Mrs. Madelynn Ulsamer</td>     
                        </tr>
                        <tr>
                            <th> Capacity</th>
                            <td> 200</td>  
                        </tr>
                    </tbody>
                </table>

                <table style={{marginBottom: '10px'}}>
                
                    <tbody>
                        <tr>
                            <th> Tutorial ID</th>
                            <td> T01 </td>
                        </tr>
                        <tr>
                            <th> Time</th>
                            <td> Tue 5:30pm</td>
                        </tr>
                        <tr>
                            <th> Location </th>
                            <td> KKB Room 1</td>                    
                        </tr>
                        <tr>
                            <th> Tutor</th>
                            <td> Mrs. Madelynn Ulsamer</td>     
                        </tr>
                        <tr>
                            <th> Capacity</th>
                            <td> 200</td>  
                        </tr>
                    </tbody>
                </table>
                <table style={{marginBottom: '10px'}}>
                
                    <tbody>
                        <tr>
                            <th> Tutorial ID</th>
                            <td> T01 </td>
                        </tr>
                        <tr>
                            <th> Time</th>
                            <td> Tue 5:30pm</td>
                        </tr>
                        <tr>
                            <th> Location </th>
                            <td> KKB Room 1</td>                    
                        </tr>
                        <tr>
                            <th> Tutor</th>
                            <td> Mrs. Madelynn Ulsamer</td>     
                        </tr>
                        <tr>
                            <th> Capacity</th>
                            <td> 200</td>  
                        </tr>
                    </tbody>
                </table>
           
        </div>

        </>
    )
}

const CommentTables = () =>{
    return(
        <div id="tutorial-table">
            <h3> Comment</h3>
            <div id="comment-table">
            
            <table id>
                <tbody>
                    <tr>
                        <th> Comment</th>
                    </tr>
                    <tr>
                        <td> ARCH4180</td>
                    </tr>
                    <tr>
                        <td> Applications of Architectural Studies</td>   
                    </tr>
                    <tr>                 
                        <td> Tue 16:30-18:30</td>     
                    </tr>

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
            <form>
                <textarea id="text-box"/>
                <input type="submit" id="submit-button" style={{float: "right"}}/>
            </form>
    </div>
    )
}

const changeSlash = (courseArray) =>{
    if (courseArray=="")
        return "/";
    return courseArray;
}

export default CourseInfo;