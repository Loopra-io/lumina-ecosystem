/**
 * @fileoverview Lúmina — Navbar principal + sistema de temas
 * @description Barra de navegación institucional con soporte de modo claro/oscuro.
 *   El tema se persiste en localStorage bajo la clave 'lumina-theme' y se aplica
 *   como atributo [data-theme] en <html> para que las variables CSS del design
 *   system (index.css) actúen automáticamente en toda la aplicación.
 *
 * @tokens  Todos los colores consumen variables CSS/utilidades de Tailwind
 *   generadas desde @theme en index.css (paleta teal #05AD98). NO hay colores
 *   hardcodeados fuera del sistema de diseño.
 *
 * @accessibility
 *   - aria-expanded en todos los triggers de dropdown
 *   - aria-haspopup="true" en botones de menú
 *   - aria-current="page" en enlaces de la ruta activa
 *   - role="menu" / role="menuitem" en los paneles desplegables
 *   - aria-label descriptivos en controles de icono
 *   - Focus visible gestionado por estilos globales en index.css
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarClock,
  CreditCard,
  LogIn,
  Building2,
  BookOpen,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Zap,
  Sun,
  Moon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

type Theme = "dark" | "light";

interface EcosystemItem {
  readonly label: string;
  readonly description: string;
  readonly to: string;
  readonly icon: React.ElementType;
  readonly badge?: string;
}

interface PortalItem {
  readonly label: string;
  readonly description: string;
  readonly to: string;
  readonly icon: React.ElementType;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — useTheme
// Gestiona tema global via data-theme en <html> + localStorage
// ─────────────────────────────────────────────────────────────────────────────

const THEME_KEY = "lumina-theme" as const;
const DEFAULT_THEME: Theme = "dark";

/**
 * Hook de gestión de tema global para Lúmina.
 * Aplica el tema como atributo `data-theme` en `document.documentElement`
 * para que las variables CSS de index.css actúen en cascada sobre toda la app.
 *
 * @returns {object} theme — tema activo, toggleTheme — función de alternancia
 */
function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    // Respetar preferencia del sistema si no hay valor almacenado
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  // Sincronizar DOM y localStorage cada vez que cambia el tema
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA — inmutable, fuera del componente para evitar re-renders
// ─────────────────────────────────────────────────────────────────────────────

const ECOSYSTEM_ITEMS: readonly EcosystemItem[] = [
  {
    label: "Admin Hub",
    description: "Control institucional, KPIs y configuración centralizada",
    to: "/login?portal=admin",
    icon: LayoutDashboard,
    badge: "Rector",
  },
  {
    label: "Faculty Portal",
    description: "Gestión de notas, asistencia y planeación curricular",
    to: "/login?portal=faculty",
    icon: BookOpen,
    badge: "Docente",
  },
  {
    label: "Lúmina Connect",
    description: "Espacio unificado para estudiantes y padres de familia",
    to: "/login?portal=connect",
    icon: Users,
    badge: "Familia",
  },
] as const;

const PORTAL_ITEMS: readonly PortalItem[] = [
  {
    label: "Portal Administrativo",
    description: "Rectores y directivos",
    to: "/login?portal=admin",
    icon: Building2,
  },
  {
    label: "Portal Docente",
    description: "Profesores y coordinadores",
    to: "/login?portal=faculty",
    icon: GraduationCap,
  },
  {
    label: "Portal Estudiantes y Padres",
    description: "Familias y estudiantes",
    to: "/login?portal=connect",
    icon: Users,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// ESTILOS COMPARTIDOS
// Funciones puras de clases — evitan duplicar lógica onMouseEnter/onMouseLeave
// y mantienen el hover 100% en CSS (Tailwind + variables del design system).
// ─────────────────────────────────────────────────────────────────────────────

/** Clases para un link de navegación desktop, según su estado activo. */
function navLinkClasses(active: boolean): string {
  return [
    "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200",
    active
      ? "bg-[var(--interactive-brand-bg)] text-brand-500"
      : "text-[var(--text-secondary)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--text-primary)]",
  ].join(" ");
}

/** Clases para el trigger "Ingresar", según si su dropdown está abierto. */
function loginTriggerClasses(active: boolean): string {
  return [
    "flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200",
    active
      ? "border-[var(--border-brand)] bg-[var(--interactive-brand-bg)] text-brand-500"
      : "border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--border-brand)] hover:bg-[var(--interactive-brand-bg)] hover:text-[var(--text-primary)]",
  ].join(" ");
}

/** Clase base para los items del dropdown (hover con acento de marca). */
const DROPDOWN_ITEM_HOVER =
  "border border-transparent transition-colors duration-200 hover:border-[var(--border-brand)] hover:bg-[var(--interactive-brand-hover)]";

/** Clase base compartida por los "chips" de nivel superior del menú mobile. */
const MOBILE_CHIP_BASE =
  "flex w-full items-center gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] px-4 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors duration-200";

// ─────────────────────────────────────────────────────────────────────────────
// VARIANTES DE ANIMACIÓN
// ─────────────────────────────────────────────────────────────────────────────

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.14, ease: "easeIn" as const },
  },
};

const itemStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};

const itemFade = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const themeIconVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.6 },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    rotate: 90,
    scale: 0.6,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTE: LuminaMark
// Isotipo de marca en SVG inline — mismo diseño que /public/favicon.svg,
// autocontenido (sin request de red) y coloreado 100% vía CSS var de marca.
// ─────────────────────────────────────────────────────────────────────────────

export function LuminaMark({ className }: { readonly className?: string }) {
  return (
    <img 
      src="/favicon.svg" 
      className={className} 
      alt="Lúmina Logo"
      aria-hidden="true"
    />
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTE: ThemeToggle
// ─────────────────────────────────────────────────────────────────────────────

interface ThemeToggleProps {
  readonly theme: Theme;
  readonly onToggle: () => void;
  /** Si true, usa layout expandido con etiqueta de texto */
  readonly showLabel?: boolean;
}

/**
 * Botón de alternancia de tema con animación de ícono.
 * Accesible via aria-label dinámico.
 */
function ThemeToggle({ theme, onToggle, showLabel = false }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      onClick={onToggle}
      className={[
        "relative flex items-center gap-2 overflow-hidden rounded-xl border transition-colors duration-200",
        showLabel ? "px-3.5 py-2" : "h-9 w-9 justify-center",
        "border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--border-brand)] hover:bg-[var(--interactive-brand-bg)] hover:text-[var(--text-primary)]",
      ].join(" ")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          variants={themeIconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-shrink-0"
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </motion.span>
      </AnimatePresence>

      {showLabel && (
        <span className="text-xs font-bold uppercase tracking-[0.18em]">
          {isDark ? "Claro" : "Oscuro"}
        </span>
      )}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTE: DesktopNavLink
// Link de navegación reutilizable para items simples (sin dropdown).
// ─────────────────────────────────────────────────────────────────────────────

interface DesktopNavLinkProps {
  readonly to: string;
  readonly icon: React.ElementType;
  readonly label: string;
  readonly active: boolean;
}

function DesktopNavLink({ to, icon: Icon, label, active }: DesktopNavLinkProps) {
  return (
    <Link
      to={to}
      className={navLinkClasses(active)}
      aria-current={active ? "page" : undefined}
    >
      <Icon size={13} className="text-brand-500" aria-hidden="true" />
      {label}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTE: EcosystemDropdown
// ─────────────────────────────────────────────────────────────────────────────

interface EcosystemDropdownProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

function EcosystemDropdown({ isOpen, onClose }: EcosystemDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="menu"
          aria-label="Módulos del ecosistema Lúmina"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-[420px] -translate-x-1/2 overflow-hidden rounded-[24px]"
          style={{
            backgroundColor: "var(--dropdown-bg)",
            border: "1px solid var(--dropdown-border)",
            boxShadow: "var(--shadow-card-dark)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Línea de acento superior */}
          <div
            className="absolute inset-x-0 top-0 h-[1px]"
            style={{ background: "var(--accent-line)" }}
          />

          {/* Header interno */}
          <div
            className="px-5 py-4"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "var(--text-muted)" }}
            >
              Ecosistema Lúmina
            </p>
            <p
              className="mt-0.5 text-xs"
              style={{ color: "var(--text-disabled)" }}
            >
              Tres portales. Una sola plataforma institucional.
            </p>
          </div>

          {/* Items */}
          <motion.div
            variants={itemStagger}
            initial="hidden"
            animate="visible"
            className="p-3 space-y-1"
          >
            {ECOSYSTEM_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.to} variants={itemFade}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    role="menuitem"
                    className={`group flex items-center gap-4 rounded-[16px] px-4 py-3.5 ${DROPDOWN_ITEM_HOVER}`}
                  >
                    {/* Ícono */}
                    <span
                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--surface-card)",
                        border: "1px solid var(--border-default)",
                      }}
                    >
                      <Icon
                        size={18}
                        style={{ color: "var(--text-muted)" }}
                        className="group-hover:text-brand-400 transition-colors duration-200"
                      />
                    </span>

                    {/* Texto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="rounded-full border border-[var(--border-brand)] bg-[var(--interactive-brand-bg)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-500">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className="mt-0.5 text-xs leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Flecha */}
                    <ArrowRight
                      size={14}
                      className="flex-shrink-0 transition-all duration-200 group-hover:translate-x-1"
                      style={{ color: "var(--text-disabled)" }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer del dropdown */}
          <div
            className="px-5 py-3"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <Link
              to="/ecosystem"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] transition-colors duration-200 hover:text-brand-500"
            >
              <Zap size={10} aria-hidden="true" />
              Ver comparativa completa
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTE: LoginDropdown
// ─────────────────────────────────────────────────────────────────────────────

interface LoginDropdownProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

function LoginDropdown({ isOpen, onClose }: LoginDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="menu"
          aria-label="Seleccionar tipo de portal"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute right-0 top-[calc(100%+12px)] z-50 w-[320px] overflow-hidden rounded-[20px]"
          style={{
            backgroundColor: "var(--dropdown-bg)",
            border: "1px solid var(--dropdown-border)",
            boxShadow: "var(--shadow-card-dark)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-[1px]"
            style={{ background: "var(--accent-line)" }}
          />

          <div
            className="px-5 py-4"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "var(--text-muted)" }}
            >
              Acceder como
            </p>
          </div>

          <motion.div
            variants={itemStagger}
            initial="hidden"
            animate="visible"
            className="p-3 space-y-1"
          >
            {PORTAL_ITEMS.map((portal) => {
              const Icon = portal.icon;
              return (
                <motion.div key={portal.to} variants={itemFade}>
                  <Link
                    to={portal.to}
                    onClick={onClose}
                    role="menuitem"
                    className={`group flex items-center gap-3 rounded-[14px] px-4 py-3 ${DROPDOWN_ITEM_HOVER}`}
                  >
                    <span
                      className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--surface-card)",
                        border: "1px solid var(--border-default)",
                      }}
                    >
                      <Icon
                        size={16}
                        style={{ color: "var(--text-muted)" }}
                        className="group-hover:text-brand-400 transition-colors duration-200"
                      />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {portal.label}
                      </p>
                      <p
                        className="text-[11px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {portal.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={13}
                      className="flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
                      style={{ color: "var(--text-disabled)" }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL: Navbar
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Navbar institucional de Lúmina.
 *
 * Características:
 * - Sticky con elevación dinámica al hacer scroll
 * - Toggle dark/light con persistencia en localStorage
 * - Dropdown "Ecosistema" con 3 módulos y stagger animation
 * - Micro-menú "Ingresar" con selección de portal
 * - CTA "Agendar Demo" con gradiente y shimmer
 * - Menú mobile accesible con acordeón de Ecosistema
 * - Isotipo de marca en SVG inline, coloreado con el token de marca activo
 * - Hover 100% declarativo (Tailwind + CSS vars) — sin listeners de mouse manuales
 */
export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileEcosystemOpen, setMobileEcosystemOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();

  const ecosystemRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Cerrar todo al cambiar de ruta ──
  useEffect(() => {
    setEcosystemOpen(false);
    setLoginOpen(false);
    setMobileOpen(false);
    setMobileEcosystemOpen(false);
  }, [pathname]);

  // ── Click fuera cierra dropdowns ──
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      ecosystemRef.current &&
      !ecosystemRef.current.contains(e.target as Node)
    ) {
      setEcosystemOpen(false);
    }
    if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
      setLoginOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // ── Cierre en resize ──
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isActivePath = (path: string) => pathname === path;

  return (
    <nav
      aria-label="Navegación principal de Lúmina"
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? "var(--nav-bg-scrolled)"
          : "var(--nav-bg)",
        borderBottom: `1px solid ${
          scrolled ? "var(--nav-border-scrolled)" : "var(--nav-border)"
        }`,
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.12)" : "none",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">

          {/* ── 1. IDENTIDAD DE MARCA ── */}
          <Link
            to="/"
            className="group flex flex-shrink-0 items-center gap-2.5"
            aria-label="Lúmina by Loopra — Inicio"
          >
            <LuminaMark className="h-9 w-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />

            <span className="flex flex-col leading-none">
              <span
                className="text-xl font-black italic tracking-tight transition-colors duration-200"
                style={{ color: "var(--text-primary)" }}
              >
                Lú
                <span className="text-gradient-brand">mina</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
                </span>
                <span
                  className="text-[8px] font-bold uppercase tracking-[0.4em] transition-colors duration-200"
                  style={{ color: "var(--text-disabled)" }}
                >
                  by Loopra
                </span>
              </span>
            </span>
          </Link>

          {/* ── 2. NAVEGACIÓN CENTRAL (desktop) ── */}
          <div className="hidden lg:flex items-center gap-1">

            {/* Dropdown Ecosistema */}
            <div ref={ecosystemRef} className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={ecosystemOpen}
                onClick={() => {
                  setEcosystemOpen((v) => !v);
                  setLoginOpen(false);
                }}
                className={navLinkClasses(ecosystemOpen)}
              >
                <Sparkles size={13} className="text-brand-500" aria-hidden="true" />
                Ecosistema
                <motion.span
                  animate={{ rotate: ecosystemOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ChevronDown size={13} />
                </motion.span>
              </button>
              <EcosystemDropdown
                isOpen={ecosystemOpen}
                onClose={() => setEcosystemOpen(false)}
              />
            </div>

            {/* Lúmina Optimizer */}
            <DesktopNavLink
              to="/optimizer"
              icon={CalendarClock}
              label="Lúmina Optimizer"
              active={isActivePath("/optimizer")}
            />

            {/* Planes */}
            <DesktopNavLink
              to="/planes"
              icon={CreditCard}
              label="Planes"
              active={isActivePath("/planes")}
            />
          </div>

          {/* ── 3. ACCIONES DERECHA (desktop) ── */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Toggle de tema */}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            {/* Separador */}
            <div
              className="h-5 w-px"
              style={{ backgroundColor: "var(--border-default)" }}
            />

            {/* Botón Ingresar con micro-menú */}
            <div ref={loginRef} className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={loginOpen}
                onClick={() => {
                  setLoginOpen((v) => !v);
                  setEcosystemOpen(false);
                }}
                className={loginTriggerClasses(loginOpen)}
              >
                <LogIn size={13} aria-hidden="true" />
                Ingresar
                <motion.span
                  animate={{ rotate: loginOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ChevronDown size={12} />
                </motion.span>
              </button>
              <LoginDropdown
                isOpen={loginOpen}
                onClose={() => setLoginOpen(false)}
              />
            </div>

            {/* CTA principal: Agendar Demo */}
            <Link
              to="/demo"
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:scale-105 active:scale-[0.98]"
              style={{
                background: "var(--gradient-brand)",
                boxShadow: "var(--shadow-glow-brand)",
              }}
            >
              {/* Shimmer */}
              <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-full" />
              <CalendarClock size={14} className="relative z-10" aria-hidden="true" />
              <span className="relative z-10">Agendar Demo</span>
            </Link>
          </div>

          {/* ── CONTROLES MOBILE (theme toggle + hamburger) ── */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            <motion.button
              type="button"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-secondary)] transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── MENÚ MOBILE ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden lg:hidden"
            style={{
              borderTop: "1px solid var(--border-subtle)",
              backgroundColor: "var(--nav-bg-scrolled)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="px-4 pb-6 pt-4 space-y-1.5">

              {/* Ecosistema mobile */}
              <div>
                <button
                  type="button"
                  aria-expanded={mobileEcosystemOpen}
                  onClick={() => setMobileEcosystemOpen((v) => !v)}
                  className={MOBILE_CHIP_BASE}
                >
                  <Sparkles size={16} className="text-brand-500" aria-hidden="true" />
                  <span className="flex-1 text-left">Ecosistema</span>
                  <motion.span
                    animate={{ rotate: mobileEcosystemOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileEcosystemOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="ml-3 mt-1.5 space-y-0.5 pl-3"
                        style={{
                          borderLeft: "1px solid var(--border-brand)",
                        }}
                      >
                        {ECOSYSTEM_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setMobileOpen(false)}
                              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[var(--text-secondary)] transition-colors duration-200"
                            >
                              <Icon
                                size={15}
                                className="flex-shrink-0 text-brand-500"
                                aria-hidden="true"
                              />
                              <div className="min-w-0">
                                <p
                                  className="text-sm font-semibold"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {item.label}
                                </p>
                                <p
                                  className="text-xs"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Lúmina Optimizer mobile */}
              <Link
                to="/optimizer"
                onClick={() => setMobileOpen(false)}
                className={MOBILE_CHIP_BASE}
              >
                <CalendarClock size={16} className="text-brand-500" aria-hidden="true" />
                Lúmina Optimizer
              </Link>

              {/* Planes mobile */}
              <Link
                to="/planes"
                onClick={() => setMobileOpen(false)}
                className={MOBILE_CHIP_BASE}
              >
                <CreditCard size={16} className="text-brand-500" aria-hidden="true" />
                Planes
              </Link>

              {/* Separador */}
              <div
                className="my-2 h-px"
                style={{ backgroundColor: "var(--border-subtle)" }}
              />

              {/* Portales de acceso mobile */}
              <p
                className="px-2 pb-1 text-[9px] font-bold uppercase tracking-[0.4em]"
                style={{ color: "var(--text-disabled)" }}
              >
                Acceder como
              </p>

              {PORTAL_ITEMS.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Link
                    key={portal.to}
                    to={portal.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] px-4 py-3 text-[var(--text-secondary)] transition-colors duration-200"
                  >
                    <span
                      className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl"
                      style={{
                        backgroundColor: "var(--interactive-brand-bg)",
                        border: "1px solid var(--border-brand)",
                      }}
                    >
                      <Icon size={14} className="text-brand-500" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {portal.label}
                      </p>
                      <p
                        className="text-[11px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {portal.description}
                      </p>
                    </div>
                  </Link>
                );
              })}

              {/* CTA Demo mobile */}
              <Link
                to="/demo"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-transform duration-200 active:scale-[0.98]"
                style={{
                  background: "var(--gradient-brand)",
                  boxShadow: "var(--shadow-glow-brand)",
                }}
              >
                <CalendarClock size={16} aria-hidden="true" />
                Agendar Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
