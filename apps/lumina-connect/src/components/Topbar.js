import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@lumina/data-access';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, ChevronRight, LayoutGrid, CalendarDays, BookOpen, FileText, CheckSquare, Wallet, Lightbulb, Settings, X, } from 'lucide-react';
// ── Mapa de rutas ──────────────────────────────────────────────
const routeMeta = {
    '/dashboard': { label: 'Inicio', icon: LayoutGrid },
    '/schedule': { label: 'Horario', icon: CalendarDays },
    '/subjects': { label: 'Materias', icon: BookOpen },
    '/notes': { label: 'Apuntes', icon: FileText },
    '/tasks': { label: 'Tareas', icon: CheckSquare },
    '/study': { label: 'Estudio', icon: Lightbulb },
    '/finances': { label: 'Finanzas', icon: Wallet },
    '/settings': { label: 'Configuración', icon: Settings },
};
// Sugerencias rápidas del modal de búsqueda
const quickLinks = [
    { label: 'Inicio', to: '/dashboard', icon: LayoutGrid },
    { label: 'Horario', to: '/schedule', icon: CalendarDays },
    { label: 'Materias', to: '/subjects', icon: BookOpen },
    { label: 'Apuntes', to: '/notes', icon: FileText },
    { label: 'Tareas', to: '/tasks', icon: CheckSquare },
    { label: 'Estudio', to: '/study', icon: Lightbulb },
    { label: 'Finanzas', to: '/finances', icon: Wallet },
    { label: 'Configuración', to: '/settings', icon: Settings },
];
const getInitials = (name, email) => {
    if (name)
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    if (email)
        return email.split('@')[0].slice(0, 2).toUpperCase();
    return '?';
};
// ── Overlay de búsqueda ────────────────────────────────────────
function SearchModal({ onClose }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const filtered = quickLinks.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()));
    // Focus automático al abrir
    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 50);
    }, []);
    // Cerrar con Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape')
            onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.18 }, className: "fixed inset-0 z-50 flex items-start justify-center pt-24 px-4", onClick: onClose, children: [_jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm" }), _jsxs(motion.div, { initial: { opacity: 0, y: -16, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.97 }, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }, onClick: (e) => e.stopPropagation(), className: "relative w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0d1012] shadow-2xl shadow-black/60 overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff]/40 to-transparent" }), _jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-white/8", children: [_jsx(Search, { size: 18, className: "text-[#00f2ff] flex-shrink-0" }), _jsx("input", { ref: inputRef, type: "text", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Buscar secci\u00F3n, tarea, materia...", className: "flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-600 font-medium" }), query && (_jsx(motion.button, { initial: { opacity: 0, scale: 0.7 }, animate: { opacity: 1, scale: 1 }, onClick: () => setQuery(''), className: "text-gray-500 hover:text-gray-300 transition-colors", children: _jsx(X, { size: 16 }) })), _jsx("kbd", { className: "hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-[10px] text-gray-500 font-mono", children: "ESC" })] }), _jsx("div", { className: "p-3 max-h-80 overflow-y-auto", children: filtered.length === 0 ? (_jsxs("p", { className: "text-center text-sm text-gray-600 py-8", children: ["Sin resultados para \"", query, "\""] })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: "px-3 pb-2 text-[10px] uppercase tracking-[0.25em] text-gray-600 font-bold", children: query ? 'Resultados' : 'Acceso rápido' }), _jsx(motion.div, { className: "space-y-0.5", initial: "hidden", animate: "visible", variants: { visible: { transition: { staggerChildren: 0.03 } } }, children: filtered.map((link) => {
                                        const Icon = link.icon;
                                        return (_jsxs(motion.a, { href: link.to, variants: {
                                                hidden: { opacity: 0, x: -8 },
                                                visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
                                            }, onClick: onClose, className: "group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-gray-300 hover:bg-[#00f2ff]/8 hover:text-white transition-colors duration-150", children: [_jsx("span", { className: "grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl bg-white/5 text-gray-400 group-hover:bg-[#00f2ff]/10 group-hover:text-[#00f2ff] transition-colors duration-150", children: _jsx(Icon, { size: 15 }) }), _jsx("span", { className: "font-medium", children: link.label }), _jsx(ChevronRight, { size: 14, className: "ml-auto text-gray-700 group-hover:text-gray-400 transition-colors" })] }, link.to));
                                    }) })] })) })] })] }, "search-overlay"));
}
// ── Topbar principal ───────────────────────────────────────────
export default function Topbar() {
    const location = useLocation();
    const { profile } = useAuth();
    const [searchOpen, setSearchOpen] = useState(false);
    const currentMeta = routeMeta[location.pathname];
    const PageIcon = currentMeta?.icon;
    // Abrir búsqueda con Cmd/Ctrl + K
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen((v) => !v);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "h-16 border-b border-white/8 bg-[#080a0c]/70 backdrop-blur-xl flex items-center justify-between px-6 text-white flex-shrink-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Panel" }), _jsx(ChevronRight, { size: 13, className: "text-gray-700" }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 }, transition: { duration: 0.18, ease: 'easeOut' }, className: "flex items-center gap-1.5", children: [PageIcon && (_jsx("span", { className: "grid h-5 w-5 place-items-center rounded-md bg-[#00f2ff]/10 text-[#00f2ff]", children: _jsx(PageIcon, { size: 11 }) })), _jsx("span", { className: "text-sm font-semibold text-white", children: currentMeta?.label ?? 'Panel de Control' })] }, location.pathname) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.97 }, onClick: () => setSearchOpen(true), className: "hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/5 border border-white/8 hover:border-white/15 hover:bg-white/8 transition-colors duration-200 group", children: [_jsx(Search, { size: 14, className: "text-gray-500 group-hover:text-gray-300 transition-colors" }), _jsx("span", { className: "text-sm text-gray-600 group-hover:text-gray-400 transition-colors w-28 text-left", children: "Buscar..." }), _jsx("kbd", { className: "flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border border-white/10 bg-white/5 text-[10px] text-gray-600 font-mono", children: "\u2318K" })] }), _jsx(motion.button, { whileHover: { scale: 1.08 }, whileTap: { scale: 0.92 }, onClick: () => setSearchOpen(true), className: "md:hidden grid h-9 w-9 place-items-center rounded-2xl bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:border-white/15 transition-colors duration-200", children: _jsx(Search, { size: 16 }) }), _jsxs(motion.button, { whileHover: { scale: 1.08 }, whileTap: { scale: 0.92 }, className: "relative grid h-9 w-9 place-items-center rounded-2xl bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:border-white/15 transition-colors duration-200", "aria-label": "Notificaciones", children: [_jsx(motion.span, { animate: { rotate: [0, -12, 12, -8, 8, 0] }, transition: { duration: 0.5, delay: 1.5, repeat: Infinity, repeatDelay: 8 }, children: _jsx(Bell, { size: 16 }) }), _jsxs("span", { className: "absolute top-1.5 right-1.5 flex h-2 w-2", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-50" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-red-500" })] })] }), _jsx("div", { className: "h-6 w-[1px] bg-white/8 mx-1" }), _jsxs(motion.div, { whileHover: { scale: 1.06 }, whileTap: { scale: 0.94 }, className: "relative h-9 w-9 rounded-2xl bg-[#00f2ff]/10 border border-[#00f2ff]/25 flex items-center justify-center cursor-pointer hover:border-[#00f2ff]/50 hover:bg-[#00f2ff]/15 transition-colors duration-200", children: [profile?.avatar_url ? (_jsx("img", { src: profile.avatar_url, alt: "Avatar", className: "w-full h-full rounded-2xl object-cover" })) : (_jsx("span", { className: "text-[11px] font-black text-[#00f2ff]", children: getInitials(profile?.full_name, profile?.email) })), _jsxs("span", { className: "absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-30" }), _jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f2ff]/80 border-2 border-[#080a0c]" })] })] })] })] }), _jsx(AnimatePresence, { children: searchOpen && _jsx(SearchModal, { onClose: () => setSearchOpen(false) }) })] }));
}
