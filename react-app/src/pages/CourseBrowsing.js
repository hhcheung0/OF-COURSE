import { useState, useEffect } from 'react'

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'

const CourseBrowsing = () => {
    const [searchString, setSearchString] = useState('')
    const [filter, setFilter] = useState({startingTime: [], department: []})

    const { courseArray } = useCourse()

    useEffect(() => {
        console.log(searchString)
    }, [searchString])
    useEffect(() => {
        console.log(filter)
    }, [filter])

    return (
        <div id='course-browsing'>
            <FilterList controller={setFilter} />
            <div id='table-panel'>
                <SearchBar value={searchString} controller={setSearchString} />
                <EligibleCourseToggle />
                <CourseTable courseArray={courseArray} />
            </div>
        </div>
    )
}
const FilterList = (props) => {
    const { classStartingTimeList, departmentList } = useConstant()

    const handleStartingTimeCheck = (e) => {
        // if user check an arbitrary starting time
        // add the corresponding starting time into the array inside filter
        // else remove the starting time from the array
        if (e.target.checked) {
            props.controller(filter => ({
                ...filter,
                startingTime: [...filter.startingTime, e.target.value]
            }))
        }
        else {
            props.controller(filter => ({
                ...filter,
                startingTime: filter.startingTime.filter((time => time !== e.target.value))
            }))
        }
    }

    return (
        <div id='filter-list'>
            <div id='starting-time-filter'>
                <div id='filter-header'>Class Starting Time</div>
                <div id='checkbox-container'>
                    {classStartingTimeList.map((timeslot, idx) => (
                        <div id='checkbox' key={idx}>
                            <input
                                type="checkbox"
                                name={timeslot}
                                value={String(idx)}
                                onChange={handleStartingTimeCheck}
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
                            <input type="checkbox" name={department} value={department} />
                            <label htmlFor={department}>{department}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
const SearchBar = (props) => {
    return (
        <div id='search-bar'>
            <div>Search</div>
            <input
                type="text"
                onChange={(e) => props.controller(e.target.value)}
                value={props.value}
            />
        </div>
    )
}
const EligibleCourseToggle = () => {

    return (
        <div id='toggle-button-panel'>
            <div>
                <input type="radio" name="course-toggle" id="eligible" value={true} />
                <label htmlFor="eligible">Eligible Courses Only</label>
            </div>
            <div>
                <input type="radio" name="course-toggle" id="all" value={false} default />
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
                <td>{course.courseID}</td>
                <td>{course.courseName}</td>
                <td>{parseTimecodeArray(course.courseTime).map((str, idx) => (
                    <div key={idx}>{str}</div>
                ))}</td>
                <td>{course.courseLocation}</td>
                <td>{course.courseCapacity}</td>
            </tr>
        }
        </>
    )
}

export default CourseBrowsing