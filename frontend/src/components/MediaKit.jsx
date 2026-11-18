import { Download, FileText } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { useMediaKit } from "./useMediaKit";

export const MediaKit = () => {
  const { t } = useLanguage();
  const downloadMediaKit = useMediaKit();
  const m = t.mediaKit;

  return (
    <section id="media-kit" className="bg-ink text-white py-28 lg:py-36">
      <Reveal className="container-x grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow !text-white/50">{m.eyebrow}</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-6 leading-[1.05]">{m.title}</h2>
          <p className="mt-6 text-white/60 text-base sm:text-lg max-w-xl leading-relaxed">{m.text}</p>
        </div>
        <div className="lg:col-span-5 lg:justify-self-end">
          <button type="button" onClick={downloadMediaKit} className="btn-gold">
            <Download size={18} strokeWidth={1.5} /> {m.button}
          </button>
          <p className="mt-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
            <FileText size={14} strokeWidth={1.5} /> {m.note}
          </p>
        </div>
      </Reveal>
    </section>
  );
};
