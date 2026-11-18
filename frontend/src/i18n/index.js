import { en } from "./en";
import { es } from "./es";

export const translations = { en, es };

// Imágenes del sitio: archivos en frontend/public/images/. Para cambiar una foto,
// reemplaza el archivo con el mismo nombre (o cambia la ruta aquí).
export const IMAGES = {
  hero: "/images/hero.jpg",
  about: "/images/about.jpg",
  beauty: "/images/beauty.jpg",
  travel: "/images/travel.jpg",
  fashion: "/images/fashion.jpg",
};

// PDFs del media kit, uno por idioma (en frontend/public/)
export const MEDIA_KITS = {
  en: "/media-kit-andrea-briones-en.pdf",
  es: "/media-kit-andrea-briones-es.pdf",
};

// Redes sociales del pie de página. TODO: poner los enlaces reales de Andrea.
export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "TikTok", href: "https://tiktok.com" },
  { name: "YouTube", href: "https://youtube.com" },
];
