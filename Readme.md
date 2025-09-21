🥘 Recipe App – Fullstack React/Express mit PostgreSQL, Docker & VPS Deployment

Dies ist eine Full‑Stack Web‑App zum Verwalten von Kochrezepten. Das Projekt verbindet ein modernes Frontend mit React/Vite und ein Backend mit Express sowie einer PostgreSQL‑Datenbank. Die App ist containerisiert (Docker) und läuft auf einem selbst verwalteten VPS unter eigener Domain.

🔗 Live‑Demo
https://rezepte.mielinski.tech/recipes
🚀 Features (aktueller Stand)

    ✍️ Rezepte anlegen (Titel, Beschreibung, Zutaten/Schritte – je nach Ausbaustand)
    🔎 Öffentliche Rezeptliste und Detailansicht
    📱 Responsives UI mit Tailwind CSS
    🗄️ Persistenz auf PostgreSQL
    🐳 Dockerisierte Services (Frontend, Backend, DB)
    🌐 Deployment auf VPS mit Reverse Proxy (z. B. Caddy oder Nginx)

Hinweis: Die App ist im Aufbau – Bearbeiten/Löschen, Schwierigkeitsgrad, Suche/Filter etc. sind in der Roadmap geplant (siehe unten).
🧱 Tech‑Stack

Frontend

    ⚛️ React (Vite)
    🧭 React Router
    🎨 Tailwind CSS

Backend

    🟩 Node.js mit Express
    🐘 PostgreSQL (via node‑postgres/pg)
    🔐 dotenv, cors, morgan, zod/express‑validator (Validierung – optional)

DevOps & Deployment

    🐳 Docker & Docker Compose
    🖥️ Self‑managed VPS (Ubuntu)
    🔁 Reverse Proxy (Caddy oder Nginx)
    🔧 Environment‑basierte Konfiguration
