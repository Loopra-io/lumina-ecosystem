import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Stat({ label, value }) {
    return (_jsxs("div", { className: "rounded-lg bg-white/5 border border-white/10 p-4", children: [_jsx("div", { className: "text-xs text-gray-400 uppercase", children: label }), _jsx("div", { className: "mt-2 text-2xl font-bold", children: value })] }));
}
export default function Dashboard() {
    return (_jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("header", { className: "mb-6", children: [_jsx("h1", { className: "text-3xl font-black", children: "Admin Hub" }), _jsx("p", { className: "text-gray-400", children: "Panel administrativo \u2014 funcionalidad en construcci\u00F3n." })] }), _jsxs("section", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsx(Stat, { label: "Usuarios", value: 128 }), _jsx(Stat, { label: "Cursos", value: 24 }), _jsx(Stat, { label: "Aulas", value: 12 }), _jsx(Stat, { label: "Per\u00EDodos", value: 3 })] }), _jsx("section", { className: "mt-8", children: _jsxs("div", { className: "rounded-lg bg-white/3 p-6 border border-white/6", children: [_jsx("h2", { className: "font-bold", children: "Actividades recientes" }), _jsx("p", { className: "text-sm text-gray-400 mt-2", children: "No hay actividad real en este entorno de desarrollo." })] }) })] }));
}
