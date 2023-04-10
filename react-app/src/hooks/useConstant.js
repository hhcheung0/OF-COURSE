import { useRef } from "react"

const useConstant = () => {

    const departmentList = [
        'Accountancy',      'Anthropology',
        'Arabic',           'Architectural Studies',
        'Chemistry',        'Chinese',
        'Chinese Language', 'Computer Science',
        'Economics',        'Education',
        'English Language', 'Finance',
        'French',           'Geography',
        'History',          'Law',
        'Management',       'Marketing',
        'Mathematics',      'Music',
        'Nursing',          'Philosophy',
        'Physics',          'Pyschology',
        'Spanish',          'Thai',
        'Theology',         'Translation'
      ]
    const classTimeList = [
        '08:30-09:15',
        '09:30-10:15',
        '10:30-11:15',
        '11:30-12:15',
        '12:30-13:15',
        '13:30-14:15',
        '14:30-15:15',
        '15:30-16:15',
        '16:30-17:15',
        '17:30-18:15'
    ]
    const {current: weekdayList} = useRef([
        ['M', 'Monday'],
        ['T', 'Tuesday'],
        ['W', 'Wednesday'],
        ['H', 'Thursday'],
        ['F', 'Friday']
    ])

    // credit: hangkhun
    const {current: TimetableColorList} = useRef([
        '#ffd5d5', 
        '#ffe7d5', 
        '#fff8d5', 
        '#f0ffd5', 
        '#d9ffd5', 
        '#d5ffee', 
        '#d5feff', 
        '#d5eeff', 
        '#d5d6ff', 
        '#eed5ff', 
        '#fdd5ff', 
        '#ffd5f2', 
        '#f78686', 
        '#f7c086', 
        '#f7f586', 
        '#86f78b', 
        '#86f7e6', 
        '#86bef7', 
        '#a686f7', 
        '#f786df'  
      ]);

    return {
        departmentList,
        classTimeList,
        weekdayList,
        TimetableColorList
    }
}

export default useConstant