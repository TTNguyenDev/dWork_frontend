import React from 'react';
import { Modal, Button, Form } from 'rsuite';
import { useSubmitWork } from '../../hooks/useSubmitWork';
import { TextField } from '../textField';

type SubmitWorkModalProps = {
    taskId: string;
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
};

export const SubmitWorkModal: React.FunctionComponent<SubmitWorkModalProps> = ({
    taskId,
    open,
    handleOpen,
    handleClose,
}) => {
    const { model, submitWorkLoading, handleFormChange, handleFormSubmit } =
        useSubmitWork();

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
                <Modal.Title>Submit work</Modal.Title>
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
                    taskId,
                }}
            >
                <Modal.Body>
                    <TextField name="taskId" label="Id" readOnly />
                    <TextField
                        name="url"
                        label="Url"
                        type="textarea"
                        rows={5}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        appearance="primary"
                        type="submit"
                        loading={submitWorkLoading}
                    >
                        Submit
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
