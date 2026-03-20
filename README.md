# Xendral — Portfolio Website

> **Engineering The Future** — Official company portfolio for Xendral, a full-service digital agency based in Anna Nagar, Chennai.

---

## 🚀 Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Framework  | React 18             |
| Build Tool | Vite 5               |
| Styling    | Plain CSS + Variables|
| Fonts      | Google Fonts         |
| Database   | None (static site)   |
| Backend    | None (frontend only) |

---

## 📁 Project Structure

```
xendral/
└── frontend/
    ├── public/
    │   ├── logo_0.png          # Company icon (X symbol)
    │   ├── logo_1.png          # Wordmark
    │   ├── favicon.svg         # Auto dark/light favicon
    │   └── favicon.png
    ├── src/
    │   ├── App.jsx             # Root component
    │   ├── main.jsx            # Entry point
    │   ├── assets_b64.js       # Base64 logo data
    │   ├── components/
    │   │   ├── Navbar.jsx/.css
    │   │   ├── Hero.jsx/.css
    │   │   ├── Ticker.jsx/.css
    │   │   ├── Services.jsx/.css
    │   │   ├── About.jsx/.css
    │   │   ├── Process.jsx/.css
    │   │   ├── Team.jsx/.css
    │   │   ├── CTA.jsx/.css
    │   │   └── Footer.jsx/.css
    │   └── styles/
    │       ├── globals.css     # CSS variables + all mobile responsive
    │       └── animations.css  # Keyframes + reveal animations
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Go to frontend folder
cd xendral/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📦 Build for Production

```bash
cd xendral/frontend
npm run build
```

Output goes to `frontend/dist/` — upload this folder to deploy.

---

## 🌐 Deploy (Free Options)

### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Upload the `frontend/` folder
4. Click **Deploy**
5. Live at `yourname.vercel.app`

### Netlify
1. Run `npm run build`
2. Drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Live in seconds

### Custom Domain (xendral.in)
1. Deploy to Vercel or Netlify first
2. Go to your domain registrar
3. Add CNAME pointing `xendral.in` → your deployment URL
4. Add custom domain in Vercel/Netlify dashboard

---

## 📄 Pages & Sections

| Section   | Description                              |
|-----------|------------------------------------------|
| Navbar    | Fixed navigation with logo + CTA button  |
| Hero      | Full-screen hero with animated canvas    |
| Ticker    | Scrolling marquee banner                 |
| Services  | 10 service cards in a 5×2 grid           |
| About     | Company info + performance metrics       |
| Process   | 5-step workflow timeline                 |
| Team      | 9 team members in a 3×3 grid             |
| Contact   | CTA with email + phone links             |
| Footer    | Links, social, copyright                 |

---

## 🎨 Design System

```css
Colors:
  --bg:      #060809   /* Main background */
  --bg2:     #0A0D10   /* Section background */
  --card:    #0E1318   /* Card background */
  --green:   #4AE060   /* Primary accent */
  --white:   #EEF2F6   /* Text */
  --gray:    #8A9BAC   /* Muted text */

Fonts:
  Orbitron   → Headings
  Rajdhani   → Body text
  Space Mono → Labels & monospace
```

---

## 📞 Contact

| Channel  | Details                     |
|----------|-----------------------------|
| Phone    | 63802 74503                 |
| Email    | xendral.in@gmail.com        |
| Website  | www.xendral.in              |
| Location | Anna Nagar, Chennai, TN     |

---

*Built with React + Vite · © 2025 Xendral. All rights reserved.*
