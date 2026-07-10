import { useCallback, useEffect, useState } from 'react';
import * as scheduleService from '../services/schedule.service';
import type { Schedule } from '../services/schedule.service';

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await scheduleService.listMySchedules();
      if (!response.success) {
        setError(response.error);
        setSchedules([]);
        return;
      }
      setSchedules(response.data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error loading schedules';
      setError(message);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const upsert = useCallback(
    async (input: Parameters<typeof scheduleService.upsertMySchedule>[0]) => {
      setError(null);
      const saved = await scheduleService.upsertMySchedule(input);
      if (!saved.success) {
        setError(saved.error);
        return saved;
      }
      await load();
      return saved;
    },
    [load]
  );

  const remove = useCallback(
    async (id: string) => {
      setError(null);
      const result = await scheduleService.deleteMySchedule(id);
      if (!result.success) {
        setError(result.error);
        return result;
      }
      await load();
      return result;
    },
    [load]
  );

  return { schedules, loading, error, reload: load, upsert, remove };
}
