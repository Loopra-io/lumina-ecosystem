/**
 * @fileoverview useTheme — Hook de gestión de tema claro/oscuro
 * @description Controla el token `data-theme` en `<html>`, persiste la preferencia
 *   del usuario en `localStorage` y respeta `prefers-color-scheme` como fallback.
 *
 * @example
 *   const { theme, toggleTheme, isDark } = useTheme();
 *
 * @persistence  localStorage → clave "lumina-theme"
 * @fallback     prefers-color-scheme del sistema operativo
 * @sideEffects  Escribe `document.documentElement.dataset.theme`
 */

import { useState, useEffect, useCallback } from "react";

/** Valores válidos de tema */
export type Theme = "dark" | "light";

/** Retorno del hook */
export interface UseThemeReturn {
  /** Tema activo actualmente */
  theme: Theme;
  /** Alterna entre dark y light */
  toggleTheme: () => void;
  /** Aplica un tema específico */
  setTheme: (theme: Theme) => void;
  /** Atajo booleano: true si el tema activo es "dark" */
  isDark: boolean;
}

const STORAGE_KEY = "lumina-theme" as const;

/**
 * Lee la preferencia guardada o infiere desde el sistema operativo.
 * @returns El tema que debe aplicarse al inicializar
 */
function resolveInitialTheme(): Theme {
  // 1. Preferencia guardada por el usuario
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "dark" || stored === "light") return stored;

    // 2. Preferencia del sistema operativo
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
  }

  // 3. Default institucional: oscuro
  return "dark";
}

/**
 * Aplica el tema al DOM y persiste en localStorage.
 * @param theme - Tema a activar
 */
function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}

/**
 * Hook para gestión de tema claro/oscuro en Lúmina.
 * Seguro para StrictMode — el efecto solo corre una vez en el cliente.
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme);

  // Aplicar al DOM en el primer render del cliente
  useEffect(() => {
    applyTheme(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Cambia el tema activo, actualiza el DOM y persiste.
   * @param next - Nuevo tema a aplicar
   */
  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
  }, []);

  /** Alterna entre "dark" y "light" */
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Escuchar cambios del sistema operativo en tiempo real
  // (si el usuario no tiene preferencia guardada, seguirá al SO)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Solo reaccionar al SO si el usuario NO tiene preferencia guardada
      if (!stored) {
        const systemTheme: Theme = e.matches ? "light" : "dark";
        setTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [setTheme]);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === "dark",
  };
}
