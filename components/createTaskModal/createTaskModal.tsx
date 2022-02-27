import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Modal,
    Button,
    Form,
    InputNumber,
    Input,
    DateRangePicker,
    DatePicker,
} from 'rsuite';
import { useCreateTask } from '../../hooks/useCreateTask';
import { ModalsController } from '../../utils/modalsController';
import { Editor } from '../editor';
import { TextField } from '../textField';
import classes from './createTaskModal.module.less';
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

    const { model, createTaskLoading, handleFormChange, handleFormSubmit } =
        useCreateTask();

    const [descValue, setDescValue] = useState<string>('');
    const [durationValue, setDurationValue] = useState<number>(0);

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
                    await handleFormSubmit(
                        payload,
                        descValue,
                        durationValue,
                        handleClose
                    );
                }}
            >
                <Modal.Body>
                    <TextField name="title" label="Title" />
                    <TextField
                        name="price"
                        label="Bounty prize Ⓝ"
                        type="number"
                        style={{ width: 'unset' }}
                    />
                    <TextField
                        name="maxParticipants"
                        label="Max participants"
                        type="number"
                        style={{ width: 'unset' }}
                    />
                    {/* <TextField
                        name="duration"
                        label="Duration"
                        type="number"
                        style={{ width: 'unset' }}
                    /> */}
                    <label className="rs-form-control-label">Deadline</label>
                    <DatePicker
                        onChange={(value) => {
                            setDurationValue(
                                (value as Date).getTime() - Date.now()
                            );
                        }}
                        format="yyyy-MM-dd HH:mm"
                        style={{ width: '100%' }}
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
                                return minute < dateFns.getMinutes(new Date());
                            }

                            return false;
                        }}
                    />
                    <div style={{ marginBottom: 15 }} />
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
