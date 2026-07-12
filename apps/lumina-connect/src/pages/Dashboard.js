import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ListChecks, Calendar, Coins, Calculator, User, QrCode, CalendarCheck, CheckCircle2, TriangleAlert, Clock, School, FlaskConical, ClipboardList, } from 'lucide-react';
import { useSchedules } from '@lumina/data-access';
// ── Mock data (reemplazar con hooks reales) ────────────────────
const MOCK_ALERTS = [
    { id: '1', type: 'success', label: 'Entregado', text: 'Tarea de Programación' },
    { id: '2', type: 'warning', label: 'Examen', text: 'Física el jueves (¡Estudiar!)' },
    { id: '3', type: 'danger', label: 'Hoy', text: 'Entrega de Proyecto 23:59' },
];
const MOCK_SCHEDULE = [
    { id: '1', time: '08:00 AM', subject: 'Historia', room: 'Salón 3', icon: School },
    { id: '2', time: '11:00 AM', subject: 'Laboratorio Química', room: undefined, icon: FlaskConical },
];
// ── Paleta de alertas ──────────────────────────────────────────
const alertStyles = {
    success: { icon: CheckCircle2, bar: 'bg-green-400', iconColor: 'text-green-400', labelColor: 'text-green-400' },
    warning: { icon: TriangleAlert, bar: 'bg-yellow-400', iconColor: 'text-yellow-400', labelColor: 'text-yellow-400' },
    danger: { icon: Clock, bar: 'bg-red-400', iconColor: 'text-red-400', labelColor: 'text-red-400' },
};
// ── Variantes ──────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
// ── StatCard ───────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, onClick }) {
    return (_jsxs(motion.button, { variants: cardVariants, whileHover: { scale: 1.025, transition: { duration: 0.2 } }, whileTap: { scale: 0.97 }, onClick: onClick, className: "group relative w-full text-left rounded-[32px] border border-white/10 bg-white/5\n                 p-5 shadow-lg shadow-black/30 transition-colors duration-200\n                 hover:border-[#00f2ff]/20 hover:bg-[#00f2ff]/5", children: [_jsx("span", { className: "pointer-events-none absolute inset-0 rounded-[32px] opacity-0\n                   transition-opacity duration-300 group-hover:opacity-100", style: { boxShadow: 'inset 0 0 28px 0 rgba(0,242,255,0.05)' } }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl\n                     border border-white/10 bg-white/5 transition-colors duration-200\n                     group-hover:border-[#00f2ff]/20 group-hover:bg-[#00f2ff]/10", children: _jsx(Icon, { size: 20, className: "text-gray-400 transition-colors duration-200 group-hover:text-[#00f2ff]" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-gray-500", children: label }), _jsx("p", { className: "mt-0.5 text-2xl font-black tracking-tight text-white", children: value })] })] })] }));
}
// ── Dashboard ──────────────────────────────────────────────────
export default function Dashboard() {
    const { schedules, loading: _l, error: _e } = useSchedules();
    const [stats, setStats] = useState({
        totalSubjects: 0,
        pendingTasks: 0,
        classesToday: 0,
        balance: '$0.00',
        totalCalculations: 0,
        totalTeachers: 0,
        totalScans: 0,
        totalEvents: 0,
    });
    useEffect(() => {
        const getItem = (key, fallback) => {
            try {
                return JSON.parse(localStorage.getItem(key) ?? '') ?? fallback;
            }
            catch {
                return fallback;
            }
        };
        const subjects = getItem('subjects', []);
        const tasks = getItem('tasks', []);
        const transactions = getItem('transactions', []);
        const pendingTasks = tasks.filter((t) => !t.completed).length;
        const income = transactions.filter((t) => t.type === 'ingreso').reduce((s, t) => s + parseFloat(t.amount ?? 0), 0);
        const expenses = transactions.filter((t) => t.type === 'gasto').reduce((s, t) => s + parseFloat(t.amount ?? 0), 0);
        const uniqueTeachers = new Set(subjects.map((s) => s.professor)).size;
        setStats({
            totalSubjects: subjects.length,
            pendingTasks,
            classesToday: schedules.length,
            balance: `$${(income - expenses).toFixed(2)}`,
            totalCalculations: 0,
            totalTeachers: uniqueTeachers,
            totalScans: 0,
            totalEvents: schedules.length,
        });
    }, [schedules]);
    const statItems = [
        { icon: BookOpen, label: 'Materias', value: stats.totalSubjects },
        { icon: ListChecks, label: 'Tareas Pendientes', value: stats.pendingTasks },
        { icon: Calendar, label: 'Clases Hoy', value: stats.classesToday },
        { icon: Coins, label: 'Balance', value: stats.balance },
        { icon: Calculator, label: 'Cálculo', value: stats.totalCalculations },
        { icon: User, label: 'Profesores', value: stats.totalTeachers },
        { icon: QrCode, label: 'Escáner', value: stats.totalScans },
        { icon: CalendarCheck, label: 'Eventos', value: stats.totalEvents },
    ];
    return (_jsxs("div", { className: "flex flex-col gap-8", children: [_jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "grid grid-cols-2 gap-3 lg:grid-cols-4", children: statItems.map((item) => (_jsx(StatCard, { icon: item.icon, label: item.label, value: item.value }, item.label))) }), _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [_jsxs(motion.div, { variants: fadeUp, className: "rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30", children: [_jsxs("div", { className: "mb-5 flex items-center gap-3", children: [_jsx("span", { className: "grid h-9 w-9 place-items-center rounded-2xl border border-[#00f2ff]/20 bg-[#00f2ff]/10", children: _jsx(TriangleAlert, { size: 15, className: "text-[#00f2ff]" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f2ff]/70", children: "Pendientes" }), _jsx("h3", { className: "text-sm font-black text-white leading-tight", children: "Alertas y Entregas" })] })] }), _jsx("div", { className: "h-px w-full bg-white/5 mb-4" }), _jsx("div", { className: "space-y-2", children: MOCK_ALERTS.map((alert) => {
                                    const s = alertStyles[alert.type];
                                    return (_jsxs("div", { className: "group flex overflow-hidden rounded-[20px] border border-white/6\n                             bg-white/3 transition-colors duration-200 hover:bg-white/5", children: [_jsx("div", { className: `w-1 flex-shrink-0 ${s.bar} opacity-60 group-hover:opacity-100 transition-opacity duration-200` }), _jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5 flex-1 min-w-0", children: [_jsx(s.icon, { size: 14, className: `flex-shrink-0 ${s.iconColor}` }), _jsxs("p", { className: "text-xs text-gray-400 truncate", children: [_jsxs("span", { className: `font-bold ${s.labelColor}`, children: [alert.label, ":\u00A0"] }), alert.text] })] })] }, alert.id));
                                }) }), MOCK_ALERTS.length === 0 && (_jsxs("div", { className: "flex flex-col items-center gap-2 py-10", children: [_jsx(CheckCircle2, { size: 28, className: "text-white/10" }), _jsx("p", { className: "text-xs text-gray-600", children: "Sin alertas pendientes" })] }))] }), _jsxs(motion.div, { variants: fadeUp, className: "rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30", children: [_jsxs("div", { className: "mb-5 flex items-center gap-3", children: [_jsx("span", { className: "grid h-9 w-9 place-items-center rounded-2xl border border-[#00f2ff]/20 bg-[#00f2ff]/10", children: _jsx(Clock, { size: 15, className: "text-[#00f2ff]" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f2ff]/70", children: "Agenda" }), _jsx("h3", { className: "text-sm font-black text-white leading-tight", children: "Horario de Hoy" })] })] }), _jsx("div", { className: "h-px w-full bg-white/5 mb-4" }), _jsx("div", { className: "space-y-2", children: MOCK_SCHEDULE.map((item) => (_jsxs("div", { className: "group flex overflow-hidden rounded-[20px] border border-white/6\n                           bg-white/3 transition-colors duration-200 hover:bg-white/5", children: [_jsx("div", { className: "w-1 flex-shrink-0 bg-[#00f2ff] opacity-40 group-hover:opacity-80 transition-opacity duration-200" }), _jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5 flex-1 min-w-0", children: [_jsx(item.icon, { size: 14, className: "flex-shrink-0 text-[#00f2ff]/60" }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-xs font-black text-white truncate", children: item.subject }), _jsxs("p", { className: "text-[10px] text-gray-500", children: [item.time, item.room ? ` · ${item.room}` : ''] })] })] })] }, item.id))) }), MOCK_SCHEDULE.length === 0 && (_jsxs("div", { className: "flex flex-col items-center gap-2 py-10", children: [_jsx(ClipboardList, { size: 28, className: "text-white/10" }), _jsx("p", { className: "text-xs text-gray-600", children: "No hay clases programadas hoy" })] }))] })] })] }));
}
