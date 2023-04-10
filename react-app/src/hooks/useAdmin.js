import { useState, useEffect, useCallback } from 'react'

const useAdmin = () => {
    const [userArray, setUserArray] = useState([])
    const [searchString, setSearchString] = useState('')

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

    // create an user user: {username: String, password: String, accessRight: Boolean}
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
            else alert('Successfully created user.')
        })
    }, [])

    return {
        setSearchString,
        getUserArray,
        createUser
    }
}

export default useAdmin