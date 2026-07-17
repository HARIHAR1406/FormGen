import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, ImageRun } from 'docx';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

/**
 * Helper to generate high-quality canvas from DOM element
 */
const generateCanvas = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} not found`);

  return await html2canvas(element, {
    scale: 2, // High resolution
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: element.scrollWidth,
    height: element.scrollHeight,
  });
};

export const exportToPDF = async (elementId, filename = 'document.pdf') => {
  const toastId = toast.loading('Generating PDF...');
  try {
    const canvas = await generateCanvas(elementId);
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const ratio = canvas.width / canvas.height;
    const contentWidth = pdfWidth;
    const contentHeight = contentWidth / ratio;

    let heightLeft = contentHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, contentWidth, contentHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - contentHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, contentWidth, contentHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    toast.success('PDF Exported Successfully!', { id: toastId });
  } catch (error) {
    console.error('PDF Export Error:', error);
    toast.error('Failed to export PDF', { id: toastId });
  }
};

export const exportToPNG = async (elementId, filename = 'document.png') => {
  const toastId = toast.loading('Generating PNG...');
  try {
    const canvas = await generateCanvas(elementId);
    const dataUrl = canvas.toDataURL('image/png');
    
    // Trigger download
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    
    toast.success('PNG Exported Successfully!', { id: toastId });
  } catch (error) {
    console.error('PNG Export Error:', error);
    toast.error('Failed to export PNG', { id: toastId });
  }
};

export const exportToJPEG = async (elementId, filename = 'document.jpg') => {
  const toastId = toast.loading('Generating JPEG...');
  try {
    const canvas = await generateCanvas(elementId);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95); // High quality
    
    // Trigger download
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    
    toast.success('JPEG Exported Successfully!', { id: toastId });
  } catch (error) {
    console.error('JPEG Export Error:', error);
    toast.error('Failed to export JPEG', { id: toastId });
  }
};

export const exportToDOCX = async (elementId, filename = 'document.docx') => {
  const toastId = toast.loading('Generating DOCX (High Fidelity)...');
  try {
    // 1. Generate high-quality image of the document
    const canvas = await generateCanvas(elementId);
    
    // Convert canvas to blob (arrayBuffer) for docx
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
    const arrayBuffer = await blob.arrayBuffer();

    // 2. Calculate aspect ratio to fit A4 page in Word
    // A4 size in Word is typically ~794 x 1123 pixels (at 96 DPI)
    const A4_WIDTH_PX = 790;
    const ratio = canvas.width / canvas.height;
    const heightPx = A4_WIDTH_PX / ratio;

    // 3. Create DOCX document with the embedded image
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
          },
        },
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: arrayBuffer,
                transformation: {
                  width: A4_WIDTH_PX,
                  height: heightPx,
                },
              }),
            ],
          }),
        ],
      }],
    });

    // 4. Generate and save the file
    const outputBlob = await Packer.toBlob(doc);
    saveAs(outputBlob, filename);
    
    toast.success('DOCX Exported Successfully!', { id: toastId });
  } catch (error) {
    console.error('DOCX Export Error:', error);
    toast.error('Failed to export DOCX', { id: toastId });
  }
};

export const printDocument = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print Document</title>
      <style>
        body { margin: 0; padding: 0; }
        @media print { body { -webkit-print-color-adjust: exact; } }
      </style>
    </head>
    <body>${element.outerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
};
