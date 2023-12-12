const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs/promises'); // Import the 'fs' module for file operations
const { createNewPdf } = require('./utils/pdfUtils.js');
const path = require('path');
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function saveFile(buffer, fileName) {
  // const filePath = `./uploads/${fileName}`;
  const filePath = path.join(__dirname, 'uploads', fileName);

  try {
    await fs.writeFile(filePath, buffer);
    return filePath;
  } catch (error) {
    throw new Error('Error saving file: ' + error.message);
  }
}

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const filePath = await saveFile(req.file.buffer, req.file.originalname);
    return res.json({ filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file' });
  }
});
app.get('/pdf/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  return res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      if (!res.headersSent) {
        return res.status(500).send('Something went wrong!');
      }
    }
  });
});

app.post('/extract', async (req, res) => {
  const { fileName, selectedPages } = req.body;
  console.log(selectedPages);
  try {
    const outputPdf = await createNewPdf(fileName, selectedPages);
    return res.json({ success: true, newPdfPath: outputPdf });
  } catch (error) {
    console.error('Error extracting pages:', error);
    return res.status(500).json({ error: 'Error extracting pages' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
