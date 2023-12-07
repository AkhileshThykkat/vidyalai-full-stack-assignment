import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [pdfPath, setPdfPath] = useState('');

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

  const handleExtract = async () => {
    try {
      const response = await axios.post('http://localhost:3001/extract', {
        fileName: file.name,
        selectedPages,
      });
      setPdfPath(response.data.newPdfPath);
    } catch (error) {
      console.error('Error extracting pages:', error);
    }
  };

  return (
    <div>
      <h1>PDF App</h1>
      <input
        type='file'
        accept='.pdf'
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>

      {pdfPath && (
        <div>
          <iframe
            title='PDF Viewer'
            src={`http://localhost:3001/pdf/${file.name}`}
            width='600'
            height='400'
          />
          <div>
            <label>Select Pages: </label>
            <input
              type='text'
              placeholder='e.g., 1, 3, 5'
              onChange={(e) =>
                setSelectedPages(
                  e.target.value.split(',').map((page) => Number(page.trim()))
                )
              }
            />
            <button onClick={handleExtract}>Extract</button>
          </div>
          <a
            href={`http://localhost:3001/pdf/${pdfPath}`}
            download>
            Download New PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
