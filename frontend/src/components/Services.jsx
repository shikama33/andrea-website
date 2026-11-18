import { useLanguage } from "../i18n/LanguageContext";
import { IMAGES } from "../i18n";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export const Services = () => {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section id="services" className="container-x py-28 lg:py-40">
      <SectionHead eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Foto fija (sticky) que acompaña al scroll; solo en escritorio */}
        <Reveal className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-28 aspect-[3/4] overflow-hidden">
            <img src={IMAGES.about} alt="" className="w-full h-full object-cover" />
          </div>
        </Reveal>

        {/* Lista numerada de servicios */}
        <ol className="lg:col-span-8 border-t border-black/10">
          {s.items.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 60} className="service-row">
              <span className="font-mono text-xs text-gold pt-2">0{i + 1}</span>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl">{item.title}</h3>
                <p className="mt-3 text-neutral-600 leading-relaxed max-w-xl">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
