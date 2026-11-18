import { useEffect, useRef, useState } from "react";

// Envuelve cualquier contenido y lo hace aparecer con una animación suave
// la primera vez que entra en la pantalla.
// Props: delay (ms de retraso), as (etiqueta HTML a usar: "div", "li", "figure"...)
export const Reveal = ({ children, delay = 0, className = "", as: Tag = "div", ...rest }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true); // navegador viejo: mostrar sin animar
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect(); // solo anima una vez
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-shown" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
