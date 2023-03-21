import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseInfo = () => {
    const [comment, addComment] = useState("");
    const [tutorial, addToShoppingCart] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <>
            <h2>Course Information</h2>
            <div id="halfTable" class="row">
                <div id="courseInfo" class="column">
                    <h3> Lecture</h3>
                    <table>
                        <tr>
                            <th> Course ID</th>
                            <td> ARCH4180</td>
                        </tr>
                        <tr>
                            <th> Course Name</th>
                            <td> Applications of Architectural Studies</td>                    
                        </tr>
                        <tr>
                            <th> Time</th>
                            <td> Tue 16:30-18:30</td>     
                        </tr>
                        <tr>
                            <th> Location</th>
                            <td> MMW Room 1</td>     
                        </tr>
                        <tr>
                            <th> Instructor</th>
                            <td> Professor Naomi Granzow</td>     
                        </tr>
                        <tr>
                            <th> Department</th>
                            <td> Architectural Studies</td>     
                        </tr>
                        <tr>
                            <th> Capacity</th>
                            <td> 200</td>     
                        </tr>
                        <tr>
                            <th> Pre-requisite Course(s)</th>
                            <td> ARCH3860 </td>     
                        </tr>
                        <tr>
                            <th>Forbidden Course(s)</th>
                            <td> / </td>     
                        </tr>
                        <tr>
                            <th>Credit</th>
                            <td> 2</td>     
                        </tr>
                        <tr>
                            <th> Outline</th>
                            <td> Sample Outline for ARCH4180 testing xxx</td>     
                        </tr>
                        </table>
                </div>
                <div class="column">
                <h3> Tutorial</h3>
                <form>
                    <table STYLE="marginBottom: 10px">
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
                    </table>

                    <table>
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
                    </table>
                    </form>
                </div>

            </div>
        </>    
      
        
    )
}

export default CourseInfo;