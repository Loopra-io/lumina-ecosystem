import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { DocsPage } from "./pages/Docs";
import { TemplatesPage } from "./pages/Templates";
function Placeholder({ title }) {
    return (_jsxs("div", { className: "text-white p-10", children: [_jsx("h1", { className: "text-4xl font-black mb-4", children: title }), _jsx("p", { className: "text-gray-400", children: "Esta secci\u00F3n est\u00E1 en construcci\u00F3n." })] }));
}
export default function App() {
    return (_jsxs(Router, { basename: "/lumina-connect", children: [_jsx(Toaster, { position: "top-right", theme: "dark", closeButton: true }), _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/docs", element: _jsx(DocsPage, {}) }), _jsx(Route, { path: "/templates", element: _jsx(TemplatesPage, {}) }), _jsxs(Route, { element: _jsx(ProtectedRoute, { children: _jsx(DashboardLayout, {}) }), children: [_jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/calendar", element: _jsx(Placeholder, { title: "Calendario" }) }), _jsx(Route, { path: "/schedules", element: _jsx(Placeholder, { title: "Horarios" }) }), _jsx(Route, { path: "/messages", element: _jsx(Placeholder, { title: "Mensajes" }) }), _jsx(Route, { path: "/team", element: _jsx(Placeholder, { title: "Equipo" }) }), _jsx(Route, { path: "/analytics", element: _jsx(Placeholder, { title: "Analytics" }) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) })] }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }));
}
