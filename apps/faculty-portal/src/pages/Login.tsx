import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signInWithPassword } from '@lumina/data-access'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') ?? ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await signInWithPassword(email, password)
    if (!res.success) return setError(res.error)
    const destination = redirect || '/dashboard'
    if (destination.startsWith('http')) {
      window.location.href = destination
    } else {
      navigate(destination)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-3 rounded bg-white/5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 rounded bg-white/5" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-red-400">{error}</div>}
        <button className="w-full bg-[#00f2ff] text-black font-bold rounded p-3">Entrar</button>
      </form>
    </div>
  )
}
