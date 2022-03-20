import { useCallback, useState } from 'react';
import { TaskService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export type UseRejectWorkOutput = {
    rejectWorkLoading: boolean;
    handleRejectWork: (payload: {
        taskId: string;
        workerId: string;
    }) => Promise<void>;
};

export const useRejectWork = (): UseRejectWorkOutput => {
    const queryClient = useQueryClient();

    const [rejectWorkLoading, setRejectWorkLoading] = useState(false);

    const handleRejectWork = useCallback(async (payload) => {
        setRejectWorkLoading(true);
        try {
            await TaskService.rejectWork(payload);
            queryClient.invalidateQueries('jobsAvailable');
            queryClient.invalidateQueries('jobsProcessing');
            queryClient.invalidateQueries('jobsCompleted');
            queryClient.invalidateQueries(payload.taskId);
            toast('Reject work successfully', {
                type: 'success',
            });
        } catch (error) {
            toast('Reject work failed', {
                type: 'error',
            });
        } finally {
            setRejectWorkLoading(false);
        }
    }, []);

    return {
        rejectWorkLoading,
        handleRejectWork,
    };
};
