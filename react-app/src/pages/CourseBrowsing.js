import { useState } from 'react'

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'

const CourseBrowsing = () => {
    
    const { getCourse, setFilter, setSearch, setEligibleToggle } = useCourse()

    return (
        <div id='course-browsing'>
            <FilterList controller={setFilter} />
            <div id='table-panel'>
                <SearchBar controller={setSearch} />
                <EligibleCourseToggle controller={setEligibleToggle} />
                <CourseTable courseArray={getCourse()} />
            </div>
        </div>
    )
}
const FilterList = (props) => {
    const { classTimeList, departmentList, weekdayList } = useConstant()
    const [weekdayCheckbox, setWeekdayCheckbox] = useState(new Array(weekdayList.length).fill(false))
    const [classTimeCheckbox, setClassTimeCheckbox] = useState(new Array(classTimeList.length).fill(false))
    const [departmentCheckbox, setDepartmentCheckbox] = useState(new Array(departmentList.length).fill(false))

    // controller for checking weekday filter
    // add the checked weekday into the weekday array inside filter
    const handleWeekdayCheck = (e) => {
        if (e.target.checked) {
            props.controller(prev => ({
                ...prev,
                weekday: [...prev.weekday, e.target.value]
            }))
        }
        else {
            props.controller(prev => ({
                ...prev,
                weekday: prev.weekday.filter(time => time !== e.target.value)
            }))
        }
        setWeekdayCheckbox(prev => prev.map((bool, idx) => idx === Number(e.target.id)? !bool: bool))        
    }
    // controller for checking starting time filter
    // add the checked time into the starting time array inside filter
    const handleClassTimeCheck = (e) => {
        if (e.target.checked) {
            props.controller(prev => ({
                ...prev,
                classTime: [...prev.classTime, e.target.value]
            }))
        }
        else {
            props.controller(prev => ({
                ...prev,
                classTime: prev.classTime.filter(time => time !== e.target.value)
            }))
        }
        setClassTimeCheckbox(prev => prev.map((bool, idx) => idx === Number(e.target.value)? !bool: bool))
    }
    // controller for checking department filter
    // add the checked department into the department array inside filter
    const handleDepartmentCheck = (e) => {
        // similar to starting time
        if (e.target.checked) {
            props.controller(prev => ({
                ...prev,
                department: [...prev.department, e.target.value]
            }))
        }
        else {
            props.controller(prev => ({
                ...prev,
                department: prev.department.filter(department => department !== e.target.value)
            }))
        }
        setDepartmentCheckbox(prev => prev.map((bool, idx) => idx === departmentList.indexOf(e.target.value)? !bool: bool))
    }

    return (
        <div id='filter-wrap'>
            <div id='filter-list'>
                <div id="weekday-filter">
                    <div id='filter-header' >Weekday</div>
                    <div className="checkbox-container">
                        {weekdayList.map((array, idx) => (
                            <div id='checkbox' key={idx}>
                                <input
                                    type="checkbox"
                                    name={array[0]}
                                    value={array[0]}
                                    onChange={handleWeekdayCheck}
                                    checked={weekdayCheckbox[idx]}
                                    id={idx}
                                />
                                <label htmlFor={array[0]}>{array[1]}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div id='starting-time-filter'>
                    <div id='filter-header'>Class Time</div>
                    <div id='checkbox-container'>
                        {classTimeList.map((timeslot, idx) => (
                            <div id='checkbox' key={idx}>
                                <input
                                    type="checkbox"
                                    name={timeslot}
                                    value={String(idx)}
                                    onChange={handleClassTimeCheck}
                                    checked={classTimeCheckbox[idx]}
                                />
                                <label htmlFor={timeslot}>{timeslot}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div id='department-filter'>
                    <div id='filter-header'>Department</div>
                    <div id='checkbox-container'>
                        {departmentList.map((department, idx) => (
                            <div id='checkbox' key={idx}>
                                <input
                                    type="checkbox"
                                    name={department}
                                    value={department}
                                    onChange={handleDepartmentCheck}
                                    checked={departmentCheckbox[idx]}
                                />
                                <label htmlFor={department}>{department}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
const SearchBar = (props) => {
    const [search, setSearch] = useState('')
    
    const handleChange = (e) => {
        props.controller(e.target.value)
        setSearch(e.target.value)
    }

    return (
        <div id='search-bar'>
            <div>Search</div>
            <input
                type="text"
                onChange={handleChange}
                value={search}
            />
        </div>
    )
}
const EligibleCourseToggle = (props) => {
    const [eligibleCourse, setEligibleCourse] = useState(false)

    const handleChange = (e) => {
        props.controller(e.target.value === 'true')
        setEligibleCourse(e.target.value === 'true')
    }

    return (
        <div id='toggle-button-panel'>
            <div>
                <input
                    type="radio"
                    name="course-toggle"
                    value={true}
                    checked={eligibleCourse}
                    onChange={handleChange}
                />
                <label htmlFor="eligible">Eligible Courses Only</label>
            </div>
            <div>
                <input
                    type="radio"
                    name="course-toggle"
                    value={false}
                    checked={!eligibleCourse}
                    onChange={handleChange}
                />
                <label htmlFor="all">All Courses</label>
            </div>

        </div>
    )
}
const CourseTable = ({courseArray}) => {

    return (
        <div id='table-container'>
            <table id='course-table'>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Capacity</th>
                    </tr>
                </thead>

                <tbody>
                    {courseArray && courseArray.map((course, idx) => (
                        <CourseTableRow course={course} key={idx} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const CourseTableRow = ({course}) => {
    const { parseTimecodeArray } = useTime()

    return (
        <>
        {course &&
            <tr>
                <td>
                    <div className='link' onClick={() => window.location.assign(`/course/${course.courseID}`)}>
                        {course.courseID}
                    </div>
                </td>
                <td>
                    <div className='link' onClick={() => window.location.assign(`/course/${course.courseID}`)}>
                        {course.courseName}
                    </div>
                </td>
                <td>{parseTimecodeArray(course.courseTime).map((str, idx) => (
                    <div key={idx}>{str}</div>
                ))}</td>
                <td>{course.courseLocation}</td>
                <td>{course.courseCapacity - course.enrolledID.length}/{course.courseCapacity}</td>
            </tr>
        }
        </>
    )
}

export default CourseBrowsing