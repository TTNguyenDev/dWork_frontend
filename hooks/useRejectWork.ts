import { useCallback, useState } from 'react';
import { JobService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export type UseRejectWorkOutput = {
    rejectWorkLoading: boolean;
    handleRejectWork: (payload: { taskId: string }) => Promise<void>;
};

export const useRejectWork = (): UseRejectWorkOutput => {
    const queryClient = useQueryClient();

    const [rejectWorkLoading, setRejectWorkLoading] = useState(false);

    const handleRejectWork = useCallback(async (payload) => {
        setRejectWorkLoading(true);
        try {
            await JobService.rejectWork(payload);
            queryClient.invalidateQueries('jobsProcessing');
            queryClient.invalidateQueries('jobsCompleted');
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
