import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];
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

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.004;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const alpha = Math.sin(p.life * Math.PI) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(5, 173, 152, ${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="min-h-screen bg-surface-base flex flex-col items-center justify-center px-6 overflow-hidden relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--lumina-brand-soft)] rounded-full blur-[120px] pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8 z-10"
      >
        <Link to="/" className="inline-flex items-center gap-3 group">
          <img src="/favicon.svg" alt="Volt" className="w-9 h-9 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white leading-none italic uppercase">
              Volt<span className="text-lumina-brand">Schedule</span>
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Main */}
      <div className="relative z-10 text-center max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 select-none"
        >
          <p
            className="text-[10rem] md:text-[14rem] font-black leading-none tracking-[-0.05em] text-transparent"
            style={{ WebkitTextStroke: "1px rgba(0,242,255,0.15)" }}
          >
            404
          </p>
          <motion.p
            animate={{ x: [-2, 3, -1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none tracking-[-0.05em] text-brand-500/20 pointer-events-none"
          >
            404
          </motion.p>
          <motion.p
            animate={{ x: [3, -2, 1, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.05 }}
            className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none tracking-[-0.05em] text-brand-200/15 pointer-events-none"
          >
            404
          </motion.p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-disabled)]">Error</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-4 mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-[-0.03em]">
            Página no encontrada
          </h1>
          <p className="text-[var(--text-secondary)] text-sm leading-7 max-w-sm mx-auto">
            La ruta que buscas no existe, fue movida o nunca estuvo aquí.
            Vuelve al inicio y retoma el control.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-500 text-[var(--lumina-text-on-brand)] font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all"
            style={{ boxShadow: "0 0 24px rgba(5,173,152,0.15)" }}
          >
            <Home size={14} />
            Ir al inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-[var(--border-default)] bg-white/4 text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-strong)] font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl active:scale-[0.98] transition-all"
          >
            <ArrowLeft size={14} />
            Volver atrás
          </button>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 text-[10px] uppercase tracking-[0.35em] text-[var(--text-disabled)] font-bold"
      >
        VoltSchedule • 404
      </motion.p>
    </div>
  );
}
