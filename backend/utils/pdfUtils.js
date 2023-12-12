const fs = require('fs/promises');
const { PDFDocument } = require('pdf-lib');

async function saveFile(buffer, fileName) {
  const filePath = `./uploads/${fileName}`;

  try {
    await fs.writeFile(filePath, buffer);
    return filePath;
  } catch (error) {
    throw new Error(`Error on saving : ${error.message}`);
  }
}

async function createNewPdf(fileName, selectedPages) {
  console.log(selectedPages);
  const filePath = `./uploads/${fileName}`;
  const outputFileName = `new_${fileName}`;
  const outputPath = `./uploads/${outputFileName}`;

  try {
    const existingPdfBytes = await fs.readFile(filePath);
    const existingPdfDoc = await PDFDocument.load(existingPdfBytes);

    const newPdfDoc = await PDFDocument.create();
    for (const pageNumber of selectedPages) {
      if (pageNumber >= 1 && pageNumber <= existingPdfDoc.getPageCount()) {
        const [copiedPage] = await newPdfDoc.copyPages(existingPdfDoc, [
          pageNumber - 1,
        ]);
        newPdfDoc.addPage(copiedPage);
      }
    }

    const newPdfBytes = await newPdfDoc.save(); //Saving the Pdf file
    await fs.writeFile(outputPath, newPdfBytes);

    return outputFileName;
  } catch (error) {
    throw new Error(`Error on saving : ${error.message}`);
  }
}

module.exports = { saveFile, createNewPdf };
