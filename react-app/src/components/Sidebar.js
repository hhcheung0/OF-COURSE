import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HiOutlineMenu, HiOutlineArrowNarrowLeft } from 'react-icons/hi'

// import hooks
import useUser from '../hooks/useUser'

const Sidebar = () => {
    const [isHidden, setIsHidden] = useState(true)
    const [accessRight, setAccessRight] = useState(false)
    const [iconFileName, setIconFileName] = useState('')
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
        const { accessRight, username, icon } = getUserByToken()
        setAccessRight(accessRight)
        setUsername(username)
        switch(icon){
            case 1: setIconFileName("/nekko.jpg")
            break;
            case 2: setIconFileName("/bibi.jpg")
            break;
            case 3: setIconFileName("/slamdunk.gif")
            break;
            case 4: setIconFileName("/slamdunk2.jpeg")
            break;
            case 5: setIconFileName("/kenji.jpg")
            break;
            case 6: setIconFileName("/dragon.jpg")
            break;
            case 7: setIconFileName("/ghost.jpg")
            break;
            case 8: setIconFileName("/mushroom.jpg")
            break;
            case 9: setIconFileName("/turtle.jpg")
            break;
            case 10: setIconFileName("/kingkong.jpg")
            break;
        }
    }, [getUserByToken])

    return (
        <div id="sidebar">
            <button id="expand-button" onClick={handleExpand}>
                {isHidden? <HiOutlineMenu />: <HiOutlineArrowNarrowLeft />}
            </button>
            <div id="sidebar-content" style={{display: isHidden? 'none': 'flex'}}>
                <div id="profile-section" onClick={() => window.location.assign('/profile')}>
                    <img id="icon" src={iconFileName} alt="" />
                    <div id="icon">{username}</div>
                </div>
                <div id="nav-section">
                    <Link to={'/'}>Course Homepage</Link>
                    <Link to={'/course'}>Course Browsing</Link>
                    {accessRight && <Link to={'/admin'} >Admin Page</Link>}
                </div>
                <button id="log-out-button" onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}

export default Sidebar