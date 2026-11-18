import { ArrowUp, Instagram, Newspaper } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { SOCIALS } from "../i18n";
import { NAV_ITEMS } from "./nav";

// Icono de cada red (por nombre, para que SOCIALS en i18n/index.js sea solo datos)
const ICONS = { Instagram, "La Nota NY": Newspaper };

export const Footer = () => {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-ink text-white pt-24 pb-10">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          <div className="lg:col-span-6">
            <p className="font-serif text-5xl sm:text-6xl tracking-tight">
              Andrea Briones<span className="text-gold">.</span>
            </p>
            <p className="mt-6 text-white/50 max-w-md">{f.tagline}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow !text-white/40 mb-6">{f.navTitle}</p>
            <ul className="space-y-3">
              {NAV_ITEMS.map(([key, id]) => (
                <li key={key}><a href={`#${id}`} className="footer-link">{t.nav[key]}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow !text-white/40 mb-6">{f.socialTitle}</p>
            <ul className="space-y-3">
              {SOCIALS.map(({ name, href }) => {
                const Icon = ICONS[name];
                return (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link inline-flex items-center gap-2">
                      {Icon && <Icon size={16} strokeWidth={1.5} />} {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 pt-8 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Andrea Briones. {f.rights}</p>
          <a href="#top" className="footer-link inline-flex items-center gap-2 uppercase tracking-[0.2em] font-mono">
            {f.backToTop} <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};
