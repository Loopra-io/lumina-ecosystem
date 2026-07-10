import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@lumina/core-types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function makeStubClient(): SupabaseClient<Database> {
  // Capa de seguridad: Simula la estructura de Supabase v2 tipada con Database
  return {
    auth: {
      async getSession() {
        return { data: { session: null }, error: null };
      },
      onAuthStateChange() {
        const subscription = { unsubscribe: () => {} };
        return { data: { subscription } } as any;
      }
    }
  } as unknown as SupabaseClient<Database>;
}

export const supabase: SupabaseClient<Database> = 
  !supabaseUrl || !supabaseAnonKey
    ? (() => {
        console.warn("Supabase env vars missing: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Using safety stub client.");
        return makeStubClient();
      })()
    : createClient<Database>(supabaseUrl, supabaseAnonKey);
