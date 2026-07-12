import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
export default function NotFound() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                life: Math.random(),
                size: Math.random() * 1.5 + 0.3,
            });
        }
        let animId;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life += 0.004;
                if (p.x < 0)
                    p.x = canvas.width;
                if (p.x > canvas.width)
                    p.x = 0;
                if (p.y < 0)
                    p.y = canvas.height;
                if (p.y > canvas.height)
                    p.y = 0;
                const alpha = Math.sin(p.life * Math.PI) * 0.5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 255, ${alpha})`;
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animId);
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-[#080a0c] flex flex-col items-center justify-center px-6 overflow-hidden relative", children: [_jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full pointer-events-none" }), _jsx("div", { className: "absolute inset-0 opacity-[0.025] pointer-events-none" }), _jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" }), _jsx("div", { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" }), _jsx(motion.div, { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "absolute top-8 left-8 z-10", children: _jsxs(Link, { to: "/", className: "inline-flex items-center gap-3 group", children: [_jsx("img", { src: "/logo.svg", alt: "Volt", className: "w-9 h-9 transition-transform group-hover:scale-105" }), _jsx("div", { className: "flex flex-col", children: _jsxs("span", { className: "text-2xl font-black tracking-tighter text-white leading-none italic uppercase", children: ["Volt", _jsx("span", { className: "text-[#00f2ff]", children: "Schedule" })] }) })] }) }), _jsxs("div", { className: "relative z-10 text-center max-w-lg w-full", children: [_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, className: "relative mb-6 select-none", children: [_jsx("p", { className: "text-[10rem] md:text-[14rem] font-black leading-none tracking-[-0.05em] text-transparent", style: { WebkitTextStroke: "1px rgba(0,242,255,0.15)" }, children: "404" }), _jsx(motion.p, { animate: { x: [-2, 3, -1, 0], opacity: [0, 1, 0] }, transition: { duration: 2, repeat: Infinity, repeatDelay: 3 }, className: "absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none tracking-[-0.05em] text-cyan-400/20 pointer-events-none", children: "404" }), _jsx(motion.p, { animate: { x: [3, -2, 1, 0], opacity: [0, 0.8, 0] }, transition: { duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.05 }, className: "absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none tracking-[-0.05em] text-blue-400/15 pointer-events-none", children: "404" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400" }), _jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400", children: "Error" })] }) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.15 }, className: "space-y-4 mb-10", children: [_jsx("h1", { className: "text-2xl md:text-3xl font-black text-white tracking-[-0.03em]", children: "P\u00E1gina no encontrada" }), _jsx("p", { className: "text-gray-500 text-sm leading-7 max-w-sm mx-auto", children: "La ruta que buscas no existe, fue movida o nunca estuvo aqu\u00ED. Vuelve al inicio y retoma el control." })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.25 }, className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 bg-[#00f2ff] text-[#080a0c] font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all", style: { boxShadow: "0 0 24px rgba(0,242,255,0.15)" }, children: [_jsx(Home, { size: 14 }), "Ir al inicio"] }), _jsxs("button", { onClick: () => window.history.back(), className: "inline-flex items-center gap-2 border border-white/10 bg-white/4 text-gray-400 hover:text-white hover:border-white/20 font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl active:scale-[0.98] transition-all", children: [_jsx(ArrowLeft, { size: 14 }), "Volver atr\u00E1s"] })] })] }), _jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, className: "absolute bottom-8 text-[10px] uppercase tracking-[0.35em] text-gray-800 font-bold", children: "VoltSchedule \u2022 404" })] }));
}
