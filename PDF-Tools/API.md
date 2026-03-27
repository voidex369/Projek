# Backend API Routes

## POST /api/tools/merge
Merge multiple PDF files.

**Params:**
- `files[]` ( UploadFile) - PDF files to merge (min 2)
- `compress` (bool) - Whether to compress after merge (default: false)
- `compression_level` (string) - 'low', 'medium', 'high'

**Returns:** PDF file

---

## POST /api/tools/split
Split a PDF into pages.

**Params:**
- `file` (UploadFile) - PDF file to split
- `strategy` (string) - 'all' or 'range'

**Returns:** ZIP file with split pages

---

## POST /api/tools/compress
Compress a PDF file.

**Params:**
- `file` (UploadFile) - PDF file to compress
- `level` (string) - 'low', 'medium', 'high'

**Returns:** Compressed PDF file

---

## POST /api/tools/convert/pdf-to-word
Convert PDF to Word document.

**Params:**
- `file` (UploadFile) - PDF file to convert
- `preserve_formatting` (bool) - Keep layout (default: true)
- `include_images` (bool) - Extract images (default: true)

**Returns:** DOCX file

---

## GET /health
Health check endpoint.

---

## POST /api/cleanup
Manual cleanup of old files.

**Params:**
- `hours` (int) - Delete files older than N hours (default: 24)
