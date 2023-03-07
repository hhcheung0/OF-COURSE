import {Outlet} from 'react-router-dom'

const Root = () => {
    return (
        <>
            <header>OF-COURSE</header>
            <div id="main-container">
                <Outlet />
            </div>
            <footer>CSCI3100 project by group C2</footer>
        </>
    )
}

export default Root