import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const HIDDEN_LAYOUT_ROUTES = ["/login", "/register", "/forgot-password"];

export default function PublicLayout() {
  const { pathname } = useLocation();
  const hideLayout = HIDDEN_LAYOUT_ROUTES.includes(pathname);

  return (
    <div className="min-h-screen bg-lumina-surface flex flex-col antialiased">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}
