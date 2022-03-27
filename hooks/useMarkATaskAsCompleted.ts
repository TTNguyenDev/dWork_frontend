import { useCallback, useState } from 'react';
import { TaskService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export type UseMarkATaskAsCompletedOutput = {
    markATaskAsCompletedLoading: boolean;
    handleMarkATaskAsCompleted: (payload: { taskId: string }) => Promise<void>;
};

export const useMarkATaskAsCompleted = (): UseMarkATaskAsCompletedOutput => {
    const queryClient = useQueryClient();

    const [markATaskAsCompletedLoading, setMarkATaskAsCompletedLoading] =
        useState(false);

    const handleMarkATaskAsCompleted = useCallback(async (payload) => {
        setMarkATaskAsCompletedLoading(true);
        try {
            await TaskService.markATaskAsCompleted(payload);
            await TaskService.fetchAndCacheTasks('account_completed', true);
            queryClient.invalidateQueries([payload.taskId, 'check_completed']);
            toast('Mark a task as completed successfully', {
                type: 'success',
            });
        } catch (error) {
            toast('Mark a task as completed failed', {
                type: 'error',
            });
        } finally {
            setMarkATaskAsCompletedLoading(false);
        }
    }, []);

    return {
        markATaskAsCompletedLoading,
        handleMarkATaskAsCompleted,
    };
};
