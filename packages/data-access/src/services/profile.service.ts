import { supabase } from '../supabase/supabaseClient';
import type { ApiResponse } from './auth.service';

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
};

export async function getMyProfile(): Promise<ApiResponse<Profile>> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return { success: false, error: 'Not authenticated.' };

  // RLS filtra con auth.uid() => profiles.id
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, updated_at')
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data: data as Profile };
}

export async function upsertMyProfile(input: {
  full_name?: string | null;
  avatar_url?: string | null;
}): Promise<ApiResponse<Profile>> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return { success: false, error: 'Not authenticated.' };

  // Insert/Upsert: RLS valida que profiles.id == auth.uid()
  const payload = {
    id: user.id,
    full_name: input.full_name ?? null,
    avatar_url: input.avatar_url ?? null,
  };

  // Supabase Postgrest type inference for upsert payloads is unreliable here,
  // so we keep the return type strong while bypassing the local generic mismatch.
  const { data, error } = await supabase
    .from('profiles')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .upsert(payload as any)
    .select('id, full_name, avatar_url, updated_at')
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data: data as Profile };
}
