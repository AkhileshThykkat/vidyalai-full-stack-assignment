# .Pdf PDF Extraction and Viewer App

## Overview

Welcome to the .Pdf PDF Extraction and Viewer App! This web application simplifies the upload, viewing, and extraction of pages from PDF files. The user-friendly interface allows users to navigate through pages, select specific pages for preservation, and download the modified PDF.

## Development Insights

### Challenges Faced:

- **PDF Viewer Selection:** Finding the right library for PDF viewing posed a challenge. After experimenting with iframe, pdf-js, and @pdf-viewer, the optimal solution was discovered with the React-pdf library.

### Libraries Used:

- **Frontend:**
  - React-pdf for PDF viewing.
  - Tailwindcss for styling.

- **Backend:**
  - Pdf-lib for PDF manipulation.
  - Nodemon as a dev dependency for automatic server restarts.

### Middlewares Used:

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

### Notable Consideration:

The styling aspects of the PDF viewer could not be fully completed. However, emphasis was placed on ensuring the proper functionality of the application. Apologies for poor styling.

---

_Note: Ensure that the server is running and accessible at the specified URL before testing the functionalities._

Sources used: [React-PDF Configure PDF.js Worker](https://github.com/wojtekmaj/react-pdf#configure-pdfjs-worker)

