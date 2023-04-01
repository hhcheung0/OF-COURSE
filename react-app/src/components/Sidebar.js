import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HiOutlineMenu, HiOutlineArrowNarrowLeft } from 'react-icons/hi'

// import hooks
import useUser from '../hooks/useUser'

const Sidebar = () => {
    const [isHidden, setIsHidden] = useState(true)
    const [accessRight, setAccessRight] = useState(false)
    const [username, setUsername] = useState('')
    const { getUser } = useUser()

    const handleExpand = () => {
        setIsHidden(prev => !prev)
    }

    useEffect(() => {
        const { accessRight, username } = getUser()
        setAccessRight(accessRight)
        setUsername(username)
    }, [getUser])

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
                <button id="log-out-button">Log out</button>
            </div>
        </div>
    )
}

export default Sidebar