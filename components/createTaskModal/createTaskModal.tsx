import React, {
    FormHTMLAttributes,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { Modal, Button, Form, DatePicker } from 'rsuite';
import { useCreateTask } from '../../hooks/useCreateTask';
import { ModalsController } from '../../utils/modalsController';
import { Editor } from '../editor';
import { TextField } from '../textField';
import * as dateFns from 'date-fns';

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

    const {
        model,
        createTaskLoading,
        formValue,
        handleFormChange,
        handleFormSubmit,
    } = useCreateTask();

    const [description, setDescription] = useState<string>();
    const [duration, setDuration] = useState<number>();

    const handleEditorChange = useCallback((value: string) => {
        if (!value?.replace(/<(.|\n)*?>/g, '').trim())
            setDescription(undefined);
        else setDescription(value);
    }, []);

    return (
        <Modal
            size="sm"
            backdrop="static"
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
                    await handleFormSubmit(payload, handleClose);
                }}
                formValue={{ ...formValue, duration, description }}
            >
                <Modal.Body>
                    <TextField name="title" label="Title" />
                    <TextField
                        name="price"
                        label="Bounty prize Ⓝ"
                        type="number"
                        style={{ width: 'unset' }}
                        checkTrigger="change"
                    />
                    <TextField
                        name="maxParticipants"
                        label="Max participants"
                        type="number"
                        style={{ width: 'unset' }}
                        checkTrigger="change"
                    />
                    <Form.Group controlId="duration">
                        <Form.ControlLabel>{'Deadline'}</Form.ControlLabel>
                        <DatePicker
                            onChange={(value) => {
                                setDuration(
                                    (value as Date).getTime() - Date.now()
                                );
                            }}
                            format="yyyy-MM-dd HH:mm"
                            style={{ width: '100%', marginBottom: -15 }}
                            disabledDate={(date) =>
                                dateFns.isBefore(
                                    date!,
                                    dateFns.subDays(new Date(), 1)
                                )
                            }
                            disabledHours={(hour, date) => {
                                if (
                                    dateFns.getDate(date) ===
                                    dateFns.getDate(new Date())
                                ) {
                                    return hour < dateFns.getHours(new Date());
                                }

                                return false;
                            }}
                            disabledMinutes={(minute, date) => {
                                if (
                                    dateFns.getDate(date) ===
                                        dateFns.getDate(new Date()) &&
                                    dateFns.getHours(date) ===
                                        dateFns.getHours(new Date())
                                ) {
                                    return (
                                        minute < dateFns.getMinutes(new Date())
                                    );
                                }

                                return false;
                            }}
                        />
                        <Form.Control
                            name="duration"
                            value={duration}
                            style={{ display: 'none' }}
                            checkTrigger="change"
                        />
                    </Form.Group>
                    <div style={{ marginBottom: 15 }} />
                    <Editor
                        onChange={handleEditorChange}
                        style={{
                            padding: 0,
                        }}
                        placeholder="Description"
                    />
                    <Form.Control
                        name="description"
                        value={description}
                        style={{ display: 'none' }}
                        checkTrigger="change"
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
