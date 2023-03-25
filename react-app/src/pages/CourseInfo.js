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

    console.log(course);

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
                <CommentInput />
            </div>
        </>    
      
        
    )
}
const CourseTables =() =>{
    const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);
    console.log(course);
    useEffect(() => {
    if(course){
        document.getElementById("courseID").innerHTML =  course.courseID;
        document.getElementById("courseName").innerHTML =  course.courseName;
        //document.getElementById("courseTime").innerHTML =  parseTimecodeArray(course.courseTime);
        document.getElementById("courseLocation").innerHTML =  course.courseLocation;
        document.getElementById("instructor").innerHTML =  course.instructor;
        document.getElementById("department").innerHTML =  course.department;
        if(course.prerequisiteCourseID!="")
            document.getElementById("prerequisiteCourseID").innerHTML =  course.prerequisiteCourseID;
        else
            document.getElementById("prerequisiteCourseID").innerHTML = "/";
        if(course.forbiddenCourseID!="")
            document.getElementById("forbiddenCourseID").innerHTML =  course.forbiddenCourseID;
        else
            document.getElementById("forbiddenCourseID").innerHTML = "/";
        document.getElementById("courseCapacity").innerHTML =  course.courseCapacity;
        document.getElementById("credit").innerHTML =  course.credit;
        document.getElementById("outline").innerHTML =  course.outline;
    }
      }, [course]);
    return( 
        <>
        <div id="lecture-table">
            
            <h3> Lecture</h3>
            <table style={{marginBottom: '10px'}} id="abc">
                <tbody>
                    <tr>
                        <th> Course ID</th>
                        <td id="courseID"> </td>
                    </tr>
                    <tr>
                        <th> Course Name</th>
                        <td id="courseName"> </td>                    
                    </tr>
                    <tr>
                        <th> Time</th>
                        <td id="courseTime"></td>     
                    </tr>
                    <tr>
                        <th> Location</th>
                        <td id="courseLocation"> </td>     
                    </tr>
                    <tr>
                        <th> Instructor</th>
                        <td id="instructor"></td>     
                    </tr>
                    <tr>
                        <th> Department</th>
                        <td id="department"></td>     
                    </tr>
                    <tr>
                        <th> Capacity</th>
                        <td id="courseCapacity"> </td>     
                    </tr>
                    <tr>
                        <th> Pre-requisite Course(s)</th>
                        <td id="prerequisiteCourseID"> ARCH3860 </td>     
                    </tr>
                    <tr>
                        <th>Forbidden Course(s)</th>
                        <td id="forbiddenCourseID"> / </td>     
                    </tr>
                    <tr>
                        <th>Credit</th>
                        <td id="credit"> </td>     
                    </tr>
                    <tr>
                        <th> Outline</th>
                        <td id="outline"> </td>     
                    </tr>
                </tbody>
            </table>
            <script type="text/javascript">
            var x="100";
            document.getElementById("data1").innerHTML = x;
        </script>
        </div>
        </>
    )
}
const TutorialTables = () =>{
     const { course } = useCourse(window.location.href.split("/").slice(-1)[0])

     console.log(course);
    useEffect(() => {
    if(course){
        console.log(course);
        
        //document.getElementById("tutorialID1").innerHTML =  course.tutorialInfo[0].tutorialID;
        // document.getElementById("tutorialTime1").innerHTML =  course.courseName;
        // //document.getElementById("courseTime").innerHTML =  parseTimecodeArray(course.courseTime);
        // document.getElementById("tutorialLocation1").innerHTML =  course.courseLocation;
        // document.getElementById("tutor1").innerHTML =  course.instructor;
        // document.getElementById("capacity1").innerHTML =  course.department;
        // if(course.prerequisiteCourseID!="")
        //     document.getElementById("prerequisiteCourseID").innerHTML =  course.prerequisiteCourseID;
        // else
        //     document.getElementById("prerequisiteCourseID").innerHTML = "/";
        // if(course.forbiddenCourseID!="")
        //     document.getElementById("forbiddenCourseID").innerHTML =  course.forbiddenCourseID;
        // else
        //     document.getElementById("forbiddenCourseID").innerHTML = "/";
        // document.getElementById("courseCapacity").innerHTML =  course.courseCapacity;
        // document.getElementById("credit").innerHTML =  course.credit;
        // document.getElementById("outline").innerHTML =  course.outline;
    }
      }, [course]);
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
            <form>

                <table style={{marginBottom: '10px'}}>
                
                    <tbody>
                        <tr>
                            <th> Tutorial ID</th>
                            {/* <td id="tutorialID1">  </td> */}
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
            </form>
        </div>

        </>
    )
}

const CommentTables = () =>{
    return(
        <div id="comment-table">
            <h3> Comment</h3>
            <table>
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
    )
}

const CommentInput = () =>{
    return(
        <div id="comment-input">
            <h3> Add Comment</h3>
            <form>
                <textarea id="text-box"/>
                <input type="submit" id="submit-button" style={{float: "right", marginRight: "50px"}}/>
            </form>
    </div>
    )
}


export default CourseInfo;