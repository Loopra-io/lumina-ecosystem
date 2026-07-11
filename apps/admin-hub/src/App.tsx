import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@lumina/data-access'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ExternalLoginRedirect from './components/ExternalLoginRedirect'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/admin-hub">
        <div className="min-h-screen bg-gray-900 text-white p-6">
          <Routes>
            <Route path="/login" element={<ExternalLoginRedirect />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
