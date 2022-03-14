import React from 'react';
import { Button } from 'rsuite';
import { Job } from '../../models/types/jobType';
import { useSubmitBtn } from '../../hooks/useSubmitBtn';
import { SubmitWorkModal } from '../submitWorkModal';

type SubmitWorkButtonProps = {
    task: Job;
};

export const SubmitWorkButton: React.FunctionComponent<
    SubmitWorkButtonProps
> = ({ task }) => {
    const [openSubmitModal, setOpenSubmitModal] = React.useState(false);
    const handleOpenSubmitModal = () => setOpenSubmitModal(true);
    const handleCloseSubmitModal = () => setOpenSubmitModal(false);

    const { submitBtnDisabled, submitBtnHide, handleBtnSubmitClick } =
        useSubmitBtn({ task, onModalOpen: handleOpenSubmitModal });

    return !submitBtnHide ? (
        <>
            <Button
                appearance="primary"
                size="sm"
                onClick={handleBtnSubmitClick}
                disabled={submitBtnDisabled}
            >
                {submitBtnDisabled ? 'Submitted' : 'Submit now'}
            </Button>
            <div onClick={(e) => e.stopPropagation()}>
                <SubmitWorkModal
                    taskId={task.taskId}
                    open={openSubmitModal}
                    handleOpen={handleOpenSubmitModal}
                    handleClose={handleCloseSubmitModal}
                />
            </div>
        </>
    ) : null;
};
