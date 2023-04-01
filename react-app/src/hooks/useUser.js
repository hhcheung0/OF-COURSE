import { useState, useEffect } from 'react'

const useUser = () => {
    // store the user in react state
    const [user, setUser] = useState({})

    // when first call, fetch the user data without the password
    useEffect(() => {
        fetch('http://localhost:3001/data/user/cookie', {credentials: 'include'})
        .then(res => res.json())
        .then(({user, error}) => {
            if (!user || error) {
                alert('Your token is malformed, please login again')
                // window.location.assign('/')
            }
            else {
                setUser(user)
            }
        })
    }, [])

    // get function for retrieving user
    const getUser = () => {
        return user
    }

    return { getUser }
}

export default useUser