function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-4">
      <div className="text-xs text-gray-400 uppercase">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-black">Admin Hub</h1>
        <p className="text-gray-400">Panel administrativo — funcionalidad en construcción.</p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Usuarios" value={128} />
        <Stat label="Cursos" value={24} />
        <Stat label="Aulas" value={12} />
        <Stat label="Períodos" value={3} />
      </section>

      <section className="mt-8">
        <div className="rounded-lg bg-white/3 p-6 border border-white/6">
          <h2 className="font-bold">Actividades recientes</h2>
          <p className="text-sm text-gray-400 mt-2">No hay actividad real en este entorno de desarrollo.</p>
        </div>
      </section>
    </div>
  )
}
