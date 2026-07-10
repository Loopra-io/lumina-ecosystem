export const DocsPage = () => {
  return (
    <div className="py-20 px-6 bg-[#080a0c]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-[#00f2ff] mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">
          Documentación Técnica
        </h1>
        
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Guías e información técnica para desarrolladores y usuarios avanzados.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3 tracking-wider">⚛️ Stack Tecnológico</h2>
            <p className="text-gray-400 mb-2">VoltSchedule está construido con:</p>
            <ul className="text-gray-400 space-y-1 ml-4">
              <li>• React 19 + TypeScript</li>
              <li>• Vite (build tool)</li>
              <li>• Tailwind CSS (styling)</li>
              <li>• Supabase (backend)</li>
              <li>• Zustand (state management)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3 tracking-wider">📦 Instalación Local</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Para ejecutar VoltSchedule en tu máquina local:
            </p>
            <pre className="bg-black/50 p-4 rounded text-cyan-300 text-sm overflow-auto">
{`git clone https://github.com/kenerbotina/voltschedule
cd voltschedule
npm install
npm run dev`}
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3 tracking-wider">🔑 Variables de Entorno</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Crea un archivo \`.env.local\` en la raíz:
            </p>
            <pre className="bg-black/50 p-4 rounded text-cyan-300 text-sm">
{`VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3 tracking-wider">📖 Recursos Adicionales</h2>
            <ul className="text-gray-400 space-y-2 ml-4">
              <li>• <a href="https://github.com/kenerbotina/voltschedule" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Repositorio GitHub</a></li>
              <li>• <a href="/README_TECNICO.md" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">README Técnico</a></li>
              <li>• <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Documentación Supabase</a></li>
            </ul>
          </section>
        </div>

        <div className="mt-12 p-6 bg-white/5 border border-cyan-400/30 rounded-lg">
          <p className="text-gray-300 text-center">
            <span className="text-[#00f2ff] font-bold">¿Preguntas?</span> Contacta a nuestro equipo en dev@voltschedule.com
          </p>
        </div>
      </div>
    </div>
  );
};