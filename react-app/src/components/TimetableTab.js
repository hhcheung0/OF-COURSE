import React, { useState, useEffect } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const timeSlots = [
    { startTime: '08:30', endTime: '09:15' },
    { startTime: '09:30', endTime: '10:15' },
    { startTime: '10:30', endTime: '11:15' },
    { startTime: '11:30', endTime: '12:15' },
    { startTime: '12:30', endTime: '13:15' },
    { startTime: '13:30', endTime: '14:15' },
    { startTime: '14:30', endTime: '15:15' },
    { startTime: '15:30', endTime: '16:15' },
    { startTime: '16:30', endTime: '17:15' },
    { startTime: '17:30', endTime: '18:15' },
];

const courses = [
    { courseID: 'BIOL2420', type: 'LEC', day: 'Tuesday', startTime: '08:30', endTime: '10:15', location: 'YIA Room 1' },
    { courseID: 'MGNT1040', type: 'LEC', day: 'Wednesday', startTime: '14:30', endTime: '16:15', location: 'MMW Room 1' },
];

// Define colors for each course
const courseColors = {
    BIOL2420: '#FFA07A',
    MGNT1040: '#87CEFA',
};

const TimetableTab = () => {
    return (
        <div id='homepage-timetable-tab'>
           <div id='homepage-timetable-up'>
                <Upperpart />
           </div>
           <div id='homepage-timetable-bottom'>
                <Timetable />
           </div>
        </div>
    );
}

const Upperpart = () => {
    return(
        <>
            <button>Compact mode</button>
            <button>Relax mode</button>
            <h2>Export As: </h2>
            <button>PDF (.pdf)</button>
            <button>Image (.jpg)</button>
        </>
    )
}

const rowSpanChecker = courses.map((course) => {
    const startIdx = timeSlots.findIndex(
        (timeSlot) => timeSlot.startTime === course.startTime
    );
    const endIdx = timeSlots.findIndex(
        (timeSlot) => timeSlot.endTime === course.endTime
    );

    return {
        ...course,
        rowSpan: endIdx - startIdx + 1,
    };
});

const Timetable = () => {
    return(
        <table id="homepage-timetable">
            <thead>
                <tr>
                    <th></th>
                    {days.map((day) => (<th key={day}>{day}</th>))}
                </tr>
            </thead>
            <tbody>
                {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot.startTime}>
                        <td style={{ background: '#277582', color: 'white' }}>
                            {timeSlot.startTime}
                        </td>
                        {days.map((day) => {
                            const course = rowSpanChecker.find(
                                (course) =>
                                    course.day === day &&
                                    course.startTime === timeSlot.startTime
                            );

                            if (course) {
                                return (
                                    <td
                                        key={`${day}-${timeSlot.startTime}`}
                                        style={{background: courseColors[course.courseID],}}
                                        rowSpan={course.rowSpan}
                                    >   
                                        <div>{course.courseID} [{course.type}]</div>
                                        <div>{course.location}</div>
                                    </td>
                                );
                            } else if (!rowSpanChecker.some((course) => course.day === day && course.startTime <= timeSlot.startTime && course.endTime >= timeSlot.endTime)) {
                                return (
                                    <td key={`${day}-${timeSlot.startTime}`}></td>
                                );

                            }else{
                                return null;
                            }
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
  
export default TimetableTab;