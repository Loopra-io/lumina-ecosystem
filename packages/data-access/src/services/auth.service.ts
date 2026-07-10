import { supabase } from '../supabase/supabaseClient';

/**
 * Estructura estándar para las respuestas de la API en el dominio de datos.
 * @template T - Tipo de datos esperado en caso de éxito.
 */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Representación estandarizada del usuario en sesión.
 */
export type SessionUser = {
  id: string;
  email?: string | null;
};

/**
 * Inicia sesión utilizando credenciales de correo y contraseña.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña en texto plano.
 * @returns {Promise<ApiResponse<{ user: SessionUser }>>} Resultado de la autenticación.
 */
export async function signInWithPassword(
  email: string,
  password: string
): Promise<ApiResponse<{ user: SessionUser }>> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) return { success: false, error: error.message };

  const user = data.user;
  if (!user) return { success: false, error: '[Lúmina Auth Error]: Supabase no retornó un usuario válido.' };

  return {
    success: true,
    data: { user: { id: user.id, email: user.email } },
  };
}

/**
 * Registra un nuevo usuario en la plataforma.
 * @param {string} email - Correo electrónico del nuevo usuario.
 * @param {string} password - Contraseña en texto plano.
 * @param {string} fullName - Nombre completo para los metadatos.
 * @returns {Promise<ApiResponse<{ user: SessionUser }>>} Resultado del registro.
 */
export async function signUp(
  email: string,
  password: string,
  fullName: string
): Promise<ApiResponse<{ user: SessionUser }>> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) return { success: false, error: error.message };

  const user = data.user;
  if (!user) return { success: false, error: '[Lúmina Auth Error]: Supabase no retornó un usuario válido.' };

  return {
    success: true,
    data: { user: { id: user.id, email: user.email } },
  };
}

/**
 * Termina la sesión actual, invalidando el token en la base de datos y limpiando la caché local.
 * @returns {Promise<ApiResponse<null>>} Resultado del cierre de sesión.
 */
export async function signOut(): Promise<ApiResponse<null>> {
  const { error } = await supabase.auth.signOut();
  
  if (error) return { success: false, error: error.message };
  
  return { success: true, data: null };
}

/**
 * Inicia el flujo OAuth con Google y devuelve la URL de redirección si aplica.
 */
export async function signInWithGoogle(): Promise<ApiResponse<{ url?: string }>> {
  // Supabase v2 expone signInWithOAuth para proveedores
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.auth as any).signInWithOAuth({ provider: 'google' });

  if (error) return { success: false, error: error.message };

  // data may contain a url for redirection when using server-side flow
  return { success: true, data: { url: (data as any)?.url } };
}
