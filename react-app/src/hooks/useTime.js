const useTime = () => {

    const validPrefix = ['M', 'T', 'W', 'H', 'F']
    const prefixMap = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri']
    const validTimeslot = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const timeslotMap = ['08:30-09:15', '09:30-10:15', '10:30-11:15', '11:30-12:15', '12:30-13:15', '13:30-14:15', '14:30-15:15', '15:30-16:15', '16:30-17:15', '17:30-18:15']

    // parse timecode (e.g. 'M0') into datetime (e.g. 'Mon 08:30-09:15')
    const parseTimecode = (timecode) => {
        // early termination for invalid timecode
        if (!validateTimecode(timecode)) return { error: 'timecode is invalid'}

        // return required string
        return `${prefixMap[validPrefix.indexOf(timecode[0])]} ${timeslotMap[validTimeslot.indexOf(timecode[1])]}`
    }

    // validate timecode, return boolean
    const validateTimecode = (timecode) => {
        return timecode.length === 2 && validPrefix.includes(timecode[0]) && validTimeslot.includes(timecode[1])
    }

    return {
        parseTimecode
    }
}

export default useTime