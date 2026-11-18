# Andrea Briones — Landing page

Sitio web bilingüe (EN/ES) para una creadora de contenido, con formulario de contacto para marcas.

**Stack:** React + Vite + Tailwind (frontend) · FastAPI + SQLite (backend). Sin servicios de terceros obligatorios.

## Cómo arrancarlo (2 terminales)

### 1. Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate            # Windows  (Mac/Linux: source .venv/bin/activate)
pip install -r requirements.txt
copy .env.example .env            # Mac/Linux: cp .env.example .env
uvicorn main:app --reload --port 8000
```
Comprobar: http://localhost:8000/api/health → `{"status":"ok"}`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Abrir: http://localhost:5173

## Mapa del código (qué tocar para cada cosa)

| Quiero cambiar…                         | Archivo                                    |
|-----------------------------------------|--------------------------------------------|
| Cualquier texto (EN)                    | `frontend/src/i18n/en.js`                  |
| Cualquier texto (ES)                    | `frontend/src/i18n/es.js`                  |
| Fotos                                   | `frontend/public/images/` (mismo nombre)   |
| PDFs del media kit                      | `frontend/public/media-kit-*.pdf`          |
| Redes sociales                          | `SOCIALS` en `frontend/src/i18n/index.js`  |
| Colores y tipografías                   | `frontend/tailwind.config.js`              |
| Estilos de botones, header, formulario  | `frontend/src/index.css`                   |
| Orden de las secciones                  | `frontend/src/App.jsx`                     |
| Una sección concreta                    | `frontend/src/components/<Sección>.jsx`    |
| Reglas del formulario (servidor)        | `backend/main.py` → `ContactIn`            |
| Correo que recibe la dueña              | `backend/mailer.py`                        |

## Cómo fluye un mensaje de contacto

1. El visitante rellena `ContactForm.jsx` → se valida en el navegador.
2. `fetch` hace `POST /api/contact` → `backend/main.py` lo valida otra vez (nunca confíes solo en el navegador).
3. Se guarda en SQLite (`backend/data/contacts.db`).
4. Si el SMTP está configurado, se envía un correo a `OWNER_EMAIL` (con *Reply-To* = el correo de la marca).
5. El estado del envío queda en la columna `email_status` (`sent`, `failed` o `skipped_not_configured`).

Ver los mensajes guardados:
```bash
python -c "import sqlite3; [print(r) for r in sqlite3.connect('backend/data/contacts.db').execute('select created_at, name, email, email_status from contact_messages')]"
```

## Pendiente antes de entregar al cliente
- [ ] Reemplazar textos, cifras, casos y testimonios de ejemplo (`en.js` / `es.js`).
- [ ] Reemplazar las fotos y los PDFs de ejemplo por los reales.
- [ ] Poner los enlaces reales de redes sociales.
- [ ] Configurar el correo en `backend/.env` (`OWNER_EMAIL` + SMTP).
- [ ] Revisar que las fotos tengan licencia/derechos para uso comercial.

## Publicar (ideas)
- Frontend: `npm run build` genera `frontend/dist/` → súbelo a Netlify, Vercel o Cloudflare Pages. Define `VITE_API_URL` con la URL del backend antes de compilar.
- Backend: Render, Railway o un VPS con `uvicorn`. Define `CORS_ORIGINS` con el dominio del frontend. Ojo: SQLite necesita disco persistente; si el hosting no lo ofrece, usa su base de datos gestionada.

## Mejoras futuras
Protección anti-spam (campo trampa o límite de peticiones), panel para ver los mensajes, analítica propia (Plausible/GA), y pruebas automáticas.
