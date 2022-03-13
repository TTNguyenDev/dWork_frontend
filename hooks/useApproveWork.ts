import { useCallback, useState } from 'react';
import { JobService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export type UseApproveWorkOutput = {
    approveWorkLoading: boolean;
    handleApproveWork: (payload: {
        taskId: string;
        workerId: string;
    }) => Promise<void>;
};

export const useApproveWork = (): UseApproveWorkOutput => {
    const queryClient = useQueryClient();

    const [approveWorkLoading, setApproveWorkLoading] = useState(false);

    const handleApproveWork = useCallback(async (payload) => {
        setApproveWorkLoading(true);
        try {
            await JobService.approveWork(payload);
            queryClient.invalidateQueries('jobsProcessing');
            queryClient.invalidateQueries('jobsProcessing');
            queryClient.invalidateQueries(payload.taskId);
            toast('Approve work successfully', {
                type: 'success',
            });
        } catch (error) {
            toast('Approve work failed', {
                type: 'error',
            });
        } finally {
            setApproveWorkLoading(false);
        }
    }, []);

    return {
        approveWorkLoading,
        handleApproveWork,
    };
};
