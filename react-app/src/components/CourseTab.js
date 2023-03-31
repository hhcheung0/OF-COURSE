import { BsArrowDown, BsArrowUp, BsTrash3} from 'react-icons/bs';

const CourseTab = () => {
    const EnrolledTable = () => {
        return(
            <>
            <h2>Enrolled Courses</h2>
            <table id='homepage-table'>
                <thead>
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th></th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Credit</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>BIOL2410</td>
                    <td>Applications of Biology</td>
                    <td>LEC</td>
                    <td>Tue 8:30 – 10:15</td>
                    <td>YIA Room 1</td>
                    <td>3</td>
                    <td><button><BsTrash3 /> Drop</button></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>T01</td>
                    <td>Fri 9:30 – 10:15</td>
                    <td>YIA Room 1</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </>
        )
    }
        
    const ShoppingCartTable = () => {
        return(
        <>
            <div id="ShoppingCart" style={{display: 'flex'}}>
                <h2 style={{flex: 8}}>Shopping Cart</h2>
                <button style={{flex: 1}}>Enroll</button>
            </div>
            <table id ="homepage-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th></th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Credit</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>MGNT1040</td>
                    <td>Introduction to Management 1</td>
                    <td>LEC</td>
                    <td>Tue 14:30–16:15</td>
                    <td>MMW Room 1</td>
                    <td>2</td>
                    <td><button><BsTrash3 /> Delete</button></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>T01</td>
                    <td>Fri 9:30 – 10:15</td>
                    <td>YIA Room 1</td>
                    <td></td>
                </tr>
            </tbody>
            </table>
        </>
        )
    }
        
    const CompletedTable = () => {
        return(
        <>
            <div style={{display: 'flex'}}> 
            <h2>Completed Courses </h2> 
            <p id="homepage-course-gpa">GPA 4.00/4.30</p> 
            </div>
            <table id ="homepage-table">
            <thead>
                <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Semester</th>
                <th>Credit</th>
                <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>GEOG1040</td>
                <td>Recent History of Geography</td>
                <td>2021-2022 Sem 1</td>
                <td>3</td>
                <td>A</td>
                </tr>
            </tbody>
            </table>
        </>
        )
    }
        
    const SwapCourse = () => {
        return(
        <div id="swap-container"> 
            <h2>Swap Courses</h2>
            <p>From:</p>
            <select>
            <option value="">MGNT1040</option>
            <option value="">MGNT1023</option>
            </select>
    
            <br/><br/>
            <BsArrowDown size={70}/>&ensp;<BsArrowUp size={70}/>
            <br/>
        
            <p>To:</p>
            <select>
            <option value="">MGNT1041</option>
            <option value="">BIOL2410</option>
            </select>
            <br/><br/>
            <button>Swap</button>
        </div>
        )
    }

    return (
        <div id="homepage-course">
            <div id="homepage-course-up">
            <div id = "homepage-course-upperleft">
                <EnrolledTable />
                <ShoppingCartTable />
            </div>

            <div id ="homepage-course-upperright">
                <div id = "homepage-course-text">
                <p>total credits currently enrolled: 5</p>
                <p>maximum credit limit: 18</p>
                </div>
                <SwapCourse />
            </div>
            </div>
            <div id='homepage-course-bottom'>
            <CompletedTable />
            </div>
        </div>
    );
};

export default CourseTab

