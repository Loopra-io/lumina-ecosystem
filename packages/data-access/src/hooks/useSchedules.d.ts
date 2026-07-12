import * as scheduleService from '../services/schedule.service';
export declare function useSchedules(): {
    schedules: scheduleService.Schedule[];
    loading: boolean;
    error: string | null;
    reload: () => Promise<void>;
    upsert: (input: Parameters<typeof scheduleService.upsertMySchedule>[0]) => Promise<{
        success: false;
        error: string;
    } | {
        success: true;
        data: scheduleService.Schedule;
    }>;
    remove: (id: string) => Promise<{
        success: false;
        error: string;
    } | {
        success: true;
        data: null;
    }>;
};
//# sourceMappingURL=useSchedules.d.ts.map