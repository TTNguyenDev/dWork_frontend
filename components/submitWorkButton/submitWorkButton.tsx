import React, { CSSProperties, HTMLProps } from 'react';
import { Button } from 'rsuite';
import { Task } from '../../models/types/jobType';
import { useSubmitBtn } from '../../hooks/useSubmitBtn';
import { SubmitWorkModal } from '../submitWorkModal';

type SubmitWorkButtonProps = {
    task: Task;
    style?: CSSProperties;
};

export const SubmitWorkButton: React.FunctionComponent<
    SubmitWorkButtonProps
> = ({ task, style }) => {
    const [openSubmitModal, setOpenSubmitModal] = React.useState(false);
    const handleOpenSubmitModal = () => setOpenSubmitModal(true);
    const handleCloseSubmitModal = () => setOpenSubmitModal(false);

    const { submitBtnDisabled, submitBtnHide, handleBtnSubmitClick } =
        useSubmitBtn({ task, onModalOpen: handleOpenSubmitModal });

    return !submitBtnHide ? (
        <>
            <Button
                appearance="primary"
                size="lg"
                onClick={handleBtnSubmitClick}
                disabled={submitBtnDisabled}
                style={style}
            >
                {submitBtnDisabled ? 'Submitted' : 'Submit Now'}
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
