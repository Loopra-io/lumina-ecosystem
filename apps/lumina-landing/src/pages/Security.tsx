export const SecurityPage = () => {
  return (
    <div className="py-20 px-6 bg-surface-base">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-brand-500 mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(5,173,152,0.3)]">
          Seguridad & Protección de Datos
        </h1>
        
        <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
          En VoltSchedule, la seguridad y privacidad de tus datos es nuestra prioridad máxima.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">📋 Encriptación de Datos</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed">
              Todos los datos se transmiten mediante HTTPS y se almacenan cifrados en servidores Supabase de nivel empresarial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">🔐 Autenticación segura</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed">
              Usamos Supabase Auth para autenticación segura. Nunca almacenamos contraseñas en nuestros servidores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">🛡️ Políticas Row-Level Security (RLS)</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed">
              La base de datos implementa RLS para garantizar que cada usuario solo puede acceder a sus propios datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">🚫 Sin Credenciales Expuestas</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed">
              Las credenciales de Supabase se usan solo en backend y están protegidas por variables de entorno (.env.local).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">✅ Cumplimiento Legal</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed">
              Cumplimos con LGPD y protecciones de privacidad internacionales. Consulta nuestras políticas completas en la sección Legal.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-[var(--surface-card)] border border-brand-500/30 rounded-lg">
          <p className="text-brand-500 text-center text-sm italic">
            Para reportar vulnerabilidades de seguridad, contáctanos en: security@voltschedule.com
          </p>
        </div>
      </div>
    </div>
  );
};