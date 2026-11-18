import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { LangToggle } from "./LangToggle";
import { NAV_ITEMS } from "./nav";

export const Header = () => {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false); // menú móvil abierto/cerrado
  const [scrolled, setScrolled] = useState(false); // ¿el usuario ya bajó un poco?

  // Cuando se baja la página, el header gana fondo translúcido (clase is-scrolled)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container-x flex items-center justify-between h-20">
        <a href="#top" className="font-serif text-2xl tracking-tight">
          Andrea Briones<span className="text-gold">.</span>
        </a>

        {/* Menú de escritorio (se oculta en pantallas pequeñas) */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map(([key, id]) => (
            <a key={key} href={`#${id}`} className="nav-link">{t.nav[key]}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-8">
          <LangToggle />
          <a href="#contact" className="btn-dark btn-sm">{t.nav.cta}</a>
        </div>

        {/* Botón hamburguesa (solo en móvil) */}
        <button
          type="button"
          className="lg:hidden p-2"
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} strokeWidth={1.25} /> : <Menu size={24} strokeWidth={1.25} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="mobile-menu lg:hidden">
          <nav className="container-x flex flex-col gap-6 py-10">
            {NAV_ITEMS.map(([key, id]) => (
              <a key={key} href={`#${id}`} onClick={() => setMenuOpen(false)} className="font-serif text-3xl">
                {t.nav[key]}
              </a>
            ))}
            <div className="pt-6 border-t border-black/10 flex items-center justify-between">
              <LangToggle />
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-dark btn-sm">{t.nav.cta}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
