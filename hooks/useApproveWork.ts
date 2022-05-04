import { useCallback, useState } from 'react';
import { TaskService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { AppModel } from '../models/appModel';

export type UseApproveWorkOutput = {
    approveWorkLoading: boolean;
    handleApproveWork: (payload: {
        taskId: string;
        workerId: string;
    }) => Promise<void>;
};

export const useApproveWork = (): UseApproveWorkOutput => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [approveWorkLoading, setApproveWorkLoading] = useState(false);

    const handleApproveWork = useCallback(async (payload) => {
        setApproveWorkLoading(true);
        try {
            await TaskService.approveWork(payload);
            await dispatch(AppModel.asyncActions.accountTasksCache());
            queryClient.invalidateQueries('jobsProcessing');
            queryClient.invalidateQueries('jobsProcessing');
            queryClient.invalidateQueries(payload.taskId);
            queryClient.invalidateQueries([payload.taskId, 'check_completed']);
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
