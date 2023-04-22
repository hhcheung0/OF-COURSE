const useComment = () => {
    //Puts courseID and comment, and adds to database in backend
    //returns json object, which contains the alert message
    const addComment = (courseID, comment) => {
        return fetch('http://localhost:3001/comment/add', {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                courseID: courseID,
                comment: comment
            }),
        })
            .then(res => res.json())
            .then(json => {
                return json
            });
    }
    //Puts courseID and comment, and deletes from database in backend
    //returns json object, which contains the alert message
    const removeComment = (courseID, comment) => {
        return fetch('http://localhost:3001/comment/remove', {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                courseID: courseID,
                comment: comment
            })
        })
            .then(res => res.json())
            .then(json => {
                return json
            });
    }
    return {
        addComment,
        removeComment
    }
}
export default useComment