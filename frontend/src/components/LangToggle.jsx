import { useLanguage } from "../i18n/LanguageContext";

// Botones "EN | ES". El idioma activo se marca en dorado.
export const LangToggle = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="lang-toggle" role="group" aria-label={t.nav.language}>
      {["en", "es"].map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="lang-sep" aria-hidden="true">|</span>}
          <button
            type="button"
            aria-pressed={lang === code}
            className={`lang-btn ${lang === code ? "is-active" : ""}`}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
};
