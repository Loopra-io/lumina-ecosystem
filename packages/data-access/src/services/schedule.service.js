import { supabase } from '../supabase/supabaseClient';
// List schedules: join related rows and synthesize a UI-friendly object.
export async function listMySchedules() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user)
        return { success: false, error: 'Not authenticated.' };
    const { data: rows, error: rowsError } = await supabase.from('schedules').select('*');
    if (rowsError)
        return { success: false, error: rowsError.message };
    const out = [];
    for (const r of rows ?? []) {
        try {
            const timeRes = await supabase.from('time_slots').select('start_time,end_time,day_of_week').eq('id', r.time_slot_id).single();
            const time = timeRes.data;
            // academic_load -> course_subject -> subject + course
            const loadRes = await supabase.from('academic_load').select('course_subject_id').eq('id', r.academic_load_id).single();
            const csId = loadRes.data?.course_subject_id;
            let title = 'Horario';
            if (csId) {
                const csRes = await supabase.from('course_subjects').select('course_id,subject_id').eq('id', csId).single();
                const courseId = csRes.data?.course_id;
                const subjectId = csRes.data?.subject_id;
                const [courseRes, subjRes] = await Promise.all([
                    supabase.from('courses').select('name').eq('id', courseId).single(),
                    supabase.from('subjects').select('name').eq('id', subjectId).single(),
                ]);
                const courseName = courseRes.data?.name ?? 'Curso';
                const subjName = subjRes.data?.name ?? 'Materia';
                title = `${courseName} — ${subjName}`;
            }
            out.push({
                id: r.id,
                title,
                description: null,
                start_time: time?.start_time ?? '00:00:00',
                end_time: time?.end_time ?? '00:00:00',
                color: null,
                created_at: r.created_at,
            });
        }
        catch (e) {
            // skip problematic row but continue
            // eslint-disable-next-line no-console
            console.warn('Failed to synthesize schedule row', r?.id, e);
        }
    }
    // sort by start_time string
    out.sort((a, b) => (a.start_time < b.start_time ? -1 : a.start_time > b.start_time ? 1 : 0));
    return { success: true, data: out };
}
// Upsert schedule using new schema fields.
export async function upsertMySchedule(input) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user)
        return { success: false, error: 'Not authenticated.' };
    const payload = {
        id: input.id,
        academic_load_id: input.academic_load_id,
        time_slot_id: input.time_slot_id,
        classroom_id: input.classroom_id,
    };
    const { data, error } = await supabase
        .from('schedules')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .upsert(payload)
        .select('*')
        .single();
    if (error)
        return { success: false, error: error.message };
    // synthesize single Schedule to return
    const ts = await supabase.from('time_slots').select('start_time,end_time').eq('id', data.time_slot_id).single();
    const start = ts.data?.start_time ?? '00:00:00';
    const end = ts.data?.end_time ?? '00:00:00';
    const synthesized = {
        id: data.id,
        title: 'Horario',
        description: null,
        start_time: start,
        end_time: end,
        color: null,
        created_at: data.created_at,
    };
    return { success: true, data: synthesized };
}
export async function deleteMySchedule(id) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user)
        return { success: false, error: 'Not authenticated.' };
    const { error } = await supabase.from('schedules').delete().eq('id', id);
    if (error)
        return { success: false, error: error.message };
    return { success: true, data: null };
}
//# sourceMappingURL=schedule.service.js.map