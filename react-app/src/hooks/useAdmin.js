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

    const getUserArray = useCallback(() => {
        if (!searchString.length) return userArray
        else return userArray.filter(user => (String(user.userID) === searchString || user.username.toLowerCase().includes(searchString.toLowerCase())))
    }, [userArray, searchString])

    return {
        setSearchString,
        getUserArray
    }
}

export default useAdmin