export const Features = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-[var(--text-primary)]">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-black leading-none tracking-tight sm:text-4xl md:mx-auto uppercase italic">
          <span className="relative inline-block">
            {/* El patrón de puntos ahora es cian sutil */}
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-[var(--color-brand-500)]/10 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="dots-pattern"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect fill="url(#dots-pattern)" width="52" height="24" />
            </svg>
            <span className="relative">Ingeniería</span>
          </span>{' '}
          aplicada a tu agenda
        </h2>
        <p className="text-base text-[var(--text-muted)] md:text-lg">
          No solo organizamos tareas, optimizamos flujos de trabajo. Herramientas diseñadas para el rigor académico.
        </p>
      </div>

      <div className="grid gap-8 row-gap-8 lg:grid-cols-3">
        {/* Feature 1 */}
        <div className="sm:text-center group">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-default)] sm:mx-auto sm:w-24 sm:h-24 transition-all group-hover:border-[rgba(5,173,152,0.5)] group-hover:bg-[rgba(5,173,152,0.2)]">
            <svg
              className="w-12 h-12 text-lumina-brand sm:w-16 sm:h-16"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 font-bold leading-5 uppercase tracking-wider">Sincronización Total</h6>
          <p className="max-w-md mb-3 text-sm text-[var(--text-secondary)] sm:mx-auto leading-relaxed">
            Conecta tus horarios de campus y labs en tiempo real. Cero conflictos, máxima asistencia.
          </p>
          <a
            href="/protocol"
            className="inline-flex items-center font-bold text-xs uppercase tracking-widest transition-colors duration-200 text-lumina-brand hover:text-[var(--text-primary)]"
          >
            Explorar protocolo
          </a>
        </div>

        {/* Feature 2 */}
        <div className="sm:text-center group">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-default)] sm:mx-auto sm:w-24 sm:h-24 transition-all group-hover:border-[rgba(5,173,152,0.5)] group-hover:bg-[rgba(5,173,152,0.2)]">
            <svg
              className="w-10 h-10 text-lumina-brand sm:w-14 sm:h-14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h6 className="mb-2 font-bold leading-5 uppercase tracking-wider">Seguridad Cifrada</h6>
          <p className="max-w-md mb-3 text-sm text-[var(--text-secondary)] sm:mx-auto leading-relaxed">
            Tus datos académicos bajo estándares de grado industrial. Privacidad por diseño.
          </p>
          <a
            href="/security"
            className="inline-flex items-center font-bold text-xs uppercase tracking-widest transition-colors duration-200 text-lumina-brand hover:text-[var(--text-primary)]"
          >
            Ver seguridad
          </a>
        </div>

        {/* Feature 3 */}
        <div className="sm:text-center group">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-default)] sm:mx-auto sm:w-24 sm:h-24 transition-all group-hover:border-[rgba(5,173,152,0.5)] group-hover:bg-[rgba(5,173,152,0.2)]">
            <svg
              className="w-10 h-10 text-lumina-brand sm:w-14 sm:h-14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h6 className="mb-2 font-bold leading-5 uppercase tracking-wider">Rendimiento Volt</h6>
          <p className="max-w-md mb-3 text-sm text-[var(--text-secondary)] sm:mx-auto leading-relaxed">
            Interfaz ultra rápida optimizada para dispositivos móviles. Gestión en el aula sin fricción.
          </p>
          <a
            href="/docs"
            className="inline-flex items-center font-bold text-xs uppercase tracking-widest transition-colors duration-200 text-lumina-brand hover:text-[var(--text-primary)]"
          >
            Documentación
          </a>
        </div>
      </div>
    </div>
  );
};
