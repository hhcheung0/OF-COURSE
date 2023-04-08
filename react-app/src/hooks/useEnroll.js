const useEnroll = () => {
    const addToCart = (courseID, tutorialID) => {
        fetch('http://localhost:3001/shoppingCart/add', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
                tutorialID: tutorialID,
            })
        })
        .then(res => res.json())
        .then(json => console.log(json));
    }

    const removeFromCart = (courseID) => {
        fetch('http://localhost:3001/shoppingCart/remove', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
            })
        })
        .then(res => res.json())
        .then(json => console.log(json));
    }

    const enroll = (courseID) => {
        fetch('http://localhost:3001/enrolledCourse/add', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
            })
        })
        .then(res => res.json())
        .then(json => console.log(json));
    }

    return {
        addToCart,
        removeFromCart,
        enroll
    }
}

export default useEnroll