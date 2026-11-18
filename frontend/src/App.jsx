import { Toaster } from "sonner";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { LaNota } from "./components/LaNota";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

// La página es solo una lista de secciones, de arriba hacia abajo.
// Para reordenar o quitar una sección, mueve o borra su línea.
export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <LaNota />
        <ContactForm />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </LanguageProvider>
  );
}
