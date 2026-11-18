"""Base de datos: SQLite (viene incluido en Python, no hay que instalar nada).

El archivo se crea solo la primera vez en backend/data/contacts.db
"""
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "data" / "contacts.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS contact_messages (
    id           TEXT PRIMARY KEY,
    created_at   TEXT NOT NULL,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    company      TEXT NOT NULL DEFAULT '',
    collab_type  TEXT NOT NULL DEFAULT '',
    message      TEXT NOT NULL,
    language     TEXT NOT NULL DEFAULT 'en',
    email_status TEXT NOT NULL DEFAULT 'pending'
);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages (created_at DESC);
"""


def connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Crea la tabla si no existe. Se llama una vez al arrancar el servidor."""
    with connect() as conn:
        conn.executescript(SCHEMA)


def save_message(msg: dict) -> None:
    with connect() as conn:
        conn.execute(
            """INSERT INTO contact_messages
               (id, created_at, name, email, company, collab_type, message, language, email_status)
               VALUES (:id, :created_at, :name, :email, :company, :collab_type, :message, :language, :email_status)""",
            msg,
        )


def set_email_status(message_id: str, status: str) -> None:
    with connect() as conn:
        conn.execute("UPDATE contact_messages SET email_status = ? WHERE id = ?", (status, message_id))
