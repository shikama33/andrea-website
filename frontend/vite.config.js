import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // En desarrollo, todo lo que empiece con /api se reenvía al backend (puerto 8000).
    // Así el navegador cree que todo es el mismo sitio y no hay problemas de CORS.
    proxy: { "/api": "http://localhost:8000" },
  },
});
