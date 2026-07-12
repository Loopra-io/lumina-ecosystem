import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CalendarDays, Tag, Inbox, ChevronRight } from 'lucide-react';
// ── Paleta de colores ──────────────────────────────────────────
function resolveColor(color) {
    const map = {
        cyan: { bar: 'bg-[#00f2ff]', glow: 'shadow-[#00f2ff]/20', badge: 'bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/20', text: 'text-[#00f2ff]', dot: 'bg-[#00f2ff]' },
        blue: { bar: 'bg-blue-400', glow: 'shadow-blue-400/20', badge: 'bg-blue-400/10 text-blue-300 border-blue-400/20', text: 'text-blue-300', dot: 'bg-blue-400' },
        purple: { bar: 'bg-purple-400', glow: 'shadow-purple-400/20', badge: 'bg-purple-400/10 text-purple-300 border-purple-400/20', text: 'text-purple-300', dot: 'bg-purple-400' },
        green: { bar: 'bg-green-400', glow: 'shadow-green-400/20', badge: 'bg-green-400/10 text-green-300 border-green-400/20', text: 'text-green-300', dot: 'bg-green-400' },
        yellow: { bar: 'bg-yellow-400', glow: 'shadow-yellow-400/20', badge: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20', text: 'text-yellow-300', dot: 'bg-yellow-400' },
        red: { bar: 'bg-red-400', glow: 'shadow-red-400/20', badge: 'bg-red-400/10 text-red-300 border-red-400/20', text: 'text-red-300', dot: 'bg-red-400' },
        orange: { bar: 'bg-orange-400', glow: 'shadow-orange-400/20', badge: 'bg-orange-400/10 text-orange-300 border-orange-400/20', text: 'text-orange-300', dot: 'bg-orange-400' },
        pink: { bar: 'bg-pink-400', glow: 'shadow-pink-400/20', badge: 'bg-pink-400/10 text-pink-300 border-pink-400/20', text: 'text-pink-300', dot: 'bg-pink-400' },
    };
    return map[color?.toLowerCase() ?? ''] ?? map['cyan'];
}
// ── Variantes de animación ─────────────────────────────────────
const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};
const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
// ── Loading Skeleton ───────────────────────────────────────────
function Skeleton() {
    return (_jsx("div", { className: "rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30", children: _jsxs("div", { className: "animate-pulse space-y-5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-2xl bg-white/8" }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("div", { className: "h-2 w-16 rounded-full bg-white/8" }), _jsx("div", { className: "h-4 w-36 rounded-full bg-white/10" })] })] }), _jsx("div", { className: "h-6 w-16 rounded-full bg-white/8" })] }), _jsx("div", { className: "h-px w-full bg-white/5" }), [1, 2, 3].map((i) => (_jsxs("div", { className: "flex overflow-hidden rounded-[24px] border border-white/6 bg-white/3", children: [_jsx("div", { className: "w-1 flex-shrink-0 bg-white/10" }), _jsxs("div", { className: "flex flex-1 flex-col gap-2.5 p-5", children: [_jsx("div", { className: "h-2.5 w-28 rounded-full bg-white/8" }), _jsx("div", { className: "h-4 w-48 rounded-full bg-white/10" }), _jsx("div", { className: "h-2.5 w-full rounded-full bg-white/5" }), _jsx("div", { className: "h-2.5 w-2/3 rounded-full bg-white/5" })] })] }, i)))] }) }));
}
// ── ScheduleCalendar ───────────────────────────────────────────
export function ScheduleCalendar({ schedules, loading, error }) {
    if (loading)
        return _jsx(Skeleton, {});
    if (error) {
        return (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, className: "rounded-[32px] border border-red-500/20 bg-red-500/5 p-8 shadow-lg shadow-black/30", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("span", { className: "grid h-10 w-10 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10", children: _jsx(CalendarDays, { size: 18, className: "text-red-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/70", children: "Error" }), _jsx("h2", { className: "text-base font-black text-white leading-tight", children: "No se pudieron cargar los horarios" })] })] }), _jsx("p", { className: "pl-[52px] text-sm leading-relaxed text-red-300/70", children: error })] }));
    }
    return (_jsxs(motion.section, { variants: sectionVariants, initial: "hidden", animate: "visible", className: "rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "grid h-10 w-10 place-items-center rounded-2xl border border-[#00f2ff]/20 bg-[#00f2ff]/10", children: _jsx(CalendarDays, { size: 17, className: "text-[#00f2ff]" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f2ff]/70", children: "Calendario" }), _jsx("h2", { className: "text-base font-black leading-tight text-white", children: "Pr\u00F3ximos horarios" })] })] }), _jsxs("span", { className: "flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-500", children: [schedules.length, "\u00A0", schedules.length === 1 ? 'evento' : 'eventos'] })] }), _jsx("div", { className: "mb-5 h-px w-full bg-white/5" }), _jsx(AnimatePresence, { children: schedules.length === 0 && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.97 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, className: "flex flex-col items-center gap-3 rounded-[24px] border border-white/6 bg-white/3 py-16 text-center", children: [_jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl border border-white/8 bg-white/5", children: _jsx(Inbox, { size: 22, className: "text-gray-600" }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-semibold text-gray-500", children: "Sin horarios registrados" }), _jsx("p", { className: "text-xs text-gray-700", children: "Comienza agregando tu primer evento." })] })] })) }), _jsx(motion.div, { variants: listVariants, initial: "hidden", animate: "visible", className: "space-y-3", children: schedules.map((schedule) => {
                    const c = resolveColor(schedule.color);
                    return (_jsxs(motion.article, { variants: cardVariants, whileHover: { x: 4, transition: { duration: 0.2, ease: 'easeOut' } }, className: "group relative flex overflow-hidden rounded-[24px] border border-white/6 \n                         bg-white/3 transition-colors duration-200 \n                         hover:border-white/10 hover:bg-white/5", children: [_jsx("div", { className: `w-1 flex-shrink-0 ${c.bar} opacity-60 
                            transition-opacity duration-200 group-hover:opacity-100` }), _jsxs("div", { className: "flex flex-1 flex-col gap-3 p-5 min-w-0 \n                              md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: `mb-2 flex items-center gap-1.5 text-xs font-semibold ${c.text}`, children: [_jsx(Clock, { size: 11 }), _jsxs("span", { className: "tracking-wide", children: [schedule.start_time, "\u00A0\u2192\u00A0", schedule.end_time] })] }), _jsx("h3", { className: "text-base font-black leading-snug text-white truncate", children: schedule.title }), schedule.description ? (_jsx("p", { className: "mt-1.5 text-xs leading-relaxed text-gray-500 line-clamp-2", children: schedule.description })) : (_jsx("p", { className: "mt-1.5 text-xs italic text-gray-700", children: "Sin descripci\u00F3n adicional." }))] }), _jsxs("div", { className: "flex flex-shrink-0 items-center gap-2 self-start md:self-auto", children: [schedule.color && (_jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full border 
                                  px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] 
                                  ${c.badge}`, children: [_jsx(Tag, { size: 9 }), schedule.color] })), _jsx("span", { className: "grid h-7 w-7 place-items-center rounded-xl border border-white/8 \n                               bg-white/5 text-gray-600 opacity-0 transition-opacity duration-200 \n                               group-hover:opacity-100", children: _jsx(ChevronRight, { size: 13 }) })] })] })] }, schedule.id));
                }) })] }));
}
