export const ProtocolPage = () => {
  return (
    <div className="py-20 px-6 bg-surface-base">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-brand-500 mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(5,173,152,0.3)]">
          Protocolo de Sincronización
        </h1>
        
        <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
          Entiende cómo VoltSchedule sincroniza y analiza tus horarios académicos.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">1️⃣ Importación de Calendario</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed mb-4">
              Los usuarios pueden importar sus horarios desde Google Calendar, iCal o archivos CSV. El sistema automáticamente parsea y valida los datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">2️⃣ Análisis de Patrones</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed mb-4">
              El motor de análisis detecta:
            </p>
            <ul className="text-[var(--text-disabled)] space-y-2 ml-4">
              <li>• Conflictos de horario</li>
              <li>• Clases solapadas</li>
              <li>• Periodos libres entre clases</li>
              <li>• Cargas académicas por día</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">3️⃣ Optimización en Tiempo Real</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed">
              Basado en los patrones detectados, VoltSchedule propone mejoras y reorganizaciones de horario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-500 mb-3 tracking-wider">4️⃣ Sincronización Continua</h2>
            <p className="text-[var(--text-disabled)] leading-relaxed">
              Los cambios en tu calendario externo se sincronizan automáticamente con VoltSchedule cada cierto tiempo.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-[var(--surface-card)] border border-brand-500/30 rounded-lg">
          <p className="text-[var(--text-secondary)] text-center">
            <span className="text-brand-500 font-bold">En construcción:</span> La versión completa de sincronización estará disponible en Q2 2026.
          </p>
        </div>
      </div>
    </div>
  );
};