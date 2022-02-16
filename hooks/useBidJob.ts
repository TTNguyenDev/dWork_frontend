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
    coverLetter: StringType().isRequired('This field is required.'),
    price: StringType().isRequired('This field is required.'),
});

export type UseBidJobOutput = {
    model: typeof model;
    bidJobLoading: boolean;
    handleFormChange: (payload: any) => void;
    handleFormSubmit: (payload: any) => void;
};

export const useBidJob = (): UseBidJobOutput => {
    const queryClient = useQueryClient();

    const formValueRef = useRef<any>({});
    const [bidJobLoading, setBibJobLoading] = useState(false);

    const handleFormChange = useCallback((formValue) => {
        formValueRef.current = formValue;
    }, []);

    const handleFormSubmit = useCallback(async (isValid: boolean) => {
        if (isValid) {
            setBibJobLoading(true);
            try {
                await JobService.submitProposal(formValueRef.current);
                queryClient.invalidateQueries('jobs');
                toast('Successful bid registration', {
                    type: 'success',
                });
            } catch (error) {
                toast('Bid registration failed', {
                    type: 'error',
                });
            } finally {
                setBibJobLoading(false);
            }
        }
    }, []);

    return {
        model,
        bidJobLoading,
        handleFormChange,
        handleFormSubmit,
    };
};
