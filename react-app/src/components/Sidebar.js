import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HiOutlineMenu, HiOutlineArrowNarrowLeft } from 'react-icons/hi'

// import hooks
import useUser from '../hooks/useUser'

const Sidebar = () => {
    const [isHidden, setIsHidden] = useState(true)
    const [accessRight, setAccessRight] = useState(false)
    const [username, setUsername] = useState('')
    const { getUserByToken } = useUser()

    const handleExpand = (e) => {
        setIsHidden(prev => !prev)
    }
    const handleLogout = (e) => {
        fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) window.location.assign('/login')
        })
    }

    useEffect(() => {
        const { accessRight, username } = getUserByToken()
        setAccessRight(accessRight)
        setUsername(username)
    }, [getUserByToken])

    return (
        <div id="sidebar">
            <button id="expand-button" onClick={handleExpand}>
                {isHidden? <HiOutlineMenu />: <HiOutlineArrowNarrowLeft />}
            </button>
            <div id="sidebar-content" style={{display: isHidden? 'none': 'flex'}}>
                <div id="profile-section">
                    <img id="icon" src="/nekko.jpg" alt="" />
                    <div>{username}</div>
                </div>
                <div id="nav-section">
                    <Link to={'/profile'}>Profile Page</Link>
                    <Link to={'/homepage'}>Course Homepage</Link>
                    <Link to={'/course'}>Course Browsing</Link>
                    {accessRight && <Link to={'/admin'} >Admin Page</Link>}
                </div>
                <button id="log-out-button" onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}

export default Sidebar