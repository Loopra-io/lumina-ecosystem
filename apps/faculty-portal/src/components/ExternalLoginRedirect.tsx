import React from 'react'

export default function ExternalLoginRedirect() {
  React.useEffect(() => {
    const env = (import.meta as any).env || {}
    const landing = env.VITE_LANDING_URL || window.location.origin
    const redirectTo = `${landing.replace(/\/$/, '')}/login?redirect=${encodeURIComponent(window.location.href)}`
    window.location.href = redirectTo
  }, [])
  return null
}
