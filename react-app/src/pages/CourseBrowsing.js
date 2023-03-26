import { useState, useEffect } from 'react'

// import custom hooks
import useCourse from '../hooks/useCourse'
import useTime from '../hooks/useTime'

const CourseBrowsing = () => {

    const { courseArray } = useCourse()
    const { parseTimecodeArray } = useTime()

    useEffect(() => {
        console.log(courseArray)
    }, [courseArray])


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

    const { timeslotMap } = useTime()

    return (
        <div id='filter-list'>
            <div id='starting-time-filter'>
                <h3>Class Starting Time</h3>
                <div id='checkbox-container'>
                    {timeslotMap.map((timeslot, idx) => (
                        <div id='checkbox' key={idx}>
                            <input type="checkbox" name={timeslot[0]} value={String(idx)} />
                            <label htmlFor={timeslot[0]}>{timeslot[0]}</label>
                        </div>
                    ))}
                </div>
            </div>
            Filter
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