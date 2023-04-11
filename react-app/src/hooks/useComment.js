// import { useNavigate } from 'react-router'

const useComment = () => {
    // const navigate = useNavigate()

    const addComment = (courseID, comment) => {
        return fetch('http://localhost:3001/comment/add', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
                comment: comment
            }),
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json
        });
    }
    const removeComment = (courseID, comment) => {
        return fetch('http://localhost:3001/comment/remove', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                courseID: courseID,
                comment: comment
            })
        })
        .then(res => res.json())
        .then(json => {
            // navigate(0)
            console.log(json)
            return json
        });
    }
    return{
        addComment,
        removeComment
    }
}
export default useComment