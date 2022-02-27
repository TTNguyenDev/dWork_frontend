import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Button, Form, InputNumber, Input } from 'rsuite';
import { useCreateTask } from '../../hooks/useCreateTask';
import { ModalsController } from '../../utils/modalsController';
import { Editor } from '../editor';
import { TextField } from '../textField';
import classes from './createTaskModal.module.less';

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

    const [descValue, setDescValue] = useState<string>('');

    const handleEditorChange = useCallback((value: string) => {
        setDescValue(value);
    }, []);

    return (
        <Modal
            size="sm"
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
                    await handleFormSubmit(payload, descValue, handleClose);
                }}
            >
                <Modal.Body>
                    <TextField name="title" label="Title" />
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
                    <TextField
                        name="duration"
                        label="Duration"
                        type="number"
                        style={{ width: 'unset' }}
                    />
                    <Editor
                        onChange={handleEditorChange}
                        style={{
                            padding: 0,
                        }}
                        placeholder="Description"
                    />
                    {/* <TextField
                        name="description"
                        label="Description"
                        type="textarea"
                        rows={5}
                        value="asdasdasdsa"
                    /> */}
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
