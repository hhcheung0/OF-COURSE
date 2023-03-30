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
    const weekdayList = [
        ['M', 'Monday'],
        ['T', 'Tuesday'],
        ['W', 'Wednesday'],
        ['H', 'Thursday'],
        ['F', 'Friday']
    ]

    return {
        departmentList,
        classTimeList,
        weekdayList
    }
}

export default useConstant