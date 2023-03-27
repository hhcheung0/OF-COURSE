import { useState, useEffect } from 'react'

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'

const CourseBrowsing = () => {

    const { courseArray } = useCourse()

    // useEffect(() => {
    //     console.log(courseArray)
    //     if (courseArray[0]) {
    //         console.log(courseArray[0].courseTime)
    //         console.log(parseTimecodeArray(courseArray[0].courseTime))
    //     }
    // }, [courseArray])

    return (
        <div id='course-browsing'>
            <FilterList />
            <div id='table-panel'>
                <SearchBar />
                <CourseTable courseArray={courseArray} />
            </div>
        </div>
    )
}
const FilterList = () => {

    const { classStartingTimeList, departmentList } = useConstant()

    return (
        <div id='filter-list'>
            <div id='starting-time-filter'>
                <div id='filter-header'>Class Starting Time</div>
                <div id='checkbox-container'>
                    {classStartingTimeList.map((timeslot, idx) => (
                        <div id='checkbox' key={idx}>
                            <input type="checkbox" name={timeslot} value={String(idx)} />
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
const SearchBar = () => {
    return (
        <div id='search-bar'>SearchBar</div>
    )
}
const CourseTable = ({courseArray}) => {
    const { parseTimecodeArray } = useTime()

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
                    {courseArray && courseArray.slice(0, 27).map((course, idx) => (
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