import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Card({ title, children }) {
    return (_jsxs("div", { className: "rounded-lg bg-white/5 border border-white/10 p-4", children: [_jsx("div", { className: "text-sm font-semibold mb-2", children: title }), _jsx("div", { className: "text-sm text-gray-300", children: children })] }));
}
export default function Dashboard() {
    return (_jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("header", { className: "mb-6", children: [_jsx("h1", { className: "text-3xl font-black", children: "Faculty Portal" }), _jsx("p", { className: "text-gray-400", children: "Panel de profesores \u2014 tablero base." })] }), _jsxs("section", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Card, { title: "Mis clases", children: "No hay clases reales en el entorno de desarrollo." }), _jsx(Card, { title: "Tareas", children: "Revisa y administra tareas de tus estudiantes." }), _jsx(Card, { title: "Estad\u00EDsticas", children: "Resumen r\u00E1pido de asistencia y desempe\u00F1o." })] })] }));
}
