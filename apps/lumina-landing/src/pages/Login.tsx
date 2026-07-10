import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@lumina/data-access";
import { toast } from "sonner";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Partículas (igual que NotFound) ───────────────────────────
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      vx:   (Math.random() - 0.5) * 0.4,
      vy:   (Math.random() - 0.5) * 0.4,
      life: Math.random(),
      size: Math.random() * 1.5 + 0.3,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.004;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Login() {
  const { signInWithPassword, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "";

  const appOptions = useMemo(
    () => [
      {
        id: "admin-hub",
        name: "Admin Hub",
        description: "Panel administrativo",
        url: import.meta.env.VITE_ADMIN_HUB_URL ?? "http://localhost:5175/dashboard",
      },
      {
        id: "faculty-portal",
        name: "Faculty Portal",
        description: "Portal docente",
        url: import.meta.env.VITE_FACULTY_PORTAL_URL ?? "http://localhost:5176/dashboard",
      },
      {
        id: "connect",
        name: "Lumina Connect",
        description: "Conexión estudiantil",
        url: import.meta.env.VITE_CONNECT_URL ?? "http://localhost:5177/dashboard",
      },
    ],
    []
  );

  const [selectedApp, setSelectedApp] = useState(() => {
    return appOptions.find((app) => redirect && redirect.includes(app.url)) ?? appOptions[0];
  });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isLoading) {
      if (redirect) {
        window.location.href = redirect;
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, isLoading, navigate, redirect]);

  const validate = () => {
    const nextErrors = { email: "", password: "" };
    if (!formData.email.trim())           nextErrors.email    = "El correo es obligatorio";
    else if (!emailRegex.test(formData.email)) nextErrors.email = "Correo inválido";
    if (!formData.password.trim())        nextErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 8) nextErrors.password = "Mínimo 8 caracteres";
    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev)    => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await signInWithPassword(formData.email, formData.password);
    if (!result.success) {
      toast.error("Credenciales incorrectas", { description: result.error });
      return;
    }
    toast.success("Bienvenido de nuevo ⚡");
    const destination = redirect || selectedApp.url || "/dashboard";
    if (destination.startsWith("http")) {
      window.location.href = destination;
    } else {
      navigate(destination, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-surface-base flex overflow-hidden relative">

      {/* ── Partículas globales ── */}
      <Particles />

      {/* ── Glows ambientales ── */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--lumina-brand-soft)] rounded-full blur-[100px] pointer-events-none" />

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[38%] relative flex-col justify-between p-12 border-r border-[var(--border-subtle)]">

        {/* Logo → "/" */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <Link to="/" className="inline-flex items-center gap-3 group">
            <img
              src="/favicon.svg"
              alt="VoltSchedule"
              className="w-9 h-9 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-white font-black text-xl tracking-tight transition-colors duration-200 group-hover:text-lumina-brand">
              VoltSchedule
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative z-10 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-[var(--interactive-brand-bg)]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500">En línea</span>
          </div>
          <h2 className="text-4xl font-black text-white leading-[1.1] tracking-[-0.03em]">
            Gestiona tu<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #05AD98, #048a7a)" }}>
              tiempo libre.
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-7 max-w-xs">
            Horarios precisos, flujo de trabajo inteligente y control total de tu agenda estudiantil.
          </p>
          <div className="flex gap-6 pt-2">
            {[["2k+", "Usuarios"], ["99.9%", "Uptime"], ["0ms", "Latencia"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-white font-black text-lg">{num}</p>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 text-[10px] uppercase tracking-[0.35em] text-[var(--text-secondary)] font-bold"
        >
          Powered by Supabase
        </motion.p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo → "/" */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <img src="/favicon.svg" alt="VoltSchedule" className="w-8 h-8 transition-transform duration-200 group-hover:scale-105" />
              <span className="text-white font-black tracking-tight transition-colors duration-200 group-hover:text-lumina-brand">
                VoltSchedule
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white tracking-[-0.03em]">Bienvenido</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1">Ingresa tus credenciales para continuar</p>
          </div>

          <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-[var(--text-disabled)] mb-4">Como tester, selecciona la lúmina y accede con tu correo.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {appOptions.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setSelectedApp(app)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    selectedApp.id === app.id
                      ? "border-brand-500 bg-brand-500/10 shadow-[0_0_24px_rgba(5,173,152,0.15)]"
                      : "border-[var(--border-default)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{app.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{app.description}</p>
                </button>
              ))}
            </div>
            <p className="text-xs text-[var(--text-disabled)] mt-4">
              {redirect ? (
                <>Se usará el destino de redirección externo después del inicio de sesión.</>
              ) : (
                <>Iniciarás sesión y serás dirigido a <span className="text-brand-300">{selectedApp.name}</span>.</>
              )}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className={`relative rounded-2xl transition-all duration-200 bg-white/4 ${
                focusedField === "email"  ? "ring-1 ring-cyan-500/50"
                : errors.email           ? "ring-1 ring-red-500/50"
                : "ring-1 ring-white/8"
              }`}>
                <Mail size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-brand-500" : "text-[var(--text-muted)]"}`} />
                <input
                  id="email" name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none rounded-2xl"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-1.5 ml-1">
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div className={`relative rounded-2xl transition-all duration-200 bg-white/4 ${
                focusedField === "password" ? "ring-1 ring-cyan-500/50"
                : errors.password           ? "ring-1 ring-red-500/50"
                : "ring-1 ring-white/8"
              }`}>
                <Lock size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "password" ? "text-brand-500" : "text-[var(--text-muted)]"}`} />
                <input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password} onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Contraseña"
                  className="w-full bg-transparent pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none rounded-2xl"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-1.5 ml-1">
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-[var(--text-secondary)] hover:text-brand-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full bg-brand-500 text-[var(--lumina-text-on-brand)] font-black text-sm uppercase tracking-widest py-3.5 rounded-2xl transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 0 24px rgba(5,173,152,0.15)" }}
            >
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-8">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-brand-300 font-semibold hover:text-brand-200 transition-colors">
              Crear cuenta
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
