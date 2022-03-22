import { useMemo } from 'react';
import { AccountTypes } from '../models/types/accountType';
import { Task } from '../models/types/jobType';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export type UseSubmitBtnInput = {
    task: Task;
    onModalOpen: () => void;
};

export type UseSubmitBtnOutput = {
    submitBtnDisabled: boolean;
    submitBtnHide: boolean;
    handleBtnSubmitClick: (e: any) => void;
};

export const useSubmitBtn = ({
    task,
    onModalOpen,
}: UseSubmitBtnInput): UseSubmitBtnOutput => {
    const auth = useSelector((state: RootState) => state.auth);
    const profile = useSelector((state: RootState) => state.profile);

    const submitBtnDisabled = useMemo(() => {
        return !!task.proposals.find((p) => p.accountId === auth.data.userId);
    }, [task, auth.data.userId]);

    const submitBtnHide = useMemo(() => {
        return (
            profile.data.info?.type === AccountTypes.REQUESTER ||
            task.availableUntil < Date.now() ||
            task.proposals.filter((p) => p.isApproved).length ===
                task.maxParticipants
        );
    }, [profile.data.info]);

    const handleBtnSubmitClick = (e: any) => {
        onModalOpen();
        e.stopPropagation();
    };

    return {
        submitBtnDisabled,
        submitBtnHide,
        handleBtnSubmitClick,
    };
};
