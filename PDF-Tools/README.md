# PDF Tools Application

[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009485?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

Full-stack PDF manipulation platform dengan Next.js + FastAPI, containerized dengan Docker.

---

## 📑 Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Production Deployment](#production-deployment)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Development](#development)
- [Monitoring & Maintenance](#monitoring-maintenance)
- [Known Limitations](#known-limitations)
- [License](#license)

---

<a name="features"></a>
## ✨ Features

| Category | Tools |
|----------|-------|
| **Conversion** | PDF ↔ Word, PDF ↔ Image, PDF ↔ TXT |
| **Organize** | Merge, Split, Compress PDF |
| **UI/UX** | Drag & drop, progress tracking, responsive |
| **Backend** | Async processing, file validation, auto-cleanup |

---

<a name="screenshots"></a>
## 📸 Screenshots

Place screenshots in `docs/screenshots/` and reference them here.

<div align="center">
  <img src="docs/screenshots/homepage.png" alt="Homepage" width="80%"/>
</div>

*Fig 1. Homepage – tools grid*

<div align="center">
  <img src="docs/screenshots/merge.png" alt="Merge PDF" width="80%"/>
</div>

*Fig 2. Merge PDF tool*

---

<a name="quick-start"></a>
## 🚀 Quick Start

```bash
cd Projek/PDF-Tools
docker compose up -d
```

Wait ~2 minutes for build. Then open:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/docs

---

<a name="prerequisites"></a>
## 📋 Prerequisites

- Docker Engine (>=20.10) & Docker Compose (v2)
- 2 GB RAM minimum (4+ GB recommended)
- Ports 3000 and 8000 open in firewall

<a name="install-docker-ubuntu-debian"></a>
### Install Docker (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
newgrp docker
```

---

<a name="production-deployment"></a>
## 🏭 Production Deployment

<a name="initial-setup"></a>
### 1. Initial Setup

```bash
# Transfer project files to server
git clone <your-repo>
cd Projek/PDF-Tools

# Build and start
docker compose up -d

# Check status
docker compose ps
```

<a name="reverse-proxy-nginx--ssl"></a>
### 2. Reverse Proxy (Nginx) + SSL

```nginx
# /etc/nginx/sites-available/pdf-tools
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Then:
```bash
sudo ln -s /etc/nginx/sites-available/pdf-tools /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
# Get SSL: certbot --nginx -d yourdomain.com
```

<a name="firewall"></a>
### 3. Firewall

Only expose 80/443 publicly.

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 3000
sudo ufw deny 8000
```

<a name="auto-cleanup-cron"></a>
### 4. Auto-Cleanup (Cron)

```bash
crontab -e
# Add: run every hour
0 * * * * curl -s http://localhost:8000/api/cleanup >/dev/null
```

<a name="persistent-storage-optional"></a>
### 5. Persistent Storage (Optional)

Edit `docker-compose.yml` to mount host directories or S3 buckets for `uploads/` and `outputs/`.

---

<a name="configuration"></a>
## ⚙️ Configuration

Environment variables (edit `docker-compose.yml`):

| Variable | Default | Description |
|----------|---------|-------------|
| `MAX_FILE_SIZE` | `52428800` (50MB) | Max upload size in bytes |
| `AUTO_DELETE_HOURS` | `24` | Auto-delete files after N hours |
| `UPLOAD_DIR` | `/app/uploads` | Backend upload directory |
| `OUTPUT_DIR` | `/app/outputs` | Backend output directory |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Frontend API endpoint |

---

<a name="architecture"></a>
## 🏗️ Architecture

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python 3.11
- **Processing Libraries**: PyPDF2, pdfplumber, python-docx, Pillow, pdf2image, ReportLab, img2pdf
- **Storage**: Local filesystem with periodic cleanup

---

<a name="project-structure"></a>
## 📁 Project Structure

```
Projek/PDF-Tools/
├── frontend/          # Next.js application
│   ├── app/
│   ├── components/
│   └── public/
├── backend/           # FastAPI server
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── README.md
├── DEPLOYMENT.md
└── .gitignore
```

---

<a name="development"></a>
## 💻 Development

### Frontend only

```bash
cd frontend
npm install
npm run dev
```

### Backend only

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

<a name="monitoring-maintenance"></a>
## 📊 Monitoring & Maintenance

### View Logs

```bash
docker compose logs -f frontend
docker compose logs -f backend
```

### Restart Services

```bash
docker compose restart
```

### Update & Rebuild

```bash
git pull
docker compose up --build -d
```

### Health Check

```bash
curl http://localhost:8000/health
# Expected: {"status":"ok","timestamp":"..."}
```

---

<a name="known-limitations"></a>
## ⚠️ Known Limitations

- **PDF → Word**: placeholder (static text only); true formatting not yet implemented
- **Compress**: simple copy; no downsample, no stream compression
- **Auth**: None (public API); consider adding API key for production
- **Tests**: No unit/integration tests yet
- **Auto-cleanup**: Manual cron recommended; in-app cleanup only via `/api/cleanup`

Planned: real PDF→Word with layout preservation, image downsampling for compression, auth, tests.

---

<a name="license"></a>
## 📄 License

MIT