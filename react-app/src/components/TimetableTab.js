import React, { useRef } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Timetable from './TimeTable';
import ExportAsPng from './ExportPng';

const TimetableTab = ({ courseArray }) => {

    const exportRef = useRef();

    const exportToPdf = async (element, pdfFileName) => {
        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL();

        const pdf = new jsPDF();
        pdf.addImage(dataURL, 'PNG', 5, 10, 200, 100);
        pdf.save(pdfFileName);
    };

    const Upperpart = () => {
        return (
            <>
                <h2>Export As: </h2>
                <button onClick={() => exportToPdf(exportRef.current, "timetable")}>PDF (.pdf)</button>
                <button onClick={() => ExportAsPng(exportRef.current, "timetable")}>Image (.png)</button>
            </>
        )
    }

    return (
        <div id='homepage-timetable-tab'>
            <div id='homepage-timetable-up'>
                <Upperpart courseArray={courseArray} />
            </div>
            <div id='homepage-timetable-bottom' ref={exportRef}>
                {/* <Timetable /> */}
                <Timetable courseArray={courseArray} />
            </div>
        </div>
    );


}



export default TimetableTab;