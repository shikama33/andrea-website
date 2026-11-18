import { toast } from "sonner";
import { useLanguage } from "../i18n/LanguageContext";
import { MEDIA_KITS } from "../i18n";

// Hook que devuelve una función para descargar el PDF del idioma actual.
// Lo usan el Hero y la sección MediaKit.
export const useMediaKit = () => {
  const { lang, t } = useLanguage();

  return () => {
    // Truco clásico: crear un <a download> invisible y hacerle clic
    const link = document.createElement("a");
    link.href = MEDIA_KITS[lang];
    link.download = `Media_Kit_Andrea_Briones_${lang.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success(t.mediaKit.toast);
  };
};
