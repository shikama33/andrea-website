import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { IMAGES } from "../i18n";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="top" className="container-x pt-32 lg:pt-40 pb-20">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
        {/* Columna de texto */}
        <div className="lg:col-span-7 fade-up">
          <p className="eyebrow mb-8">{t.hero.eyebrow}</p>
          <h1 className="font-serif font-light text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.98] tracking-tight">
            {t.hero.titleA}
            <br />
            <em className="text-gold font-serif italic">{t.hero.titleB}</em>
          </h1>
          <p className="mt-10 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600">{t.hero.subtitle}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href="#contact" className="btn-dark">
              {t.hero.primaryCta} <ArrowDownRight size={18} strokeWidth={1.5} />
            </a>
            <a href="#la-nota" className="btn-outline">
              {t.hero.secondaryCta} <ArrowRight size={16} strokeWidth={1.5} />
            </a>
          </div>
          <p className="mt-10 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">{t.hero.location}</p>
        </div>

        {/* Columna de foto con la tarjeta flotante de engagement */}
        <div className="lg:col-span-5 relative fade-up" style={{ animationDelay: "150ms" }}>
          <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
            <img src={IMAGES.hero} alt="Andrea Briones" className="w-full h-full object-cover object-top" />
          </div>
          <div className="absolute -left-6 bottom-10 bg-white px-6 py-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
            <p className="font-serif text-4xl">{t.hero.badgeValue}</p>
            <p className="eyebrow mt-1">{t.hero.badge}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
