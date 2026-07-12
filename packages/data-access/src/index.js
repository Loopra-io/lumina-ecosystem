/**
 * Lúmina Data Access
 * Capa de datos, servicios Supabase, hooks de estado y persistencia offline con Dexie
 */
// Supabase Client
export * from './supabase/supabaseClient';
// Services
export * from './services/auth.service';
export * from './services/profile.service';
export * from './services/schedule.service';
// Hooks
export { useAuth } from './hooks/useAuth';
export { useSchedules } from './hooks/useSchedules';
// Providers
export { AuthContext } from './providers/AuthContext';
export { AuthProvider } from './providers/AuthProvider';
//# sourceMappingURL=index.js.map