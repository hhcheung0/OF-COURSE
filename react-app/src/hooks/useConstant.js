const useConstant = () => {

    const departmentList = [
        "Accountancy",
        "Anthropology",
        "Arabic",
        "Architectural Studies",
        "Biology",
        "Chemistry",
        "Chinese",
        "Chinese Language",
        "Computer Science",
        "Economics",
        "Education",
        "English Language",
        "Finance",
        "French",
        "Geography",
        "History",
        "Law",
        "Management",
        "Marketing",
        "Mathematics",
        "Music",
        "Nursing",
        "Philosophy",
        "Physics",
        "Pyschology",
        "Spanish",
        "Thai",
        "Theology",
        "Translation"
    ]
    const classStartingTimeList = [
        '08:30',
        '09:30',
        '10:30',
        '11:30',
        '12:30',
        '13:30',
        '14:30',
        '15:30',
        '16:30',
        '17:30'
    ]

    return {
        departmentList,
        classStartingTimeList
    }
}

export default useConstant