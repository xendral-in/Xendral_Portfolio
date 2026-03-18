# Xendral Portfolio — Full-Stack Application

> React · FastAPI · MongoDB  
> Exact pixel-faithful rebuild of the Xendral company portfolio

---

## 📁 Project Structure

```
xendral/
├── frontend/                        # React 18 + Vite
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.jsx                  # Root component + scroll reveal
│   │   ├── styles/
│   │   │   ├── globals.css          # CSS variables, fonts, shared styles
│   │   │   └── animations.css       # All keyframes (fadeUp, spin, blink, ticker…)
│   │   ├── components/
│   │   │   ├── Navbar.jsx/.css      # Fixed nav with green line animation
│   │   │   ├── Hero.jsx/.css        # Canvas network, code cards, stat pills
│   │   │   ├── Ticker.jsx/.css      # Scrolling green marquee
│   │   │   ├── Services.jsx/.css    # 5×2 service grid with hover FX
│   │   │   ├── About.jsx/.css       # Animated counters + tech chips
│   │   │   ├── Process.jsx/.css     # 5-step numbered process timeline
│   │   │   ├── CTA.jsx/.css         # Contact form → POST /api/contact
│   │   │   └── Footer.jsx/.css      # Brand + links + status indicator
│   │   ├── hooks/
│   │   │   ├── useScrollReveal.js   # IntersectionObserver reveal
│   │   │   └── useCountUp.js        # Animated number counters
│   │   └── utils/
│   │       └── api.js               # All fetch calls to FastAPI
│   ├── index.html
│   ├── vite.config.js               # Dev proxy: /api → localhost:8000
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf                   # Production SPA + API proxy
│
├── backend/                         # FastAPI + Motor (async MongoDB)
│   ├── app/
│   │   ├── main.py                  # App factory, CORS, router mount
│   │   ├── database.py              # Motor client, connect/close, indexes
│   │   ├── routers/
│   │   │   ├── contact.py           # POST /api/contact
│   │   │   ├── services.py          # GET  /api/services
│   │   │   └── submissions.py       # GET  /api/submissions (admin)
│   │   └── models/
│   │       ├── contact.py           # ContactIn / ContactOut / ContactResponse
│   │       └── service.py           # ServiceOut
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
└── docker-compose.yml               # One-command full-stack dev environment
```

---

## 🚀 Quick Start (Local without Docker)

### Prerequisites
- Node.js 20+
- Python 3.12+
- MongoDB 7 running locally on port 27017

### 1 — Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy env file
cp .env.example .env

# Start FastAPI dev server
uvicorn app.main:app --reload --port 8000
```

API docs available at: http://localhost:8000/docs

### 2 — Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server (proxies /api → localhost:8000)
npm run dev
```

App available at: http://localhost:5173

---

## 🐳 Quick Start (Docker — Recommended)

```bash
# Start all services: MongoDB + FastAPI + React
docker compose up --build

# Run in background
docker compose up -d --build
```

| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:5173       |
| API       | http://localhost:8000       |
| API Docs  | http://localhost:8000/docs  |
| MongoDB   | mongodb://localhost:27017   |

---

## 🌐 API Endpoints

### Public

| Method | Path           | Description                     |
|--------|----------------|---------------------------------|
| POST   | /api/contact   | Submit a project enquiry        |
| GET    | /api/services  | List all services (from MongoDB)|
| GET    | /health        | Health check                    |

### Admin (not in Swagger docs)

| Method | Path                              | Description              |
|--------|-----------------------------------|--------------------------|
| GET    | /api/submissions                  | All contact submissions  |
| PATCH  | /api/submissions/{id}/status      | Update status            |
| DELETE | /api/submissions/{id}             | Delete submission        |

### Example: Submit contact

```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":    "Arjun Kumar",
    "email":   "arjun@startup.in",
    "company": "TechStartup",
    "service": "Web Development",
    "budget":  "₹1L – ₹5L",
    "message": "We need a full-stack web app for our fintech startup."
  }'
```

---

## 🎨 Design System

| Token       | Value      | Usage                       |
|-------------|------------|-----------------------------|
| `--bg`      | `#060809`  | Primary background          |
| `--bg2`     | `#0A0D10`  | Section backgrounds         |
| `--card`    | `#0E1318`  | Card backgrounds            |
| `--green`   | `#4AE060`  | Primary accent              |
| `--green2`  | `#2DB840`  | Hover accent                |
| `--white`   | `#EEF2F6`  | Primary text                |
| `--gray`    | `#8A9BAC`  | Secondary text              |
| `--font-h`  | Orbitron   | Headings                    |
| `--font-b`  | Rajdhani   | Body text                   |
| `--font-m`  | Space Mono | Labels, code, monospace     |

---

## 🏗️ Production Deployment

### Build frontend

```bash
cd frontend
npm run build          # outputs to dist/
```

### Run backend with Gunicorn

```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Full production with Docker

```bash
# Build production images
docker compose -f docker-compose.prod.yml up --build -d
```

### Environment Variables (Backend)

| Variable      | Default                    | Description            |
|---------------|----------------------------|------------------------|
| MONGODB_URL   | mongodb://localhost:27017   | MongoDB connection URI |
| DB_NAME       | xendral                    | Database name          |

---

## 📦 MongoDB Collections

### `contacts`
Stores all project enquiry submissions from the contact form.

```json
{
  "_id":        "ObjectId",
  "name":       "string",
  "email":      "string",
  "company":    "string | null",
  "service":    "string",
  "budget":     "string | null",
  "message":    "string",
  "status":     "new | read | replied",
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

### `services`
Service catalogue. Auto-seeded on first API call.

```json
{
  "num":  "01",
  "icon": "🤖",
  "name": "AI & Machine Learning",
  "slug": "ai-ml",
  "desc": "..."
}
```

---

## 🛠 Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React 18, Vite, CSS Modules   |
| Backend   | FastAPI, Pydantic v2, Uvicorn |
| Database  | MongoDB 7, Motor (async)      |
| Container | Docker, Docker Compose        |
| Proxy     | Nginx (production)            |
| Fonts     | Google Fonts (Orbitron, Rajdhani, Space Mono) |
