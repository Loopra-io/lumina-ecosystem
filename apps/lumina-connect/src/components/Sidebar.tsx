import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@lumina/data-access';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  Clock,
  FileText,
  CheckSquare,
  Wallet,
  Lightbulb,
  Settings,
  LogOut,
  PanelRightOpen,
} from 'lucide-react';

const scrollbarStyles = `
  .sidebar-scroll::-webkit-scrollbar {
    width: 3px;
  }
  .sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .sidebar-scroll::-webkit-scrollbar-thumb {
    background: rgba(0, 242, 255, 0.15);
    border-radius: 999px;
  }
  .sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 242, 255, 0.35);
  }
`;

const menuCategories = [
  {
    items: [
      { icon: Home, label: 'Inicio', to: '/dashboard', id: 'dashboard' },
      { icon: Clock, label: 'Horario', to: '/schedule', id: 'schedule' },
    ],
  },
  {
    items: [
      { icon: BookOpen, label: 'Materias', to: '/subjects', id: 'subjects' },
      { icon: FileText, label: 'Apuntes', to: '/notes', id: 'notes' },
      { icon: CheckSquare, label: 'Tareas', to: '/tasks', id: 'tasks' },
      { icon: Lightbulb, label: 'Estudio', to: '/study', id: 'study' },
    ],
  },
  {
    items: [
      { icon: Wallet, label: 'Finanzas', to: '/finances', id: 'finances' },
    ],
  },
];

const getInitials = (name?: string | null, email?: string | null) => {
  if (name)
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  if (email) return email.split('@')[0].slice(0, 2).toUpperCase();
  return 'VS';
};

const sidebarVariants = {
  expanded: { width: 288 },
  collapsed: { width: 80 },
};

const fadeVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.18, ease: 'easeOut' as const },
  },
  hidden: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.12, ease: 'easeIn' as const },
  },
};

const settingsVariants = {
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

const navContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success('Sesión cerrada correctamente');
      navigate('/login', { replace: true });
    } else {
      toast.error('No se pudo cerrar sesión');
    }
  };

  return (
    <>
      <style>{scrollbarStyles}</style>

      {/* ── Sidebar principal ── */}
      <motion.aside
        variants={sidebarVariants}
        animate={collapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 bottom-0 z-40 flex h-full flex-col border-r border-white/10 bg-[#080a0c] text-white shadow-xl overflow-hidden"
      >
        {/* Línea de acento superior */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent" />

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-5 flex-shrink-0">
          {/* Logo + nombre — ocupa todo el espacio cuando está expandido */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity duration-200"
          >
            <motion.img
              src="/logo.svg"
              alt="VoltSchedule"
              className="w-10 h-10 flex-shrink-0"
              whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
            />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  key="logo-text"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="min-w-0"
                >
                  <p className="text-base font-black uppercase italic tracking-tight text-white whitespace-nowrap">
                    Volt<span className="text-[#00f2ff]">Schedule</span>
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">Panel</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Botón toggle — siempre visible, en el header */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setCollapsed((prev) => !prev)}
            className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-3xl bg-white/5 text-gray-300 transition-colors duration-200 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]"
            aria-label={collapsed ? 'Abrir sidebar' : 'Cerrar sidebar'}
          >
            <motion.span
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <PanelRightOpen size={20} />
            </motion.span>
          </motion.button>
        </div>

        {/* ── Navegación ── */}
        <nav className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden px-4 py-6">
          <motion.div
            className="space-y-1"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {menuCategories.map((category, categoryIndex) => (
              <motion.div key={categoryIndex} variants={navItemVariants}>
                {/* Divisor sutil entre grupos */}
                {categoryIndex > 0 && (
                  <div className="my-3 mx-2 h-[1px] bg-white/5" />
                )}

                <div className="space-y-1">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.id}
                        to={item.to}
                        end={item.to === '/dashboard'}
                        title={collapsed ? item.label : undefined}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 w-full rounded-3xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                            collapsed ? 'justify-center' : ''
                          } ${
                            isActive
                              ? 'bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <motion.span
                                layoutId="nav-active-glow"
                                className="absolute inset-0 rounded-3xl bg-[#00f2ff]/5"
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              />
                            )}

                            <motion.span
                              whileHover={{ scale: 1.18, rotate: isActive ? 0 : 4 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                              className="relative z-10 flex-shrink-0"
                            >
                              <Icon size={18} />
                            </motion.span>

                            <AnimatePresence initial={false}>
                              {!collapsed && (
                                <motion.span
                                  key={`label-${item.id}`}
                                  variants={fadeVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="hidden"
                                  className="relative z-10 whitespace-nowrap"
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </nav>

        {/* ── Footer: Perfil + Configuración ── */}
        <div className="border-t border-white/10 px-4 py-5 flex-shrink-0">
          {profile ? (
            <div className="space-y-2">
              <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.div
                      key="profile-info"
                      variants={fadeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <motion.div
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.2 }}
                        className="relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[#00f2ff] text-sm font-black cursor-default"
                      >
                        {getInitials(profile.full_name, profile.email)}
                        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-40" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f2ff]/80" />
                        </span>
                      </motion.div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {profile.full_name || 'Usuario Volt'}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {profile.email || 'usuario@volt.com'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.08, rotate: 30 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-3xl bg-white/5 text-gray-300 transition-colors duration-200 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]"
                  aria-label="Abrir configuración"
                >
                  <Settings size={18} />
                </motion.button>
              </div>

              <AnimatePresence initial={false}>
                {settingsOpen && (
                  <motion.div
                    key="settings-panel"
                    variants={settingsVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 pt-1">
                      <NavLink
                        to="/settings"
                        className="flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors duration-200 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]"
                        onClick={() => setSettingsOpen(false)}
                      >
                        <motion.span whileHover={{ rotate: 30 }} transition={{ duration: 0.25 }}>
                          <Settings size={15} className="flex-shrink-0" />
                        </motion.span>
                        <AnimatePresence initial={false}>
                          {!collapsed && (
                            <motion.span
                              key="settings-label"
                              variants={fadeVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="whitespace-nowrap"
                            >
                              Configuración
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </NavLink>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleLogout}
                        className={`flex items-center gap-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-400 ${
                          collapsed ? 'justify-center' : 'justify-start'
                        }`}
                      >
                        <LogOut size={15} className="flex-shrink-0" />
                        <AnimatePresence initial={false}>
                          {!collapsed && (
                            <motion.span
                              key="logout-label"
                              variants={fadeVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="whitespace-nowrap"
                            >
                              Cerrar sesión
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-xs text-gray-500 text-center">Cargando usuario...</div>
          )}
        </div>
      </motion.aside>
    </>
  );
}