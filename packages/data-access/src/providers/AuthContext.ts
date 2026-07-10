import { createContext } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { ApiResponse, SessionUser } from '../services/auth.service';
import type { Profile } from '../services/profile.service';
export type { Profile };

/**
 * Estructura de valores expuestos por el contexto de autenticación de Lúmina.
 */
export type AuthContextValue = {
  session: Session | null;
  user: SessionUser | null;
  profile: Profile | null;
  isLoading: boolean;

  /**
   * Expone el método de inicio de sesión inyectado en el contexto.
   */
  signInWithPassword: (email: string, password: string) => Promise<ApiResponse<{ user: SessionUser }>>;
  /**
   * Inicia sesión con proveedores externos (Google, Apple, etc.).
   */
  signInWithGoogle: () => Promise<ApiResponse<{ url?: string }>>;

  /**
   * Registro de nuevo usuario a través del contexto.
   */
  signUp: (email: string, password: string, fullName: string) => Promise<ApiResponse<{ user: SessionUser }>>;
  
  /**
   * Expone el método de cierre de sesión inyectado en el contexto.
   */
  signOut: () => Promise<ApiResponse<null>>;
};

/**
 * Contexto global de autenticación de Lúmina.
 * Se inicializa en null; debe ser consumido dentro de un AuthProvider.
 */
export const AuthContext = createContext<AuthContextValue | null>(null);
