import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// 1. Estilos globales (Tailwind 4)
import "./index.css";

// 2. Configuración de internacionalización (i18next)
import "./i18n";

// 3. App + Provider
import App from "./App";
import { AuthProvider } from "@lumina/data-access";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento root. Revisa tu index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
