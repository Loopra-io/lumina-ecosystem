import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@lumina/data-access';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Clock, FileText, CheckSquare, Wallet, Lightbulb, Settings, LogOut, PanelRightOpen, } from 'lucide-react';
const scrollbarStyles = `
  .sidebar-scroll::-webkit-scrollbar {
    width: 3px;
  }
  .sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .sidebar-scroll::-webkit-scrollbar-thumb {
    background: rgba(0, 242, 255, 0.15);
    border-radius: 999px;
  }
  .sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 242, 255, 0.35);
  }
`;
const menuCategories = [
    {
        items: [
            { icon: Home, label: 'Inicio', to: '/dashboard', id: 'dashboard' },
            { icon: Clock, label: 'Horario', to: '/schedule', id: 'schedule' },
        ],
    },
    {
        items: [
            { icon: BookOpen, label: 'Materias', to: '/subjects', id: 'subjects' },
            { icon: FileText, label: 'Apuntes', to: '/notes', id: 'notes' },
            { icon: CheckSquare, label: 'Tareas', to: '/tasks', id: 'tasks' },
            { icon: Lightbulb, label: 'Estudio', to: '/study', id: 'study' },
        ],
    },
    {
        items: [
            { icon: Wallet, label: 'Finanzas', to: '/finances', id: 'finances' },
        ],
    },
];
const getInitials = (name, email) => {
    if (name)
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    if (email)
        return email.split('@')[0].slice(0, 2).toUpperCase();
    return 'VS';
};
const sidebarVariants = {
    expanded: { width: 288 },
    collapsed: { width: 80 },
};
const fadeVariants = {
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.18, ease: 'easeOut' },
    },
    hidden: {
        opacity: 0,
        x: -8,
        transition: { duration: 0.12, ease: 'easeIn' },
    },
};
const settingsVariants = {
    open: {
        opacity: 1,
        height: 'auto',
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.18, ease: 'easeIn' },
    },
};
const navContainerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.045, delayChildren: 0.05 },
    },
};
const navItemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
    },
};
export default function Sidebar({ collapsed, setCollapsed }) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const navigate = useNavigate();
    const { profile, signOut } = useAuth();
    const handleLogout = async () => {
        const result = await signOut();
        if (result.success) {
            toast.success('Sesión cerrada correctamente');
            navigate('/login', { replace: true });
        }
        else {
            toast.error('No se pudo cerrar sesión');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: scrollbarStyles }), _jsxs(motion.aside, { variants: sidebarVariants, animate: collapsed ? 'collapsed' : 'expanded', transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, className: "fixed left-0 top-0 bottom-0 z-40 flex h-full flex-col border-r border-white/10 bg-[#080a0c] text-white shadow-xl overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent" }), _jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-white/10 px-4 py-5 flex-shrink-0", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity duration-200", children: [_jsx(motion.img, { src: "/logo.svg", alt: "VoltSchedule", className: "w-10 h-10 flex-shrink-0", whileHover: { rotate: [0, -8, 8, 0], transition: { duration: 0.4 } } }), _jsx(AnimatePresence, { initial: false, children: !collapsed && (_jsxs(motion.div, { variants: fadeVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "min-w-0", children: [_jsxs("p", { className: "text-base font-black uppercase italic tracking-tight text-white whitespace-nowrap", children: ["Volt", _jsx("span", { className: "text-[#00f2ff]", children: "Schedule" })] }), _jsx("p", { className: "text-[10px] uppercase tracking-[0.35em] text-gray-500", children: "Panel" })] }, "logo-text")) })] }), _jsx(motion.button, { whileHover: { scale: 1.08 }, whileTap: { scale: 0.92 }, onClick: () => setCollapsed((prev) => !prev), className: "flex-shrink-0 grid h-10 w-10 place-items-center rounded-3xl bg-white/5 text-gray-300 transition-colors duration-200 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]", "aria-label": collapsed ? 'Abrir sidebar' : 'Cerrar sidebar', children: _jsx(motion.span, { animate: { rotate: collapsed ? 180 : 0 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, children: _jsx(PanelRightOpen, { size: 20 }) }) })] }), _jsx("nav", { className: "sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden px-4 py-6", children: _jsx(motion.div, { className: "space-y-1", variants: navContainerVariants, initial: "hidden", animate: "visible", children: menuCategories.map((category, categoryIndex) => (_jsxs(motion.div, { variants: navItemVariants, children: [categoryIndex > 0 && (_jsx("div", { className: "my-3 mx-2 h-[1px] bg-white/5" })), _jsx("div", { className: "space-y-1", children: category.items.map((item) => {
                                            const Icon = item.icon;
                                            return (_jsx(NavLink, { to: item.to, end: item.to === '/dashboard', title: collapsed ? item.label : undefined, className: ({ isActive }) => `group relative flex items-center gap-3 w-full rounded-3xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${collapsed ? 'justify-center' : ''} ${isActive
                                                    ? 'bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20'
                                                    : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'}`, children: ({ isActive }) => (_jsxs(_Fragment, { children: [isActive && (_jsx(motion.span, { layoutId: "nav-active-glow", className: "absolute inset-0 rounded-3xl bg-[#00f2ff]/5", transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } })), _jsx(motion.span, { whileHover: { scale: 1.18, rotate: isActive ? 0 : 4 }, whileTap: { scale: 0.9 }, transition: { duration: 0.2 }, className: "relative z-10 flex-shrink-0", children: _jsx(Icon, { size: 18 }) }), _jsx(AnimatePresence, { initial: false, children: !collapsed && (_jsx(motion.span, { variants: fadeVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "relative z-10 whitespace-nowrap", children: item.label }, `label-${item.id}`)) })] })) }, item.id));
                                        }) })] }, categoryIndex))) }) }), _jsx("div", { className: "border-t border-white/10 px-4 py-5 flex-shrink-0", children: profile ? (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: `flex items-center gap-3 ${collapsed ? 'justify-center' : 'justify-between'}`, children: [_jsx(AnimatePresence, { initial: false, children: !collapsed && (_jsxs(motion.div, { variants: fadeVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsxs(motion.div, { whileHover: { scale: 1.06 }, transition: { duration: 0.2 }, className: "relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[#00f2ff] text-sm font-black cursor-default", children: [getInitials(profile.full_name, profile.email), _jsxs("span", { className: "absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-40" }), _jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f2ff]/80" })] })] }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "truncate text-sm font-semibold text-white", children: profile.full_name || 'Usuario Volt' }), _jsx("p", { className: "truncate text-xs text-gray-500", children: profile.email || 'usuario@volt.com' })] })] }, "profile-info")) }), _jsx(motion.button, { whileHover: { scale: 1.08, rotate: 30 }, whileTap: { scale: 0.9 }, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }, onClick: () => setSettingsOpen(!settingsOpen), className: "flex-shrink-0 grid h-10 w-10 place-items-center rounded-3xl bg-white/5 text-gray-300 transition-colors duration-200 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]", "aria-label": "Abrir configuraci\u00F3n", children: _jsx(Settings, { size: 18 }) })] }), _jsx(AnimatePresence, { initial: false, children: settingsOpen && (_jsx(motion.div, { variants: settingsVariants, initial: "closed", animate: "open", exit: "closed", className: "overflow-hidden", children: _jsxs("div", { className: "space-y-1 pt-1", children: [_jsxs(NavLink, { to: "/settings", className: "flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors duration-200 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]", onClick: () => setSettingsOpen(false), children: [_jsx(motion.span, { whileHover: { rotate: 30 }, transition: { duration: 0.25 }, children: _jsx(Settings, { size: 15, className: "flex-shrink-0" }) }), _jsx(AnimatePresence, { initial: false, children: !collapsed && (_jsx(motion.span, { variants: fadeVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "whitespace-nowrap", children: "Configuraci\u00F3n" }, "settings-label")) })] }), _jsxs(motion.button, { whileTap: { scale: 0.97 }, onClick: handleLogout, className: `flex items-center gap-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-400 ${collapsed ? 'justify-center' : 'justify-start'}`, children: [_jsx(LogOut, { size: 15, className: "flex-shrink-0" }), _jsx(AnimatePresence, { initial: false, children: !collapsed && (_jsx(motion.span, { variants: fadeVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "whitespace-nowrap", children: "Cerrar sesi\u00F3n" }, "logout-label")) })] })] }) }, "settings-panel")) })] })) : (_jsx("div", { className: "text-xs text-gray-500 text-center", children: "Cargando usuario..." })) })] })] }));
}
