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

const subjects = [
    { courseID: 'BIOL2420', type: 'LEC', day: 'Tuesday', startTime: '08:30', endTime: '10:15', location: 'YIA Room 1' },
    { courseID: 'MGNT1040', type: 'LEC', day: 'Wednesday', startTime: '14:30', endTime: '16:15', location: 'MMW Room 1' },
];

// Define colors for each course
const subjectColors = {
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

const rowSpanChecker = subjects.map((subject) => {
    const startIdx = timeSlots.findIndex(
        (timeSlot) => timeSlot.startTime === subject.startTime
    );
    const endIdx = timeSlots.findIndex(
        (timeSlot) => timeSlot.endTime === subject.endTime
    );

    return {
        ...subject,
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
                            const subject = rowSpanChecker.find(
                                (subject) =>
                                    subject.day === day &&
                                    subject.startTime === timeSlot.startTime
                            );

                            if (subject) {
                                return (
                                    <td
                                        key={`${day}-${timeSlot.startTime}`}
                                        style={{background: subjectColors[subject.courseID],}}
                                        rowSpan={subject.rowSpan}
                                    >   
                                        <div>{subject.courseID} [{subject.type}]</div>
                                        <div>{subject.location}</div>
                                    </td>
                                );
                            } else if (!rowSpanChecker.some((subject) => subject.day === day && subject.startTime <= timeSlot.startTime && subject.endTime >= timeSlot.endTime)) {
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