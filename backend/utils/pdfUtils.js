const fs = require('fs/promises');
const { PDFDocument, rgb } = require('pdf-lib');

async function saveFile(buffer, fileName) {
  const filePath = `./uploads/${fileName}`;

  try {
    await fs.writeFile(filePath, buffer);
    return filePath;
  } catch (error) {
    throw new Error('Error saving file: ' + error.message);
  }
}

async function createNewPdf(fileName, selectedPages) {
  const filePath = `./uploads/${fileName}`;
  const outputFileName = `new_${fileName}`;
  const outputPath = `./uploads/${outputFileName}`;

  try {
    // Read the existing PDF
    const existingPdfBytes = await fs.readFile(filePath);
    const existingPdfDoc = await PDFDocument.load(existingPdfBytes);

    // Create a new PDF with selected pages
    const newPdfDoc = await PDFDocument.create();
    for (const pageNumber of selectedPages) {
      if (pageNumber >= 1 && pageNumber <= existingPdfDoc.getPageCount()) {
        const [copiedPage] = await newPdfDoc.copyPages(existingPdfDoc, [
          pageNumber - 1,
        ]);
        newPdfDoc.addPage(copiedPage);
      }
    }

    // Save the new PDF to a file
    const newPdfBytes = await newPdfDoc.save();
    await fs.writeFile(outputPath, newPdfBytes);

    return outputFileName;
  } catch (error) {
    throw new Error('Error creating new PDF: ' + error.message);
  }
}

module.exports = { saveFile, createNewPdf };
