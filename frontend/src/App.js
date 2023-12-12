import React, { useState } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  const [file, setFile] = useState(null);
  const [pdfPath, setPdfPath] = useState('');
  const [extractionSuccess, setExtractionSuccess] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(true);

  const togglePdfViewer = () => {
    setShowPdfViewer((prev) => !prev);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post(
        'http://localhost:3001/upload',
        formData
      );
      setPdfPath(response.data.filePath);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const goToPrevPage = () =>
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));

  const goToNextPage = () =>
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));

  const handleExtract = async () => {
    try {
      const response = await axios.post('http://localhost:3001/extract', {
        fileName: file.name,
        selectedPages,
      });
      setPdfPath(response.data.newPdfPath);
      setExtractionSuccess(true);
    } catch (error) {
      console.error('Error extracting pages:', error);
      setExtractionSuccess(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSelectedPagesChange = (event) => {
    const selectedPage = pageNumber;

    if (event.target.checked) {
      setSelectedPages((prevPages) => [...prevPages, selectedPage]);
    } else {
      setSelectedPages((prevPages) =>
        prevPages.filter((page) => page !== selectedPage)
      );
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-start h-screen bg-gradient-to-r from-sky-200 to-white'>
      {/* Left Column (for insertion and selection) */}
      <div className='md:w-1/3 lg:w-2/4 xl:w-2/5'>
        <h1 className='text-4xl font-bold mb-8 text-black hover:underline cursor-pointer'>
          <span className='text-red-500'>.</span> Pdf
        </h1>

        <div className='bg-gradient-to-r from-sky-200 to-white rounded-lg p-8 shadow-lg w-full'>
          <input
            type='file'
            accept='.pdf'
            onChange={handleFileChange}
            className='mb-4 p-2 w-full'
          />

          <button
            onClick={handleUpload}
            className='bg-blue-500 text-white px-2 py-1 rounded w-full'>
            Upload
          </button>

          <nav className='flex justify-between w-full p-4'>
            <button
              onClick={goToPrevPage}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
              Prev
            </button>
            <button
              onClick={goToNextPage}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
              Next
            </button>
          </nav>

          <p className='text-center mt-2'>
            Page {pageNumber} of {numPages}
            <label className='ml-2'>
              <input
                type='checkbox'
                checked={selectedPages.includes(pageNumber)}
                onChange={handleSelectedPagesChange}
              />
              Preserve Page
            </label>
          </p>

          {pdfPath && showPdfViewer && (
            <div className='mt-8'>
              <button
                onClick={handleExtract}
                className='px-3 py-1 bg-green-400'>
                Extract
              </button>
              {extractionSuccess && (
                <p className='text-green-500 font-bold mb-4'>
                  Extraction successful!
                </p>
              )}

              <a
                href={`http://localhost:3001/pdf/${pdfPath}`}
                download
                className='bg-blue-500 text-white px-3 py-1 rounded block text-center'>
                Download New PDF
              </a>
            </div>
          )}

          {/* Toggle button for the PDF viewer */}
          <button
            onClick={togglePdfViewer}
            className='mt-4 bg-gray-300 text-gray-700 px-2 py-1 rounded w-full'>
            {showPdfViewer ? 'Hide PDF Viewer' : 'Show PDF Viewer'}
          </button>
        </div>
      </div>

      {/* Right Column (for PDF viewer) */}
      <div className='md:w-2/3 lg:w-2/4 xl:w-3/5'>
        <div className='bg-gradient-to-r from-sky-200 to-white rounded-lg p-8 shadow-lg w-full h-full'>
          {pdfPath && showPdfViewer && (
            <div className='mt-8 w-[500px] h-[500px] mx-auto'>
              <Document
                file={`http://localhost:3001/pdf/${file.name}`}
                onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
