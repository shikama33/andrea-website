"""API de la landing de Andrea Briones.

Un solo endpoint real:  POST /api/contact
  1. valida los datos (Pydantic)
  2. guarda el mensaje en SQLite
  3. avisa por correo al dueño (si el SMTP está configurado)

Arrancar:  uvicorn main:app --reload --port 8000
"""
# El .env se carga ANTES de importar mailer, porque mailer lee las variables al importarse.
from dotenv import load_dotenv

load_dotenv()

import logging
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr, Field

import db
import mailer

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("api")


@asynccontextmanager
async def lifespan(_: FastAPI):
    db.init_db()  # crea la tabla al arrancar
    yield


app = FastAPI(title="Andrea Briones API", lifespan=lifespan)

# CORS: qué sitios web pueden llamar a esta API desde el navegador.
origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ContactIn(BaseModel):
    """Lo que manda el formulario. Si no cumple las reglas, FastAPI responde 422 solo."""

    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    company: str = Field(default="", max_length=120)
    collab_type: str = Field(default="", max_length=60)
    message: str = Field(min_length=10, max_length=3000)
    language: Literal["en", "es"] = "en"


@app.get("/api/health")
def health():
    return {"status": "ok"}


# `def` normal (no async): FastAPI lo corre en un hilo aparte,
# así el envío SMTP (que es bloqueante) no congela el servidor.
@app.post("/api/contact")
def create_contact(payload: ContactIn):
    record = payload.model_dump()
    record["id"] = str(uuid.uuid4())
    record["created_at"] = datetime.now(timezone.utc).isoformat()
    record["email_status"] = "pending"

    # Primero guardamos: aunque el correo falle, el mensaje NO se pierde.
    db.save_message(record)

    if mailer.is_configured():
        try:
            mailer.send_contact_email(record)
            status = "sent"
        except Exception:
            log.exception("No se pudo enviar el correo")
            status = "failed"
    else:
        status = "skipped_not_configured"

    db.set_email_status(record["id"], status)
    return {"id": record["id"], "status": "received"}
