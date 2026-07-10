import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@lumina/data-access';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ExternalLoginRedirect from './components/ExternalLoginRedirect';
export default function App() {
    return (_jsx(AuthProvider, { children: _jsx(BrowserRouter, { children: _jsx("div", { className: "min-h-screen bg-gray-900 text-white p-6", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(ExternalLoginRedirect, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }) }) }) }));
}
