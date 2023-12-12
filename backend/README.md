# .Pdf Server Documentation

## `pdfUtils.js` File

### Functions:

1. **`saveFile(buffer, fileName)`**

   - Saves a file with the provided buffer content and file name in the 'uploads' directory.
   - Parameters:
     - `buffer`: Buffer content of the file.
     - `fileName`: Name of the file to be saved.
   - Returns: The file path where the file is saved.

2. **`createNewPdf(fileName, selectedPages)`**
   - Creates a new PDF file by extracting selected pages from an existing PDF file.
   - Parameters:
     - `fileName`: Name of the original PDF file.
     - `selectedPages`: Array of page numbers to extract.
   - Returns: The file path of the newly created PDF.

## API Endpoints

1. **File Upload**

   - **Endpoint:** `POST /upload`
   - **Description:** Uploads a PDF file to the server.
   - **Middleware Used:**
     - `express.json()`: Parses incoming JSON payloads.
     - `express.static('uploads')`: Serves static files from the 'uploads' directory.

2. **View PDF**

   - **Endpoint:** `GET /pdf/:fileName`
   - **Description:** Views a previously uploaded PDF file.
   - **Middleware Used:**
     - `express.static('uploads')`: Serves static files from the 'uploads' directory.

3. **Extract Pages**
   - **Endpoint:** `POST /extract`
   - **Description:** Creates a new PDF file with selected pages from an existing PDF file.
   - **Middleware Used:**
     - `express.json()`: Parses incoming JSON payloads.

## Middlewares Explanation

1. **CORS (Cross-Origin Resource Sharing)**

   - **Middleware:** `cors()`
   - **Explanation:** Enables Cross-Origin Resource Sharing, allowing the server to respond to requests from different origins. This is essential for client-side applications running on different domains to interact with the server.

2. **Express JSON Parser**

   - **Middleware:** `express.json()`
   - **Explanation:** Parses incoming JSON payloads in the request body. In this application, it is used to parse the JSON payload when extracting pages from a PDF.

3. **Express Static**

   - **Middleware:** `express.static('uploads')`
   - **Explanation:** Serves static files from the 'uploads' directory. This middleware is used to make uploaded PDF files accessible to users for viewing or downloading.

4. **Multer**
   - **Middleware:** `upload.single('pdf')`
   - **Explanation:** Handles file uploads. In this application, it is configured to accept a single file with the field name 'pdf' and store it in memory for further processing.

## Server Information

- **Server URL:** `http://localhost:3001`
- **File Upload Path:** `/upload`
- **PDF View Path:** `/pdf/:fileName`
- **PDF Extraction Path:** `/extract`

---

_Note: Ensure that the server is running and accessible at the specified URL before testing the functionalities._
