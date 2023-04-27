import html2canvas from "html2canvas";

// Export given HTML element as a PNG image with given filename
const ExportAsPng = async (element, imageFileName) => {

    // Use html2canvas to create a canvas element from the given element
    const canvas = await html2canvas(element);

    // Convert the canvas element to a data URL representing a PNG image
    const image = canvas.toDataURL("image/png", 1.0);

    // Call downloadImage function with image data URL and filename parameters
    downloadImage(image, imageFileName);
};

// Download given blob as a file with given filename
const downloadImage = (blob, fileName) => {

    // Create a new hidden a element
    const hiddenLink = window.document.createElement("a");
    hiddenLink.style = "display:none;";

    // Set the download attribute to the given filename
    hiddenLink.download = fileName;

    hiddenLink.href = blob;
    document.body.appendChild(hiddenLink); 
    hiddenLink.click(); 

    // Remove the link from the document body
    document.body.removeChild(hiddenLink);

    // Remove the link from memory
    hiddenLink.remove(); 
};

export default ExportAsPng;