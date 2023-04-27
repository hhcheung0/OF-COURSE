import React, { useRef } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Timetable from './TimeTable';
import ExportAsPng from './ExportPng';

const TimetableTab = ({ courseArray }) => {

    // Create a reference for the element to be exported
    const exportRef = useRef();

    // Export the given element as a PDF with the given filename
    const exportToPdf = async (element, pdfFileName) => {

        // Use html2canvas to create a canvas element from the given element
        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL();

        // Create a new jsPDF object
        const pdf = new jsPDF();

        // Add the image to the PDF object
        pdf.addImage(dataURL, 'PNG', 5, 10, 200, 100);

        // Download the PDF with the given filename
        pdf.save(pdfFileName);
    };

    // For the upper part of the timetable tab
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