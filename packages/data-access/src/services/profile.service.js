import { supabase } from '../supabase/supabaseClient';
export async function getMyProfile() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user)
        return { success: false, error: 'Not authenticated.' };
    // RLS filtra con auth.uid() => profiles.id
    const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url, updated_at')
        .single();
    if (error)
        return { success: false, error: error.message };
    return { success: true, data: data };
}
export async function upsertMyProfile(input) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user)
        return { success: false, error: 'Not authenticated.' };
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
        .upsert(payload)
        .select('id, full_name, avatar_url, updated_at')
        .single();
    if (error)
        return { success: false, error: error.message };
    return { success: true, data: data };
}
//# sourceMappingURL=profile.service.js.map