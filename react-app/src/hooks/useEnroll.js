const useEnroll = () => {
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
            console.log(json)
            return json
        });
    }

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
            console.log(json)
            return json
        });
    }

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
            console.log(json)
            return json
        });
    }

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
            console.log(json)
            return json
        });
    }

    const swap = (enrolledCourseID, enrolledTutorialID, cartCourseID, cartTutorialID) => {
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
            //console.log(json);
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
                //console.log(json);
                
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
                    //.then(window.location.reload())
                }else{
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
            console.log(json)
            return json
        });
    }

    const getEnrolledCredit = () => {
        return fetch('http://localhost:3001/data/user/getEnrolledCredit', {credentials: 'include'})
        .then(res => res.json())
        .then(json => {
            //console.log(json)
            return json.credit
        });
    }

    const getGpa = async () => {
        try {
            const res = await fetch('http://localhost:3001/data/user/getGpa', { credentials: 'include' });
            const json = await res.json();
            return json.gpa;
        } catch (error) {
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