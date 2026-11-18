import { Reveal } from "./Reveal";

// Encabezado que se repite en cada sección: etiqueta pequeña a la izquierda + título grande + intro
export const SectionHead = ({ eyebrow, title, intro }) => (
  <Reveal className="grid lg:grid-cols-12 gap-6 mb-16 lg:mb-24">
    <p className="eyebrow lg:col-span-3 pt-3">{eyebrow}</p>
    <div className="lg:col-span-9">
      <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">{title}</h2>
      {intro && <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">{intro}</p>}
    </div>
  </Reveal>
);
