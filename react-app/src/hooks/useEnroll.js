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
        fetch('http://localhost:3001/enrolledCourse/enroll', {
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
                    .then(()=> {
                        console.log("Swap successful")
                        return json
                    })
                    .then(window.location.reload())
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
                    .then(()=> {
                        console.log("Swap failed")
                        return json
                    })
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

    return {
        addToCart,
        removeFromCart,
        enroll,
        drop,
        swap,
        removeFromCompletedCourse
    }
}

export default useEnroll