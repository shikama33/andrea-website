"""Envío de correo con SMTP estándar (Gmail, Outlook, Zoho, el hosting del cliente...).

No depende de ningún servicio de terceros: solo necesitas los datos SMTP de una cuenta de correo.
"""
import os
import smtplib
from email.message import EmailMessage
from html import escape

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
FROM_NAME = os.getenv("EMAIL_FROM_NAME", "Andrea Briones Website")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "").strip()


def is_configured() -> bool:
    """True solo si hay destinatario y credenciales SMTP."""
    return bool(OWNER_EMAIL and SMTP_HOST and SMTP_USER and SMTP_PASSWORD)


def build_html(m: dict) -> str:
    """Cuerpo del correo. `escape` evita que el visitante inyecte HTML en el mensaje."""
    rows = [
        ("Name", m["name"]),
        ("Email", m["email"]),
        ("Company / Brand", m.get("company") or "—"),
        ("Collaboration type", m.get("collab_type") or "—"),
        ("Language", m["language"].upper()),
    ]
    cells = "".join(
        f'<tr><td style="padding:6px 0;color:#888;width:160px">{escape(k)}</td>'
        f'<td style="padding:6px 0;color:#111">{escape(v)}</td></tr>'
        for k, v in rows
    )
    body = escape(m["message"]).replace("\n", "<br>")
    return (
        '<table role="presentation" width="100%"><tr>'
        '<td style="padding:24px;font-family:Arial,sans-serif">'
        '<p style="font-size:18px;color:#111">New collaboration inquiry from your website</p>'
        f'<table role="presentation" width="100%">{cells}</table>'
        f'<p style="margin-top:16px;color:#111">{body}</p>'
        f'<p style="font-size:12px;color:#888">Sent by the {escape(FROM_NAME)} contact form.</p>'
        "</td></tr></table>"
    )


def send_contact_email(m: dict) -> None:
    """Envía el aviso al dueño. Lanza excepción si algo falla (quien llama la captura)."""
    email = EmailMessage()
    email["Subject"] = f"New collaboration inquiry — {FROM_NAME}"
    email["From"] = f"{FROM_NAME} <{SMTP_USER}>"
    email["To"] = OWNER_EMAIL
    # Reply-To: al pulsar "Responder" le contestas directo a la marca.
    email["Reply-To"] = m["email"]
    email.set_content(f"New inquiry from {m['name']} <{m['email']}>\n\n{m['message']}")
    email.add_alternative(build_html(m), subtype="html")

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=30) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(email)
