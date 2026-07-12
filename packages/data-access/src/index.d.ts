/**
 * Lúmina Data Access
 * Capa de datos, servicios Supabase, hooks de estado y persistencia offline con Dexie
 */
export * from './supabase/supabaseClient';
export * from './services/auth.service';
export * from './services/profile.service';
export * from './services/schedule.service';
export { useAuth } from './hooks/useAuth';
export { useSchedules } from './hooks/useSchedules';
export { AuthContext } from './providers/AuthContext';
export { AuthProvider } from './providers/AuthProvider';
export type { AuthContextValue } from './providers/AuthContext';
export type { Profile } from './providers/AuthContext';
//# sourceMappingURL=index.d.ts.map