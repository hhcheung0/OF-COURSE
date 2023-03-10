import {Outlet} from 'react-router-dom'

const Root = () => {
    return (
        <>
            <header>
                <div id='title'>OF-COURSE</div>
            </header>
            <div id="main-container">
                <Outlet />
            </div>
            <footer>
                <div>CSCI3100 Project ©Group C2</div>
            </footer>
        </>
    )
}
export default Root