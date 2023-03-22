import { useState, useEffect } from 'react'

// import custom hooks
import useCourse from '../hooks/useCourse'

const CourseBrowsing = () => {

    const { courseArray } = useCourse()
    const { course } = useCourse('CHIN4140')

    useEffect(() => {
        console.log(courseArray)
    }, [courseArray])

    useEffect(() => {
        console.log(course)
    }, [course])

    return (
        <div id='course-browsing'>
            <FilterPanel />
            <div id='table-panel'>
                <SearchBar />
                <Table />
            </div>
        </div>
    )
}
const FilterPanel = () => {
    return (
        <div id='filter-panel'>
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