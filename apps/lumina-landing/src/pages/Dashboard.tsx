import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-surface-base text-white flex items-center justify-center px-6 py-20">
      <div className="relative w-full max-w-3xl rounded-[2rem] border border-[var(--border-default)] bg-[var(--surface-card)] p-10 shadow-2xl backdrop-blur-xl">
        <h1 className="text-5xl font-black uppercase tracking-[0.2em] text-brand-500 mb-6">Panel de usuario</h1>
        <p className="text-[var(--text-disabled)] mb-8 leading-relaxed">
          La sección de Dashboard todavía está en construcción. Aquí aparecerá el acceso principal a tu espacio privado.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-2xl bg-brand-500 px-6 py-4 text-sm font-black uppercase tracking-widest text-[var(--lumina-text-on-brand)] hover:bg-brand-400 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
