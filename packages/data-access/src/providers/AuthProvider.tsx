import React, { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabaseClient';
import { AuthContext } from './AuthContext';
import type { AuthContextValue, Profile } from './AuthContext';
import { getMyProfile } from '../services/profile.service';
import { signInWithPassword, signOut, signUp, signInWithGoogle, type SessionUser } from '../services/auth.service';

/**
 * Proveedor de autenticación centralizado para las aplicaciones de Lúmina.
 * Gestiona el ciclo de vida de la sesión de Supabase y el perfil del usuario.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Árbol de componentes hijos.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    /**
     * Carga el perfil extendido del usuario desde la base de datos.
     * @param {Session | null} currentSession - Sesión actual de Supabase.
     */
    async function loadProfile(currentSession: Session | null) {
      if (!currentSession?.user) {
        setProfile(null);
        return;
      }

      const profileRes = await getMyProfile();
      if (!mounted) return;

      if (profileRes.success) {
        setProfile(profileRes.data as Profile);
      } else {
        setProfile(null);
      }
    }

    /**
     * Inicializa el estado de autenticación al montar el proveedor.
     */
    async function init() {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(currentSession);
      setUser(
        currentSession?.user
          ? { id: currentSession.user.id, email: currentSession.user.email }
          : null
      );

      await loadProfile(currentSession);
      setIsLoading(false);
    }

    init();

    // Suscripción a cambios de estado en tiempo real (login, logout, refresh de tokens)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      
      setSession(nextSession);
      setUser(
        nextSession?.user 
          ? { id: nextSession.user.id, email: nextSession.user.email } 
          : null
      );
      loadProfile(nextSession);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      profile,
      isLoading,
      signInWithPassword,
      signInWithGoogle,
      signUp,
      signOut,
    }),
    [session, user, profile, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
