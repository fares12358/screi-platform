# SCREI — State Cyber Response Escalation Index

**A Legal-Bayesian Decision-Support Platform for Proportionate State Response to International Cyber Incidents**

> Habila, E.A.G. (2026). *State Cyber Response Escalation Index (SCREI): A Legal-Bayesian Decision-Support Framework for Proportionate State Response to International Cyber Incidents.*

---

## Overview

SCREI is an operational decision-support platform designed for crisis cells, senior legal advisers, and national security councils. It integrates Analytic Hierarchy Process (AHP) multi-criteria weighting with a Bayesian confidence layer and a ten-category international law classification architecture.

The platform produces:
- A **Composite Score S** (0–100) from 15 structured variables
- A **Confidence Score CoS** via multiplicative geometric mean of attribution evidence
- A **Legal Legitimacy Boundary (LLB)** — the hard legal ceiling on lawful escalation
- A **Response Stability Score (RSS)** signalling recommendation robustness
- A **Recommended Action** with full legal basis
- A **3-page Executive Brief** for senior officials

**Supported languages:** English (default) · Français · Deutsch

---

## Quick Start

### Prerequisites
- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Opens at **http://localhost:5173**

### Production build

```bash
npm run build
```

Output is placed in `dist/`. Deploy to any static hosting (Nginx, Apache, Netlify, Vercel, AWS S3+CloudFront, Azure Static Web Apps, etc.).

### Preview production build locally

```bash
npm run preview
```

Opens at **http://localhost:4173**

---

## Project Structure

```
screi-platform/
├── public/
│   └── favicon.svg          # Application favicon (navy/bronze shield)
├── src/
│   ├── App.jsx              # Complete SCREI application (all components)
│   └── main.jsx             # React 18 root mount
├── index.html               # Vite HTML entry point
├── vite.config.js           # Build configuration
├── package.json
└── README.md
```

---

## Deployment

### Static Hosting (recommended)

After `npm run build`, the `dist/` folder is a complete static site. No server-side runtime is required.

```bash
npm run build
# Upload dist/ to your hosting provider
```

### Nginx example

```nginx
server {
    listen 80;
    server_name your-domain.gov;
    root /var/www/screi-platform/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Docker (optional)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Mathematical Engine

| Formula | Reference | Description |
|---|---|---|
| `CoS = 100 × x_AC^0.4996 × x_IC^0.2366 × x_SDC^0.2637` | §4.1 | Confidence Score — multiplicative, non-compensatory |
| `K = Σ w_i × x_i` | §4.1 | Severity/Context Composite — additive, AHP-weighted |
| `S = 100 × (CoS/100)^λ × K` | §4.1 | Master Score (λ=1 operational baseline) |
| `ERS = 100 × (6·ER+5·AO+4·ED+4·DPP+6·CBS+5·SVT) / 300` | §4.3 | Escalation Risk Score |
| `RSS = min(d_boundary, 10) × CoS / 10` | §4.3 | Response Stability Score |

All formulas validated against the §8.3 worked example (Incident Alpha) and the §10.3 sensitivity table.

---

## Creator

**Innovator & Lead Architect:** Ehab Ashraf Gomaa Habila  
**Email:** ihab.ashraf.habila@gmail.com  
**WhatsApp:** +20 1060572122  
**ORCID:** 0009-0001-1763-5534  

---

## Operational-Use Statement

*SCREI structures the judgment; it does not automate the decision. It is a decision-support model for crisis cells operating with incomplete information. The model is designed to be re-run as new intelligence arrives. Sequential updates may change the output. The final decision remains with accountable human officials.*

---

## Technology Stack

| Package | Version | Purpose |
|---|---|---|
| React | ^18.3.1 | UI framework |
| Vite | ^5.4.10 | Build tooling |
| Recharts | ^2.12.7 | Escalation ladder & score charts |
| lucide-react | 0.383.0 | Interface iconography |
