import type { ApiResponse } from './auth.service';
export type Schedule = {
    id: string;
    title: string;
    description?: string | null;
    start_time: string;
    end_time: string;
    color?: string | null;
    created_at: string;
};
export declare function listMySchedules(): Promise<ApiResponse<Schedule[]>>;
export declare function upsertMySchedule(input: {
    id?: string;
    academic_load_id: string;
    time_slot_id: string;
    classroom_id: string;
}): Promise<ApiResponse<Schedule>>;
export declare function deleteMySchedule(id: string): Promise<ApiResponse<null>>;
//# sourceMappingURL=schedule.service.d.ts.map