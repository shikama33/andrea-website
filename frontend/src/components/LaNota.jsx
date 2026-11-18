import { ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { IMAGES } from "../i18n";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

// Sección sobre La Nota NY, la página de noticias y eventos de la que Andrea forma parte.
export const LaNota = () => {
  const { t } = useLanguage();
  const n = t.laNota;
  const [followers, posts] = t.stats.slice(1, 3);

  return (
    <section id="la-nota" className="bg-paper py-28 lg:py-40">
      <div className="container-x">
        <SectionHead eyebrow={n.eyebrow} title={n.title} />
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-6 lg:col-start-4">
            <img src={IMAGES.laNota} alt="La Nota NY" className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mb-10" />
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">{n.text}</p>
            <a href={n.href} target="_blank" rel="noopener noreferrer" className="btn-dark mt-10">
              {n.button} <ArrowUpRight size={18} strokeWidth={1.5} />
            </a>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3 bg-ink text-white p-8">
            <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/10">
              <div>
                <p className="font-serif text-3xl">{followers.value}</p>
                <p className="eyebrow mt-2 !text-white/50">{n.followers}</p>
              </div>
              <div>
                <p className="font-serif text-3xl">{posts.value}</p>
                <p className="eyebrow mt-2 !text-white/50">{n.posts}</p>
              </div>
            </div>
            <p className="eyebrow !text-white/50 mt-8 mb-5">{n.topicsTitle}</p>
            <ul className="space-y-3 text-sm text-white/80">
              {n.topics.map((topic) => (
                <li key={topic} className="flex gap-3">
                  <Check size={16} strokeWidth={1.5} className="text-gold mt-0.5 shrink-0" /> {topic}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
