# Deployment Guide - PDF Tools Application

## Quick Start (Docker Compose)

### Prerequisites
- Docker & Docker Compose installed
- Node.js 18+ (for local development only)

### Steps

1. **Clone or copy the project folder** to your machine.

2. **Configure environment variables** (optional):
   - Backend: copy `backend/.env.example` to `backend/.env` and edit if needed.
   - Frontend: copy `frontend/.env.local.example` to `frontend/.env.local` and set `NEXT_PUBLIC_API_URL` if your API is not at `localhost:8000`.

3. **Start the application**:
   ```bash
   docker-compose up -d
   ```

4. **Access the app**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API docs (Swagger): http://localhost:8000/docs

5. **Stop the application**:
   ```bash
   docker-compose down
   ```

---

## Development Mode (without Docker)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

---

## Production Deployment

### 1. Build Images

```bash
docker-compose build
```

### 2. Use Production docker-compose.yml

For production, consider:

- Adding a reverse proxy (nginx) to serve frontend and proxy API requests.
- Setting `NEXT_PUBLIC_API_URL` to your public API endpoint.
- Enabling HTTPS.
- Using a managed database (if you add one later).
- Setting proper CORS origins.
- Adding rate limiting.
- Using a cloud storage (S3, GCS) instead of local filesystem for scalability.

### 3. Deploy to VPS / Cloud

Example with a single server:

```bash
# Push code to server
git clone <your-repo>
cd pdf-tools-app

# Copy production env files
cp backend/.env.example backend/.env
# edit backend/.env with production values

cp frontend/.env.local.example frontend/.env.local
# edit frontend/.env.local

# Start
docker-compose -f docker-compose.prod.yml up -d
```

---

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   FastAPI       │
│   (Port 3000)   │◄──►│   (Port 8000)   │
│                 │    │                 │
│ - Next.js       │    │ - /api/tools/* │
│ - Tailwind CSS  │    │ - File upload  │
│ - API Routes    │    │ - Processing   │
│   (proxy to     │    │ - Cleanup      │
│   backend)      │    │                 │
└─────────────────┘    └────────┬────────┘
                                   │
                                   ▼
                         ┌─────────────────┐
                         │  Local Storage  │
                         │  - uploads/     │
                         │  - outputs/     │
                         │  (auto-delete)  │
                         └─────────────────┘
```

---

## Available Tools

### Implemented
- ✅ Merge PDF (with optional compress)
- ✅ Split PDF
- ✅ Compress PDF
- ✅ PDF to Word
- ✅ Word to PDF

### Placeholder (coming soon)
- PDF to Image
- Image to PDF
- PDF to TXT
- TXT to PDF

---

## API Reference

See [API.md](./API.md) for full API documentation.

---

## Notes

- All uploaded files are automatically deleted after 24 hours (configurable via `AUTO_DELETE_HOURS`).
- Maximum file size: 50MB (configurable).
- Processing is synchronous; for large files consider adding a task queue (Celery).
- The current PDF processing uses basic PyPDF2; for better compression/conversion quality, integrate more advanced libraries (e.g., `pdf2docx`, `img2pdf`, `ghostscript`).
- In production, use a proper storage backend (S3, GCS) and CDN.

---

## Troubleshooting

**Backend not starting:**
- Ensure Python 3.11+ is installed (or Docker is running).
- Check port 8000 is free.

**Frontend not starting:**
- Ensure Node.js 18+ is installed.
- Check port 3000 is free.

**CORS errors:**
- The backend allows all origins by default. In production, set `ALLOWED_ORIGINS` in backend `.env`.

**File uploads failing:**
- Check that `UPLOAD_DIR` and `OUTPUT_DIR` exist and are writable.
- Verify file size does not exceed limit.

---

## License

MIT
