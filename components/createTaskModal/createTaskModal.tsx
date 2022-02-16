import React, { useEffect } from 'react';
import { Modal, Button, Form, InputNumber, Input } from 'rsuite';
import { useCreateTask } from '../../hooks/useCreateTask';
import { ModalsController } from '../../utils/modalsController';
import { TextField } from '../textField';

type createTaskModalProps = {};

export const CreateTaskModal: React.FunctionComponent<
    createTaskModalProps
> = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        ModalsController.setController({
            openCreateTaskModal: handleOpen,
        });
    }, []);

    const { model, createTaskLoading, handleFormChange, handleFormSubmit } =
        useCreateTask();

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
                <Modal.Title>Create new task</Modal.Title>
            </Modal.Header>
            <Form
                model={model}
                fluid
                onChange={handleFormChange}
                onSubmit={async (payload) => {
                    await handleFormSubmit(payload);
                    handleClose();
                }}
            >
                <Modal.Body>
                    <TextField name="title" label="Title" />
                    <TextField
                        name="description"
                        label="Description"
                        type="textarea"
                        rows={5}
                    />
                    <TextField
                        name="price"
                        label="Price Ⓝ"
                        type="number"
                        style={{ width: 'unset' }}
                    />
                    <TextField
                        name="maxParticipants"
                        label="Max participants"
                        type="number"
                        style={{ width: 'unset' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        appearance="primary"
                        type="submit"
                        loading={createTaskLoading}
                    >
                        Create
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
