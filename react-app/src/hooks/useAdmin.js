import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const useAdmin = () => {
    const [userArray, setUserArray] = useState([])
    const [searchString, setSearchString] = useState('')
    const navigate = useNavigate()

    // fetch userArray at first render
    useEffect(() => {
        fetch('http://localhost:3001/admin/user', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) return alert(json.error)
            else if (json.userArray) return setUserArray(json.userArray)
        })
    }, [])

    // returning a searched user array
    const getUserArray = useCallback(() => {
        if (!searchString.length) return userArray
        else return userArray.filter(user => (String(user.userID) === searchString || user.username.toLowerCase().includes(searchString.toLowerCase())))
    }, [userArray, searchString])

    // create an user, user: {username: String, password: String, accessRight: Boolean}
    const createUser = useCallback((user) => {
        fetch('http://localhost:3001/admin/user', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) alert('Unknown error! Please Try again.')
            else {
                navigate(0)
                alert(json.message)
            }
        })
    }, [navigate])

    // delete an user, username: String
    const deleteUser = useCallback((username) => {
        fetch('http://localhost:3001/admin/user', {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({username})
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) alert(json.message)
            else {
                navigate(0)
                alert(json.message)
            }
        })
    }, [navigate])

    return {
        setSearchString,
        getUserArray,
        createUser,
        deleteUser
    }
}

export default useAdmin