const useTime = () => {

    const validPrefix = ['M', 'T', 'W', 'H', 'F']
    const prefixMap = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri']
    const validTimeslot = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const timeslotMap = [
        ['08:30', '09:15'],
        ['09:30', '10:15'],
        ['10:30', '11:15'],
        ['11:30', '12:15'],
        ['12:30', '13:15'],
        ['13:30', '14:15'],
        ['14:30', '15:15'],
        ['15:30', '16:15'],
        ['16:30', '17:15'],
        ['17:30', '18:15']
    ]

    // parse the array of timecode into an array of daily language
    // ["T6", "T7", "H6"] -> ['Tue 14:30:16:15', 'Thur 14:30:15:15']
    const parseTimecodeArray = (timecodeArray) => {
        // early termination for invalid timecode
        if (!timecodeArray) return []
        if (!timecodeArray.every(timecode => validateTimecode(timecode))) return { error: 'some timecode is invalid' }

        // declare a 2D array that group timeslots in the same day
        // e.g. [["T6", "T7"], ["H6"]]
        const timecodeGroupArray = []

        // loop through the prefix, group the timecode at the same day and push to 2D array
        for (const prefix of validPrefix) {
            const timecodeGroup = timecodeArray.filter((timecode) => timecode[0] === prefix)
            if (timecodeGroup.length) timecodeGroupArray.push(timecodeGroup.sort())
        }

        // declare string array for output
        const stringArray = []

        // loop through timecode array of same day
        for (const timecodeGroup of timecodeGroupArray) {
            // get the prefix by mapping
            const prefix = prefixMap[validPrefix.indexOf(timecodeGroup[0][0])]

            // storage array for storing consecutive timecode
            const storage = []

            // group the consecutive timecode by two pointer method
            let [left, right] = [0, 1]
            while (left < timecodeGroup.length) {
                // for right pointer out of bound, push the current range
                if (right >= timecodeGroup.length) {
                    storage.push(timecodeGroup.slice(left, right))
                    left = right
                    right++
                    break
                }
                // for right pointer is not the consecutive of the previous element, push the current range
                if (Number(timecodeGroup[right][1]) !== Number(timecodeGroup[right-1][1])+1) {
                    storage.push(timecodeGroup.slice(left, right))
                    left = right
                    right++
                }
                // for the right pointer is the consecutive of the previous element, right pointer++
                else right++
            }
            stringArray.push(`${prefix} ${storage.map(range => (getStartingTime(range[0])+':'+getEndingTime(range.pop()))).join(', ')}`)
        }
        return stringArray
    }

    // validate timecode, return boolean
    // "H1" => true, "M10" -> false
    const validateTimecode = (timecode) => {
        return timecode.length === 2 && validPrefix.includes(timecode[0]) && validTimeslot.includes(timecode[1])
    }
    // get class starting time by timecode
    // "F1" => '09:30'
    const getStartingTime = (timecode) => {
        return timeslotMap[validTimeslot.indexOf(timecode[1])][0]
    }
    // get class ending timeby timecode
    // "F1" => '10:15'
    const getEndingTime = (timecode) => {
        return timeslotMap[validTimeslot.indexOf(timecode[1])][1]
    }

    return {
        parseTimecodeArray
    }
}

export default useTime