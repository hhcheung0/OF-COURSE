import { useState, useEffect } from 'react'

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'
import useConstant from '../hooks/useConstant'

const CourseBrowsing = () => {

    const { courseArray } = useCourse()
    const { parseTimecodeArray } = useTime()

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
                <Table />
            </div>
        </div>
    )
}
const FilterList = () => {

    const { classStartingTimeList, departmentList } = useConstant()

    return (
        <div id='filter-list'>
            <div id='starting-time-filter'>
                <h3>Class Starting Time</h3>
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
                <h3>Department</h3>
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
const Table = () => {
    return (
        <div>Table</div>
    )
}

export default CourseBrowsing