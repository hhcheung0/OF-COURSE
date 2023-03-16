import {Outlet} from 'react-router-dom'

// import React components
import Sidebar from './Sidebar'

const Root = ({nav}) => {

    const content = <div id='main-container'><Outlet /></div>
    
    return (
        <>
            <header>
                <div id='title'>OF-COURSE</div>
            </header>
            {nav? <div id='sidebar-layout'><Sidebar />{content}</div>: content}
            <footer>
                <div>CSCI3100 Project ©Group C2</div>
            </footer>
        </>
    )
}
export default Root