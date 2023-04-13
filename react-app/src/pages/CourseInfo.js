import React, { useState, useEffect, useRef } from "react";

// import custom hooks
import useCourse from "../hooks/useCourse";
import useTime from "../hooks/useTime";
import useEnroll from "../hooks/useEnroll";
import useComment from "../hooks/useComment";

const CourseInfo = () => {
    const [comment, setComment] = useState("");
    const [tutorialID, setTutorialID] = useState("");
    const { addToCart } = useEnroll();
    const { addComment } = useComment();

    //get course info from database
    const { course } = useCourse(window.location.href.split("/").slice(-1)[0]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formID = e.target.id;
        console.log(formID);
        //handle addToCart button
        if (formID === "course-info") {
            //if there is tutorial but user didn't select, alert error message
            if ((tutorialID === "") && (course.tutorialInfo.length !== 0)) {
                alert("Please select a valid tutorial");
                return;
            }
            //if no error, try addToCart
            addToCart(course.courseID, tutorialID)
                .then((response) => {
                    alert(response.error); // Display the success/error message
                    window.location.assign(`/course`)
                })
                .catch((error) => {
                    console.error('Error adding to cart:', error);
                    alert(error.error); // Display the error message
                });
        }
        //handle addComment button
        else if (formID === "comment-info") {
            //if comment is empty, alert error message
            if (comment === "") {
                alert("Comment cannot be empty!")
                return;
            }
            //if no error, try addComment
            addComment(course.courseID, comment)
                .then((response) => {
                    alert(response.error); // Display the success/error message

                    //if successfully add comment, reload page for comment to appear
                    if (response.success)
                        window.location.reload();
                })
                .catch((error) => {
                    console.error('Error adding comment:', error);
                    alert(error.error); // Display the error message
                });

        }
    };
    const CourseSection = ({ course }) => {

        const { parseTimecodeArray } = useTime();

        return (
            <>
                {/* Display Lecture Information */}
                <div id="lecture-section">

                    <h3> Lecture</h3>
                    <table style={{ marginBottom: '10px' }} id="abc">
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
    const TutorialButton = ({ tutorial }) => {

        return (
            // Radio buttons to choose tutorial session
            <div id="button-placement" style={{ marginTop: "145px" }}>
                <input type="radio" id={tutorial.tutorialID} name="tutorial" checked={tutorialID === tutorial.tutorialID} onChange={(e) => setTutorialID(e.target.id)} />
            </div>

        )
    }
    const TutorialTable = ({ tutorial }) => {
        const { parseTimecodeArray } = useTime();
        return (
            // Display Tutorial Information
            <table style={{ marginBottom: '10px' }}>
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
    const TutorialSection = ({ course }) => {

        return (
            // Whole tutorial section
            <>
                <div id="tutorial-button">
                    {course.tutorialInfo && course.tutorialInfo.map((tutorial, idx) => (
                        <TutorialButton tutorial={tutorial} key={idx} />
                    ))}
                </div>
                <div id="tutorial-section">
                    <div id="tutorial-all-heading">
                        <div id="tutorial-header"><h3> Tutorial</h3></div>
                        <div id="shopping-cart-button">
                            <input type="submit" value="Add to Cart" />
                        </div>
                    </div>
                    {course.tutorialInfo && course.tutorialInfo.length > 0 ? (course.tutorialInfo.map((tutorial, idx) => (
                        <TutorialTable tutorial={tutorial} key={idx} />
                    ))) : (
                        <div>
                            No tutorial available for this course
                        </div>
                    )}


                </div>
            </>
        )
    }
    const CommentTable = ({ comment }) => {
        //displays comment one by one
        return (
            <tr>
                <td> {comment}</td>
            </tr>
        )
    }
    const CommentSection = ({ course }) => {
        //Displays the comment section
        return (
            <div id="comment-section">
                <h3> Comment</h3>
                <div id="comment-table">
                    <table>
                        <tbody>
                            <tr>
                                <th> Comment</th>
                            </tr>

                            {course.comment && course.comment.map((comment, idx) => (
                                <CommentTable comment={comment} key={idx} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }

    const CommentInput = () => {
        const textareaRef = useRef();

        useEffect(() => {
            if (textareaRef.current) {
                const textarea = textareaRef.current;
                textarea.focus();
                const cursorPosition = textarea.value.length;
                textarea.selectionStart = cursorPosition;
                textarea.selectionEnd = cursorPosition;
            }
        });
        //shows a textarea for inputting text
        return (
            <div id="comment-input">
                <h3> Add Comment</h3>
                <textarea ref={textareaRef} id="text-box" placeholder="Add comment here" value={comment} onChange={(e) => setComment(e.target.value)} />
                <input type="submit" id="submit-button" value="Add" style={{ float: 'right' }} />
            </div>
        )
    }

    const changeSlash = (courseArray) => {
        //for empty items in the courseArray, change them to / instead
        if (courseArray === "")
            return "/";
        return courseArray;
    }

    return (
        //whole course info page
        <>
            <h2>Course Information</h2>
            <form id="course-info" onSubmit={handleSubmit}>
                <CourseSection course={course} />
                <TutorialSection course={course} />
            </form>
            <form id="comment-info" onSubmit={handleSubmit}>
                <CommentSection course={course} />
                <div id="tutorial-button"> </div>
                <CommentInput />
            </form>

        </>


    )
}



export default CourseInfo;