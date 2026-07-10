import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./providers/AuthProvider";
import PublicLayout from "./layouts/PublicLayout";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { FeaturesPage } from "./pages/Features";
import { TemplatesPage } from "./pages/Templates";
import { HelpPage } from "./pages/Help";
import { DocsPage } from "./pages/Docs";
import { SecurityPage } from "./pages/Security";
import { ProtocolPage } from "./pages/Protocol";
import Privacy from "./pages/Privacy";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" theme="dark" closeButton />

        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="protocol" element={<ProtocolPage />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
