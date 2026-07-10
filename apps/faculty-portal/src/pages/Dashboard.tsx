import React from 'react'

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-4">
      <div className="text-sm font-semibold mb-2">{title}</div>
      <div className="text-sm text-gray-300">{children}</div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-black">Faculty Portal</h1>
        <p className="text-gray-400">Panel de profesores — tablero base.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Mis clases">No hay clases reales en el entorno de desarrollo.</Card>
        <Card title="Tareas">Revisa y administra tareas de tus estudiantes.</Card>
        <Card title="Estadísticas">Resumen rápido de asistencia y desempeño.</Card>
      </section>
    </div>
  )
}
