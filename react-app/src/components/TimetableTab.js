import React, { useState, useEffect } from 'react';
import Timetable from './TimeTable';

const TimetableTab = ({courseArray}) => {

    return (
        <div id='homepage-timetable-tab'>
           <div id='homepage-timetable-up'>
                <Upperpart />
           </div>
           <div id='homepage-timetable-bottom'>
                {/* <Timetable /> */}
                <Timetable courseArray={courseArray} />
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
  
export default TimetableTab;