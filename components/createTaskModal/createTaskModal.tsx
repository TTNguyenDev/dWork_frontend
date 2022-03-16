import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Form, DatePicker } from 'rsuite';
import { useCreateTask } from '../../hooks/useCreateTask';
import { ModalsController } from '../../utils/modalsController';
import { Editor } from '../editor';
import { TextField } from '../textField';
import * as dateFns from 'date-fns';
import CreatableSelect from 'react-select/creatable';
import { useQuery } from 'react-query';
import { CategoryService } from '../../services/categoryService';
import { useCreateCategory } from '../../hooks/useCreateCategory';

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
        setFormValue,
        handleFormChange,
        handleFormSubmit,
    } = useCreateTask();

    const [description, setDescription] = useState<string>();

    useEffect(() => {
        setFormValue({
            ...formValue,
            description,
        });
    }, [description]);

    const handleEditorChange = useCallback((value: string) => {
        if (!value?.replace(/<(.|\n)*?>/g, '').trim())
            setDescription(undefined);
        else setDescription(value);
    }, []);

    const categoriesQuery = useQuery('categories', () =>
        CategoryService.fetchCategories()
    );

    const { createCategoryLoading, handleCreateCategory } = useCreateCategory();

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
                formValue={formValue}
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
                        <Form.ControlLabel>Deadline</Form.ControlLabel>
                        <DatePicker
                            onChange={(value) => {
                                setFormValue({
                                    ...formValue,
                                    duration:
                                        (value as Date).getTime() - Date.now(),
                                });
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
                            style={{ display: 'none' }}
                            checkTrigger="change"
                        />
                    </Form.Group>
                    <Form.Group controlId="categoryId">
                        <Form.ControlLabel>Category</Form.ControlLabel>
                        <div style={{ marginBottom: -15 }}>
                            <CreatableSelect
                                isClearable
                                onChange={async (payload: any) => {
                                    if (
                                        payload &&
                                        payload.value !== null &&
                                        payload.__isNew__
                                    )
                                        await handleCreateCategory({
                                            topicName: payload!.value,
                                        });
                                    setFormValue({
                                        ...formValue,
                                        categoryId: payload?.value.replaceAll(
                                            ' ',
                                            '_'
                                        ),
                                    });
                                }}
                                options={categoriesQuery.data?.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                                isLoading={categoriesQuery.isLoading}
                                isDisabled={createCategoryLoading}
                                placeholder="Choose category"
                            />
                        </div>
                        <Form.Control
                            name="categoryId"
                            style={{ display: 'none' }}
                            checkTrigger="change"
                        />
                    </Form.Group>
                    <Editor
                        onChange={handleEditorChange}
                        style={{
                            padding: 0,
                        }}
                        placeholder="Description"
                    />
                    <Form.Control
                        name="description"
                        style={{ display: 'none' }}
                        checkTrigger="change"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        appearance="primary"
                        type="submit"
                        loading={createTaskLoading}
                        disabled={createCategoryLoading}
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
