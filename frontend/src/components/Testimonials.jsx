import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export const Testimonials = () => {
  const { t } = useLanguage();
  const s = t.testimonials;

  return (
    <section id="testimonials" className="container-x py-28 lg:py-40">
      <SectionHead eyebrow={s.eyebrow} title={s.title} />
      {/* gap-px + fondo negro translúcido = líneas finas entre tarjetas */}
      <div className="grid md:grid-cols-3 gap-px bg-black/10 border border-black/10">
        {s.items.map((q, i) => (
          <Reveal as="figure" key={i} delay={i * 100} className="testimonial">
            <span className="font-serif text-7xl leading-none text-gold">&ldquo;</span>
            <blockquote className="font-serif text-xl sm:text-2xl leading-snug mt-2">{q.quote}</blockquote>
            <figcaption className="mt-10">
              <p className="font-medium">{q.name}</p>
              <p className="text-sm text-neutral-500 mt-1">{q.role}</p>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
