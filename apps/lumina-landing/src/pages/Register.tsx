import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Check } from "lucide-react";
import { useAuth, signUp } from "@lumina/data-access";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const perks = [
  "Horarios ilimitados",
  "Sincronización en tiempo real",
  "Acceso desde cualquier dispositivo",
];

// ── Partículas ─────────────────────────────────────────────────
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

export default function Register() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors]     = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitting,   setSubmitting]   = useState(false);

  useEffect(() => {
    if (user && !isLoading) navigate("/dashboard", { replace: true });
  }, [user, isLoading, navigate]);

  const validate = () => {
    const next = { name: "", email: "", password: "", confirm: "" };
    if (!formData.name.trim())    next.name     = "El nombre es obligatorio";
    if (!formData.email.trim())   next.email    = "El correo es obligatorio";
    else if (!emailRegex.test(formData.email)) next.email = "Correo inválido";
    if (!formData.password.trim()) next.password = "La contraseña es obligatoria";
    else if (formData.password.length < 8)     next.password = "Mínimo 8 caracteres";
    if (formData.password !== formData.confirm) next.confirm = "Las contraseñas no coinciden";
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev)    => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
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

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8)          score++;
    if (/[A-Z]/.test(p))        score++;
    if (/[0-9]/.test(p))        score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#05AD98"];
  const strengthLabels = ["", "Débil", "Regular", "Buena", "Fuerte"];
  const strength = passwordStrength();

  const fieldClass = (field: string) =>
    `relative rounded-2xl transition-all duration-200 bg-white/4 ${
      focusedField === field ? "ring-1 ring-brand-500/50"
      : errors[field as keyof typeof errors] ? "ring-1 ring-red-500/50"
      : "ring-1 ring-white/8"
    }`;

  const iconClass = (field: string) =>
    `absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
      focusedField === field ? "text-brand-500" : "text-[var(--text-muted)]"
    }`;

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
          className="relative z-10 space-y-8"
        >
          <div>
            <h2 className="text-4xl font-black text-white leading-[1.1] tracking-[-0.03em]">
              Empieza hoy,<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #05AD98, #048a7a)" }}>
                gratis.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-7 mt-4 max-w-xs">
              Crea tu cuenta en segundos y toma el control de tu tiempo desde el primer día.
            </p>
          </div>
          <div className="space-y-3">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-brand-500/15 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-brand-500" strokeWidth={3} />
                </div>
                <span className="text-[var(--text-disabled)] text-sm">{perk}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
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
            <h1 className="text-3xl font-black text-white tracking-[-0.03em]">Crear cuenta</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1">Únete y organiza tu tiempo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className={fieldClass("name")}>
                <User size={16} className={iconClass("name")} />
                <input
                  name="name" type="text" value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Nombre completo"
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none rounded-2xl"
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-1.5 ml-1">
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div className={fieldClass("email")}>
                <Mail size={16} className={iconClass("email")} />
                <input
                  name="email" type="email" value={formData.email}
                  onChange={handleChange}
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
              <div className={fieldClass("password")}>
                <Lock size={16} className={iconClass("password")} />
                <input
                  name="password" type={showPassword ? "text" : "password"}
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
              {formData.password && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 px-1">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-0.5 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? strengthColors[strength] : "rgba(255,255,255,0.08)" }} />
                    ))}
                  </div>
                  <p className="text-[11px]" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</p>
                </motion.div>
              )}
              <AnimatePresence>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-1.5 ml-1">
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div className={fieldClass("confirm")}>
                <Lock size={16} className={iconClass("confirm")} />
                <input
                  name="confirm" type={showConfirm ? "text" : "password"}
                  value={formData.confirm} onChange={handleChange}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirmar contraseña"
                  className="w-full bg-transparent pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none rounded-2xl"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.confirm && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-1.5 ml-1">
                    {errors.confirm}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit" disabled={submitting || isLoading}
              className="w-full bg-brand-500 text-[var(--lumina-text-on-brand)] font-black text-sm uppercase tracking-widest py-3.5 rounded-2xl transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 0 24px rgba(5,173,152,0.15)" }}
            >
              {submitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-8">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-brand-300 font-semibold hover:text-brand-200 transition-colors">
              Iniciar sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
