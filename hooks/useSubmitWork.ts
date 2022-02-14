import { useCallback, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import { JobService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    url: StringType().isRequired('This field is required.'),
});

export type UseSubmitWorkOutput = {
    model: typeof model;
    submitWorkLoading: boolean;
    handleFormChange: (payload: any) => void;
    handleFormSubmit: (payload: any) => void;
};

export const useSubmitWork = (): UseSubmitWorkOutput => {
    const queryClient = useQueryClient();

    const formValueRef = useRef<any>({});
    const [submitWorkLoading, setSubmitWorkLoading] = useState(false);

    const handleFormChange = useCallback((formValue) => {
        formValueRef.current = formValue;
    }, []);

    const handleFormSubmit = useCallback(async (isValid: boolean) => {
        if (isValid) {
            setSubmitWorkLoading(true);
            try {
                await JobService.submitWork(formValueRef.current);
                queryClient.invalidateQueries('jobsProcessing');
                queryClient.invalidateQueries('jobsCompleted');
                toast('Submit work successfully', {
                    type: 'success',
                });
            } catch (error) {
                toast('Submit work failed', {
                    type: 'error',
                });
            } finally {
                setSubmitWorkLoading(false);
            }
        }
    }, []);

    return {
        model,
        submitWorkLoading,
        handleFormChange,
        handleFormSubmit,
    };
};
