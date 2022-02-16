import React from 'react';
import { Modal, Button, Form } from 'rsuite';
import { useBidJob } from '../../hooks/useBidJob';
import { Job } from '../../models/types/jobType';
import { TextField } from '../textField';

type BidJobModalProps = {
    task: Job;
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
};

export const BidJobModal: React.FunctionComponent<BidJobModalProps> = ({
    task,
    open,
    handleOpen,
    handleClose,
}) => {
    const { model, bidJobLoading, handleFormChange, handleFormSubmit } =
        useBidJob();

    return (
        <Modal
            size="xs"
            backdrop
            keyboard={false}
            open={open}
            onClose={handleClose}
            overflow={false}
        >
            <Modal.Header>
                <Modal.Title>Bid job</Modal.Title>
            </Modal.Header>
            <Form
                model={model}
                fluid
                onChange={handleFormChange}
                onSubmit={async (payload) => {
                    await handleFormSubmit(payload);
                    handleClose();
                }}
                formDefaultValue={{
                    taskId: task.taskId,
                }}
            >
                <Modal.Body>
                    <TextField name="taskId" label="Id" readOnly />
                    <TextField
                        name="coverLetter"
                        label="Cover letter"
                        type="textarea"
                        rows={5}
                    />
                    <TextField name="price" label="Price" type="number" />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        appearance="primary"
                        type="submit"
                        loading={bidJobLoading}
                    >
                        Bid
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
