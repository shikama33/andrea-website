import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

// En desarrollo VITE_API_URL está vacío y Vite reenvía /api al backend.
// En producción pon la URL real del backend en frontend/.env
const API_URL = import.meta.env.VITE_API_URL || "";

const EMPTY_FORM = { name: "", email: "", company: "", collab_type: "", message: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Devuelve un objeto con los errores encontrados, por ejemplo { email: "emailInvalid" }.
// Los valores son claves de t.contact.errors, así el mensaje sale en el idioma activo.
const validate = (values) => {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "nameRequired";
  else if (name.length < 2) errors.name = "nameShort";

  if (!email) errors.email = "emailRequired";
  else if (!EMAIL_REGEX.test(email)) errors.email = "emailInvalid";

  if (!message) errors.message = "messageRequired";
  else if (message.length < 10) errors.message = "messageShort";

  return errors;
};

// Etiqueta + campo + mensaje de error. `children` es el <input> que va dentro.
const Field = ({ id, label, error, children }) => (
  <div className="field">
    <label htmlFor={id} className="eyebrow">{label}</label>
    {children}
    {error && <p className="text-sm text-red-700 mt-2">{error}</p>}
  </div>
);

export const ContactForm = () => {
  const { lang, t } = useLanguage();
  const c = t.contact;
  const f = c.fields;

  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  // Devuelve un onChange para el campo `key`
  const onChange = (key) => (e) => setValues({ ...values, [key]: e.target.value });
  const errorText = (key) => (errors[key] ? c.errors[errors[key]] : null);

  const onSubmit = async (e) => {
    e.preventDefault(); // evita que el navegador recargue la página
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, language: lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setValues(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="container-x py-28 lg:py-40">
      <SectionHead eyebrow={c.eyebrow} title={c.title} intro={c.intro} />
      <Reveal className="grid lg:grid-cols-12">
        <form
          onSubmit={onSubmit}
          noValidate
          className="lg:col-start-4 lg:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-10"
        >
          <Field id="contact-name" label={f.name.label} error={errorText("name")}>
            <input id="contact-name" className="input-line" placeholder={f.name.placeholder}
              value={values.name} onChange={onChange("name")} />
          </Field>

          <Field id="contact-email" label={f.email.label} error={errorText("email")}>
            <input id="contact-email" type="email" className="input-line" placeholder={f.email.placeholder}
              value={values.email} onChange={onChange("email")} />
          </Field>

          <Field id="contact-company" label={f.company.label}>
            <input id="contact-company" className="input-line" placeholder={f.company.placeholder}
              value={values.company} onChange={onChange("company")} />
          </Field>

          <Field id="contact-type" label={f.collabType.label}>
            <select id="contact-type" className="input-line" value={values.collab_type} onChange={onChange("collab_type")}>
              <option value="">{f.collabType.placeholder}</option>
              {c.collabOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <Field id="contact-message" label={f.message.label} error={errorText("message")}>
              <textarea id="contact-message" rows={4} className="input-line resize-none" placeholder={f.message.placeholder}
                value={values.message} onChange={onChange("message")} />
            </Field>
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-6">
            <button type="submit" disabled={status === "sending"} className="btn-dark">
              {status === "sending" ? c.sending : c.submit} <ArrowRight size={18} strokeWidth={1.5} />
            </button>
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={18} className="text-gold" strokeWidth={1.5} /> {c.success}
              </p>
            )}
            {status === "error" && <p className="text-sm text-red-700">{c.errors.server}</p>}
          </div>
        </form>
      </Reveal>
    </section>
  );
};
