import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center px-6 py-20 text-white">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-500/10 via-transparent to-[var(--lumina-brand-soft)] blur-3xl" />
        <div className="relative bg-[var(--surface-card)] border border-[var(--border-default)] backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl">
          <h1 className="text-4xl font-black uppercase tracking-[0.3em] text-brand-500 mb-4">Recuperar contraseña</h1>
          <p className="text-[var(--text-disabled)] mb-8">
            Esta funcionalidad todavía está en construcción. Pronto podrás recibir un enlace de recuperación directamente en tu correo.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-500 px-6 py-4 text-sm font-black uppercase tracking-widest text-[var(--lumina-text-on-brand)] hover:bg-brand-400 transition-all"
          >
            Volver al Login
          </Link>
        </div>
      </div>
    </div>
  );
}
