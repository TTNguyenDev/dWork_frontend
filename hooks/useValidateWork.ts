import { useCallback, useState } from 'react';
import { JobService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export type UseValidateWorkOutput = {
    validateWorkLoading: boolean;
    handleValidateWork: (payload: { taskId: string }) => void;
};

export const useValidateWork = (): UseValidateWorkOutput => {
    const queryClient = useQueryClient();

    const [validateWorkLoading, setValidateWorkLoading] = useState(false);

    const handleValidateWork = useCallback(async (payload) => {
        setValidateWorkLoading(true);
        try {
            await JobService.validateWork(payload);
            queryClient.invalidateQueries('jobsProcessing');
            queryClient.invalidateQueries('jobsCompleted');
            toast('Validate work successfully', {
                type: 'success',
            });
        } catch (error) {
            toast('Validate work failed', {
                type: 'error',
            });
        } finally {
            setValidateWorkLoading(false);
        }
    }, []);

    return {
        validateWorkLoading,
        handleValidateWork,
    };
};
