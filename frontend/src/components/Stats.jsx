import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";

// Franja negra con las 4 cifras clave (seguidores, engagement...)
export const Stats = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-ink text-white">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {t.stats.map((stat, i) => (
          <Reveal key={i} delay={i * 80} className="py-12 lg:py-16 px-2 lg:px-8 border-white/10 lg:border-l first:border-l-0">
            <p className="font-serif text-4xl sm:text-5xl">{stat.value}</p>
            <p className="eyebrow mt-3 !text-white/50">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
