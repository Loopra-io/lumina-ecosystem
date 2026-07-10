import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { DocsPage } from "./pages/Docs";
import { TemplatesPage } from "./pages/Templates";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="text-white p-10">
      <h1 className="text-4xl font-black mb-4">{title}</h1>
      <p className="text-gray-400">Esta sección está en construcción.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" theme="dark" closeButton />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Placeholder title="Calendario" />} />
          <Route path="/schedules" element={<Placeholder title="Horarios" />} />
          <Route path="/messages" element={<Placeholder title="Mensajes" />} />
          <Route path="/team" element={<Placeholder title="Equipo" />} />
          <Route path="/analytics" element={<Placeholder title="Analytics" />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
