import html2canvas from "html2canvas";

const ExportAsPng = async (element, imageFileName) => {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
};

const downloadImage = (blob, fileName) => {
    const hiddenLink = window.document.createElement("a");
    hiddenLink.style = "display:none;";
    hiddenLink.download = fileName;

    hiddenLink.href = blob;

    document.body.appendChild(hiddenLink); 
    hiddenLink.click(); 
    document.body.removeChild(hiddenLink);

    hiddenLink.remove(); 
};

export default ExportAsPng;