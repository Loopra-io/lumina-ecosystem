/**
 * Estructura estándar para las respuestas de la API en el dominio de datos.
 * @template T - Tipo de datos esperado en caso de éxito.
 */
export type ApiResponse<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
};
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
export declare function signInWithPassword(email: string, password: string): Promise<ApiResponse<{
    user: SessionUser;
}>>;
/**
 * Registra un nuevo usuario en la plataforma.
 * @param {string} email - Correo electrónico del nuevo usuario.
 * @param {string} password - Contraseña en texto plano.
 * @param {string} fullName - Nombre completo para los metadatos.
 * @returns {Promise<ApiResponse<{ user: SessionUser }>>} Resultado del registro.
 */
export declare function signUp(email: string, password: string, fullName: string): Promise<ApiResponse<{
    user: SessionUser;
}>>;
/**
 * Termina la sesión actual, invalidando el token en la base de datos y limpiando la caché local.
 * @returns {Promise<ApiResponse<null>>} Resultado del cierre de sesión.
 */
export declare function signOut(): Promise<ApiResponse<null>>;
/**
 * Inicia el flujo OAuth con Google y devuelve la URL de redirección si aplica.
 */
export declare function signInWithGoogle(): Promise<ApiResponse<{
    url?: string;
}>>;
//# sourceMappingURL=auth.service.d.ts.map