import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./index";

// Context = una "variable global" de React: cualquier componente puede leer el idioma
// con useLanguage() sin pasarlo de padre a hijo por props.
const STORAGE_KEY = "andrea_briones_lang";
const LanguageContext = createContext(null);

// 1) idioma guardado por el visitante  2) idioma de su navegador  3) inglés
const detectLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    // localStorage puede estar bloqueado (modo privado): lo ignoramos
  }
  return (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
};

// Crea o actualiza una etiqueta <meta name="..."> del <head>
const setMeta = (name, content) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(detectLanguage);
  const t = translations[lang];

  // Cada vez que cambia el idioma, actualizamos <html lang>, el título y la descripción (SEO)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    setMeta("description", t.meta.description);
  }, [lang, t]);

  const setLang = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // sin persistencia, pero el cambio de idioma sigue funcionando
    }
    setLangState(next);
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
