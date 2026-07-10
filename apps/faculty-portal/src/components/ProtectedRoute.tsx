import React from 'react'
import { useAuth } from '@lumina/data-access'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !user) {
      const env = (import.meta as any).env || {}
      const landing = env.VITE_LANDING_URL || window.location.origin
      const redirectTo = `${landing.replace(/\/$/, '')}/login?redirect=${encodeURIComponent(window.location.href)}`
      window.location.href = redirectTo
    }
  }, [isLoading, user])

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;
  return <>{children}</>;
}
