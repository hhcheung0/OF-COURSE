const useEnroll = () => {
    //hooks to add the course and tutorial to the shopping cart with the corresponding IDs
    const addToCart = (courseID, tutorialID) => {
        return fetch('http://localhost:3001/shoppingCart/add', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
                tutorialID: tutorialID
            }),
        })
        .then(res => res.json())
        .then(json => {
            return json
        });
    }

    //hooks to remove the course and its tutorial from the shopping cart with the corresponding course ID
    const removeFromCart = (courseID) => {
        return fetch('http://localhost:3001/shoppingCart/remove', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
            })
        })
        .then(res => res.json())
        .then(json => {
            return json
        });
    }

    //hooks to enroll the course and the tutorial from the shopping cart with the corresponding IDs
    const enroll = (courseID, tutorialID) => {
        return fetch('http://localhost:3001/enrolledCourse/enroll', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
                tutorialID: tutorialID
            })
        })
        .then(res => res.json())
        .then(json => {
            return json
        });
    }

    //hooks to drop the course and the tutorial from the enrolled course with the corresponding IDs
    const drop = (courseID, tutorialID) => {
        return fetch('http://localhost:3001/enrolledCourse/drop', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
                tutorialID: tutorialID
            })
        })
        .then(res => res.json())
        .then(json => {
            return json
        });
    }

    //hooks to swap the enrolled course with the course in shopping cart with their corresponding IDs
    const swap = (enrolledCourseID, enrolledTutorialID, cartCourseID, cartTutorialID) => {
        //Drop the enrolled course first
        fetch('http://localhost:3001/enrolledCourse/drop', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: enrolledCourseID,
                tutorialID: enrolledTutorialID
            })
        })
        .then(res => res.json())
        .then(json => {
            //Enroll the course from shopping cart then
            fetch('http://localhost:3001/enrolledCourse/enroll', {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({
                    courseID: cartCourseID,
                    tutorialID: cartTutorialID
                })
            })
            .then(res => res.json())
            .then(json => {
                //If successful to enroll the course in shopping cart,
                //then add the original enrolled course (dropped now) back to shopping cart
                if(json.success){
                    fetch('http://localhost:3001/shoppingCart/add', {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {'Content-type' : 'application/json'},
                        body: JSON.stringify({
                            courseID: enrolledCourseID,
                            tutorialID: enrolledTutorialID
                        })
                    })
                    .then((response) => {
                        const confirmed = window.alert("Swap successful", [
                            {text: 'OK', onPress: window.location.reload()},
                        ]); // Display the success/error message
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error.error); // Display the error message
                    });
                }else{
                    //If unsuccessful to enroll the course in shopping cart,
                    //then enroll back the original enrolled course (dropped now)
                    fetch('http://localhost:3001/enrolledCourse/enroll', {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {'Content-type' : 'application/json'},
                        body: JSON.stringify({
                            courseID: enrolledCourseID,
                            tutorialID: enrolledTutorialID
                        })
                    })
                    .then((response) => {
                        const confirmed = window.alert("Swap failed", [
                            {text: 'OK', onPress: window.location.reload()},
                        ]); // Display the success/error message
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error.error); // Display the error message
                    });
                }
             });
        })
    }

    //remove the course record from the completed course
    const removeFromCompletedCourse = (courseID) => {
        return fetch('http://localhost:3001/completedCourse/remove', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
            })
        })
        .then(res => res.json())
        .then(json => {
            return json
        });
    }

    //get user's enrolled credit from all the enrolled courses
    const getEnrolledCredit = () => {
        return fetch('http://localhost:3001/data/user/getEnrolledCredit', {credentials: 'include'})
        .then(res => res.json())
        .then(json => {
            return json.credit
        });
    }

    // Get the user's GPA data
    const getGpa = async () => {
        try {
            const res = await fetch('http://localhost:3001/data/user/getGpa', { credentials: 'include' });
            const json = await res.json();

            // Return the user's GPA from the JSON object
            return json.gpa;

        } catch (error) {
            // Log an error message if there was an error fetching the GPA
            console.error("Error fetching GPA:", error);
        }
    };

    return {
        addToCart,
        removeFromCart,
        enroll,
        drop,
        swap,
        removeFromCompletedCourse,
        getEnrolledCredit,
        getGpa
    }
}

export default useEnroll