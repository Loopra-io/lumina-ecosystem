import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    return (_jsxs("div", { className: "flex h-screen bg-[#080a0c]", children: [_jsx(Sidebar, { collapsed: collapsed, setCollapsed: setCollapsed }), _jsxs(motion.div, { animate: { marginLeft: collapsed ? 80 : 288 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, className: "flex flex-col flex-1 overflow-hidden", children: [_jsx(Topbar, {}), _jsx("main", { className: "flex-1 overflow-y-auto p-6", children: _jsx(Outlet, {}) })] })] }));
}
