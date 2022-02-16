import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Schema } from 'rsuite';
import { JobService } from '../services/jobService';
import { RootState } from '../store';
import { toast } from 'react-toastify';
import { ModalsController } from '../utils/modalsController';
import { useQueryClient } from 'react-query';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    title: StringType().isRequired('This field is required.'),
    description: StringType().isRequired('This field is required.'),
    price: NumberType().isRequired('This field is required.'),
    maxParticipants: NumberType().isRequired('This field is required.'),
});

export type UseCreateTaskOutput = {
    model: typeof model;
    createTaskLoading: boolean;
    handleFormChange: (payload: any) => void;
    handleFormSubmit: (payload: any) => void;
};

export const useCreateTask = (): UseCreateTaskOutput => {
    const queryClient = useQueryClient();

    const app = useSelector((state: RootState) => state.app);

    const formValueRef = useRef<any>({});
    const [createTaskLoading, setCreateTaskLoading] = useState(false);

    const handleFormChange = useCallback((formValue) => {
        formValueRef.current = formValue;
    }, []);

    const handleFormSubmit = useCallback(async (isValid: boolean) => {
        if (isValid) {
            setCreateTaskLoading(true);
            try {
                await JobService.createTask(formValueRef.current);
                queryClient.invalidateQueries('jobs');
                queryClient.invalidateQueries('jobsAvailable');
                toast('Create task successfully', {
                    type: 'success',
                });
            } catch (error) {
                console.error(error);
                toast('Create task failed', {
                    type: 'error',
                });
            } finally {
                setCreateTaskLoading(false);
            }
        }
    }, []);

    return {
        model,
        createTaskLoading,
        handleFormChange,
        handleFormSubmit,
    };
};
