import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
function makeStubClient() {
    // Capa de seguridad: Simula la estructura de Supabase v2 tipada con Database
    return {
        auth: {
            async getSession() {
                return { data: { session: null }, error: null };
            },
            onAuthStateChange() {
                const subscription = { unsubscribe: () => { } };
                return { data: { subscription } };
            }
        }
    };
}
export const supabase = !supabaseUrl || !supabaseAnonKey
    ? (() => {
        console.warn("Supabase env vars missing: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Using safety stub client.");
        return makeStubClient();
    })()
    : createClient(supabaseUrl, supabaseAnonKey);
//# sourceMappingURL=supabaseClient.js.map