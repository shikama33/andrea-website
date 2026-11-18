import { useLanguage } from "../i18n/LanguageContext";
import { IMAGES } from "../i18n";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

// Una tarjeta de caso de éxito. Las impares (índice 1, 3...) invierten foto y texto de lado.
const CaseCard = ({ item, index, resultsLabel }) => (
  <Reveal className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
    <div className="lg:col-span-7 overflow-hidden aspect-[16/10] case-img">
      <img src={IMAGES[item.image]} alt={item.brand} className="w-full h-full object-cover" />
    </div>
    <div className="lg:col-span-5">
      <p className="eyebrow"><span className="text-gold">{item.category}</span> · {item.brand}</p>
      <h3 className="font-serif text-3xl sm:text-4xl mt-5 leading-tight">{item.title}</h3>
      <p className="mt-5 text-neutral-600 leading-relaxed">{item.text}</p>
      <p className="eyebrow mt-10 mb-4">{resultsLabel}</p>
      <div className="grid grid-cols-3 border-t border-black/10 pt-5 gap-4">
        {item.results.map((r, j) => (
          <div key={j}>
            <p className="font-serif text-2xl sm:text-3xl">{r.value}</p>
            <p className="text-xs text-neutral-500 mt-1">{r.label}</p>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

export const CaseStudies = () => {
  const { t } = useLanguage();
  const c = t.cases;

  return (
    <section id="case-studies" className="bg-paper py-28 lg:py-40">
      <div className="container-x">
        <SectionHead eyebrow={c.eyebrow} title={c.title} intro={c.intro} />
        <div className="flex flex-col gap-24 lg:gap-32">
          {c.items.map((item, i) => (
            <CaseCard key={i} item={item} index={i} resultsLabel={c.resultsLabel} />
          ))}
        </div>
      </div>
    </section>
  );
};
