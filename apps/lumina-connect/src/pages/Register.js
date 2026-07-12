import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Check } from "lucide-react";
import { useAuth, signUp } from "@lumina/data-access";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GoogleIcon = () => (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [_jsx("path", { d: "M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z", fill: "#4285F4" }), _jsx("path", { d: "M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z", fill: "#34A853" }), _jsx("path", { d: "M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z", fill: "#FBBC05" }), _jsx("path", { d: "M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z", fill: "#EA4335" })] }));
const perks = [
    "Horarios ilimitados",
    "Sincronización en tiempo real",
    "Acceso desde cualquier dispositivo",
];
// ── Partículas ─────────────────────────────────────────────────
function Particles() {
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
        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            life: Math.random(),
            size: Math.random() * 1.5 + 0.3,
        }));
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
    return _jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full pointer-events-none" });
}
export default function Register() {
    const { signInWithGoogle, user, isLoading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "" });
    const [errors, setErrors] = useState({ name: "", email: "", password: "", confirm: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        if (user && !isLoading)
            navigate("/dashboard", { replace: true });
    }, [user, isLoading, navigate]);
    const validate = () => {
        const next = { name: "", email: "", password: "", confirm: "" };
        if (!formData.name.trim())
            next.name = "El nombre es obligatorio";
        if (!formData.email.trim())
            next.email = "El correo es obligatorio";
        else if (!emailRegex.test(formData.email))
            next.email = "Correo inválido";
        if (!formData.password.trim())
            next.password = "La contraseña es obligatoria";
        else if (formData.password.length < 8)
            next.password = "Mínimo 8 caracteres";
        if (formData.password !== formData.confirm)
            next.confirm = "Las contraseñas no coinciden";
        setErrors(next);
        return !Object.values(next).some(Boolean);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate())
            return;
        setSubmitting(true);
        const result = await signUp(formData.email, formData.password, formData.name);
        setSubmitting(false);
        if (!result.success) {
            toast.error("Error al crear cuenta", { description: result.error });
            return;
        }
        toast.success("Cuenta creada ⚡", { description: "Revisa tu correo para confirmar tu cuenta." });
        navigate("/login");
    };
    const handleGoogleLogin = async () => {
        const result = await signInWithGoogle();
        if (!result.success && result.error) {
            toast.error("Error con Google", { description: result.error });
        }
    };
    const passwordStrength = () => {
        const p = formData.password;
        if (!p)
            return 0;
        let score = 0;
        if (p.length >= 8)
            score++;
        if (/[A-Z]/.test(p))
            score++;
        if (/[0-9]/.test(p))
            score++;
        if (/[^A-Za-z0-9]/.test(p))
            score++;
        return score;
    };
    const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#00f2ff"];
    const strengthLabels = ["", "Débil", "Regular", "Buena", "Fuerte"];
    const strength = passwordStrength();
    const fieldClass = (field) => `relative rounded-2xl transition-all duration-200 bg-white/4 ${focusedField === field ? "ring-1 ring-cyan-500/50"
        : errors[field] ? "ring-1 ring-red-500/50"
            : "ring-1 ring-white/8"}`;
    const iconClass = (field) => `absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === field ? "text-cyan-400" : "text-gray-600"}`;
    return (_jsxs("div", { className: "min-h-screen bg-[#080a0c] flex overflow-hidden relative", children: [_jsx(Particles, {}), _jsx("div", { className: "absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" }), _jsx("div", { className: "absolute top-0 right-0 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" }), _jsxs("div", { className: "hidden lg:flex lg:w-[38%] relative flex-col justify-between p-12 border-r border-white/5", children: [_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "relative z-10", children: _jsxs(Link, { to: "/", className: "inline-flex items-center gap-3 group", children: [_jsx("img", { src: "/logo.svg", alt: "VoltSchedule", className: "w-9 h-9 transition-transform duration-200 group-hover:scale-105" }), _jsx("span", { className: "text-white font-black text-xl tracking-tight transition-colors duration-200 group-hover:text-[#00f2ff]", children: "VoltSchedule" })] }) }), _jsxs(motion.div, { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.7, delay: 0.15 }, className: "relative z-10 space-y-8", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-4xl font-black text-white leading-[1.1] tracking-[-0.03em]", children: ["Empieza hoy,", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text", style: { backgroundImage: "linear-gradient(90deg, #00f2ff, #0080ff)" }, children: "gratis." })] }), _jsx("p", { className: "text-gray-500 text-sm leading-7 mt-4 max-w-xs", children: "Crea tu cuenta en segundos y toma el control de tu tiempo desde el primer d\u00EDa." })] }), _jsx("div", { className: "space-y-3", children: perks.map((perk, i) => (_jsxs(motion.div, { initial: { opacity: 0, x: -16 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 + i * 0.1 }, className: "flex items-center gap-3", children: [_jsx("div", { className: "w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0", children: _jsx(Check, { size: 11, className: "text-cyan-400", strokeWidth: 3 }) }), _jsx("span", { className: "text-gray-400 text-sm", children: perk })] }, perk))) })] }), _jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 }, className: "relative z-10 text-[10px] uppercase tracking-[0.35em] text-gray-700 font-bold", children: "Powered by Supabase" })] }), _jsx("div", { className: "flex-1 flex items-center justify-center px-6 py-12 relative", children: _jsxs(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 }, className: "w-full max-w-md relative z-10", children: [_jsx("div", { className: "flex items-center gap-2 mb-10 lg:hidden", children: _jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 group", children: [_jsx("img", { src: "/logo.svg", alt: "VoltSchedule", className: "w-8 h-8 transition-transform duration-200 group-hover:scale-105" }), _jsx("span", { className: "text-white font-black tracking-tight transition-colors duration-200 group-hover:text-[#00f2ff]", children: "VoltSchedule" })] }) }), _jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-black text-white tracking-[-0.03em]", children: "Crear cuenta" }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: "\u00DAnete y organiza tu tiempo" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: fieldClass("name"), children: [_jsx(User, { size: 16, className: iconClass("name") }), _jsx("input", { name: "name", type: "text", value: formData.name, onChange: handleChange, onFocus: () => setFocusedField("name"), onBlur: () => setFocusedField(null), placeholder: "Nombre completo", className: "w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none rounded-2xl" })] }), _jsx(AnimatePresence, { children: errors.name && (_jsx(motion.p, { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, className: "text-xs text-red-400 mt-1.5 ml-1", children: errors.name })) })] }), _jsxs("div", { children: [_jsxs("div", { className: fieldClass("email"), children: [_jsx(Mail, { size: 16, className: iconClass("email") }), _jsx("input", { name: "email", type: "email", value: formData.email, onChange: handleChange, onFocus: () => setFocusedField("email"), onBlur: () => setFocusedField(null), placeholder: "correo@ejemplo.com", className: "w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none rounded-2xl" })] }), _jsx(AnimatePresence, { children: errors.email && (_jsx(motion.p, { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, className: "text-xs text-red-400 mt-1.5 ml-1", children: errors.email })) })] }), _jsxs("div", { children: [_jsxs("div", { className: fieldClass("password"), children: [_jsx(Lock, { size: 16, className: iconClass("password") }), _jsx("input", { name: "password", type: showPassword ? "text" : "password", value: formData.password, onChange: handleChange, onFocus: () => setFocusedField("password"), onBlur: () => setFocusedField(null), placeholder: "Contrase\u00F1a", className: "w-full bg-transparent pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none rounded-2xl" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors", children: showPassword ? _jsx(EyeOff, { size: 16 }) : _jsx(Eye, { size: 16 }) })] }), formData.password && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mt-2 px-1", children: [_jsx("div", { className: "flex gap-1 mb-1", children: [1, 2, 3, 4].map((i) => (_jsx("div", { className: "h-0.5 flex-1 rounded-full transition-all duration-300", style: { background: i <= strength ? strengthColors[strength] : "rgba(255,255,255,0.08)" } }, i))) }), _jsx("p", { className: "text-[11px]", style: { color: strengthColors[strength] }, children: strengthLabels[strength] })] })), _jsx(AnimatePresence, { children: errors.password && (_jsx(motion.p, { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, className: "text-xs text-red-400 mt-1.5 ml-1", children: errors.password })) })] }), _jsxs("div", { children: [_jsxs("div", { className: fieldClass("confirm"), children: [_jsx(Lock, { size: 16, className: iconClass("confirm") }), _jsx("input", { name: "confirm", type: showConfirm ? "text" : "password", value: formData.confirm, onChange: handleChange, onFocus: () => setFocusedField("confirm"), onBlur: () => setFocusedField(null), placeholder: "Confirmar contrase\u00F1a", className: "w-full bg-transparent pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none rounded-2xl" }), _jsx("button", { type: "button", onClick: () => setShowConfirm(!showConfirm), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors", children: showConfirm ? _jsx(EyeOff, { size: 16 }) : _jsx(Eye, { size: 16 }) })] }), _jsx(AnimatePresence, { children: errors.confirm && (_jsx(motion.p, { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, className: "text-xs text-red-400 mt-1.5 ml-1", children: errors.confirm })) })] }), _jsx("button", { type: "submit", disabled: submitting || isLoading, className: "w-full bg-[#00f2ff] text-[#080a0c] font-black text-sm uppercase tracking-widest py-3.5 rounded-2xl transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed", style: { boxShadow: "0 0 24px rgba(0,242,255,0.15)" }, children: submitting ? "Creando cuenta..." : "Crear cuenta" })] }), _jsxs("div", { className: "relative my-6", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-white/8" }) }), _jsx("div", { className: "relative flex justify-center", children: _jsx("span", { className: "px-4 bg-[#080a0c] text-[11px] uppercase tracking-[0.3em] text-gray-600 font-bold", children: "o continuar con" }) })] }), _jsxs("button", { onClick: handleGoogleLogin, disabled: isLoading, className: "w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold text-sm py-3.5 rounded-2xl transition-all hover:bg-gray-100 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed", children: [_jsx(GoogleIcon, {}), isLoading ? "Redirigiendo..." : "Registrarse con Google"] }), _jsxs("p", { className: "text-center text-sm text-gray-600 mt-8", children: ["\u00BFYa tienes cuenta?", " ", _jsx(Link, { to: "/login", className: "text-cyan-400 font-semibold hover:text-cyan-300 transition-colors", children: "Iniciar sesi\u00F3n" })] })] }) })] }));
}
