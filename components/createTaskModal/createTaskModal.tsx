import React, { useCallback, useEffect } from 'react';
import { Modal, Button, DatePicker, Message } from 'rsuite';
import { useCreateTask } from '../../hooks/useCreateTask';
import { ModalsController } from '../../utils/modalsController';
import { Editor } from '../editor';
import * as dateFns from 'date-fns';
import CreatableSelect from 'react-select/creatable';
import { useQuery } from 'react-query';
import { CategoryService } from '../../services/categoryService';
import { useCreateCategory } from '../../hooks/useCreateCategory';
import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    VStack,
} from '@chakra-ui/react';
import { PRICE_DECIMAL_LENGTH } from '../../constants';
import { TaskService } from '../../services/jobService';

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

    const { createTaskLoading, handleFormSubmit, createTaskForm } =
        useCreateTask();

    const maxParticipantsPerTaskQuery = useQuery(
        'maximum_participants_per_task',
        TaskService.maxParticipantsPerTask
    );
    console.log(maxParticipantsPerTaskQuery.data);

    const handleEditorChange = useCallback((value: string) => {
        if (
            !value?.replace(/<(.|\n)*?>/g, '').trim() &&
            !value.includes('iframe') &&
            !value.includes('img')
        ) {
            createTaskForm.setValue('description', '');
        } else {
            createTaskForm.setValue('description', value);
        }
        createTaskForm.trigger('description');
    }, []);

    const categoriesQuery = useQuery('categories', () =>
        CategoryService.fetchCategories()
    );

    const { createCategoryLoading, handleCreateCategory } = useCreateCategory();

    const amount = React.useMemo(
        () =>
            Number(
                (
                    Number(createTaskForm.getValues('price')) *
                    Number(createTaskForm.getValues('maxParticipants'))
                ).toFixed(PRICE_DECIMAL_LENGTH)
            ),
        [createTaskForm.watch('price'), createTaskForm.watch('maxParticipants')]
    );

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
            <form onSubmit={handleFormSubmit}>
                <Modal.Body>
                    <VStack spacing="1em" align="stretch">
                        <FormControl
                            isInvalid={!!createTaskForm.formState.errors.title}
                        >
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                {...createTaskForm.register('title', {
                                    required: 'This is required',
                                })}
                            />
                            {createTaskForm.formState.errors.title && (
                                <FormErrorMessage>
                                    {
                                        createTaskForm.formState.errors.title
                                            .message
                                    }
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={!!createTaskForm.formState.errors.price}
                        >
                            <FormLabel>Bounty prize Ⓝ</FormLabel>
                            <NumberInput
                                defaultValue={1}
                                min={0.01}
                                precision={2}
                                onChange={(value) =>
                                    createTaskForm.setValue('price', value)
                                }
                            >
                                <NumberInputField
                                    {...createTaskForm.register('price', {
                                        required:
                                            'Bounty prize is a required field',
                                    })}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            {createTaskForm.formState.errors.price && (
                                <FormErrorMessage>
                                    {
                                        createTaskForm.formState.errors.price
                                            .message
                                    }
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={
                                !!createTaskForm.formState.errors
                                    .maxParticipants
                            }
                        >
                            <FormLabel>Max participants</FormLabel>
                            {maxParticipantsPerTaskQuery.data && (
                                <NumberInput
                                    defaultValue={1}
                                    min={1}
                                    max={maxParticipantsPerTaskQuery.data}
                                    precision={0}
                                    onChange={(value) =>
                                        createTaskForm.setValue(
                                            'maxParticipants',
                                            value
                                        )
                                    }
                                >
                                    <NumberInputField
                                        {...createTaskForm.register(
                                            'maxParticipants',
                                            {
                                                required:
                                                    'Max participants is a required field',
                                            }
                                        )}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            )}
                            {createTaskForm.formState.errors
                                .maxParticipants && (
                                <FormErrorMessage>
                                    {
                                        createTaskForm.formState.errors
                                            .maxParticipants.message
                                    }
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={
                                !!createTaskForm.formState.errors.duration
                            }
                        >
                            <FormLabel>Deadline</FormLabel>
                            <Input
                                hidden
                                {...createTaskForm.register('duration', {
                                    required: 'Deadline is a required field',
                                })}
                            />
                            <Box h="40px">
                                <DatePicker
                                    onChange={(value) => {
                                        createTaskForm.setValue(
                                            'duration',
                                            (value as Date).getTime() -
                                                Date.now()
                                        );
                                        createTaskForm.trigger('duration');
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
                                            return (
                                                hour <
                                                dateFns.getHours(new Date())
                                            );
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
                                                minute <
                                                dateFns.getMinutes(new Date())
                                            );
                                        }

                                        return false;
                                    }}
                                />
                            </Box>
                            {createTaskForm.formState.errors.duration && (
                                <FormErrorMessage>
                                    {
                                        createTaskForm.formState.errors.duration
                                            .message
                                    }
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={
                                !!createTaskForm.formState.errors.categoryId
                            }
                        >
                            <FormLabel>Category</FormLabel>
                            <Input
                                hidden
                                {...createTaskForm.register('categoryId', {
                                    required: 'Category is a required field',
                                })}
                            />
                            <Box h="40px">
                                <CreatableSelect
                                    isClearable
                                    onChange={async (payload: any) => {
                                        const value = payload?.value.trim();
                                        if (value !== null && payload.__isNew__)
                                            createTaskForm.setValue(
                                                'newCategory',
                                                value
                                            );
                                        else
                                            createTaskForm.setValue(
                                                'newCategory',
                                                undefined
                                            );

                                        createTaskForm.setValue(
                                            'categoryId',
                                            value.replaceAll(' ', '_')
                                        );
                                        createTaskForm.trigger('categoryId');
                                    }}
                                    options={categoriesQuery.data?.map(
                                        (item) => ({
                                            value: item.id,
                                            label: item.name,
                                        })
                                    )}
                                    isLoading={categoriesQuery.isLoading}
                                    isDisabled={createCategoryLoading}
                                    placeholder="Choose category"
                                />
                            </Box>
                            {createTaskForm.formState.errors.categoryId && (
                                <FormErrorMessage>
                                    {
                                        createTaskForm.formState.errors
                                            .categoryId.message
                                    }
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={
                                !!createTaskForm.formState.errors.description
                            }
                        >
                            <FormLabel mb={0}>Description</FormLabel>
                            <Input
                                hidden
                                {...createTaskForm.register('description', {
                                    required: 'Description is a required field',
                                })}
                            />
                            <Editor
                                onChange={handleEditorChange}
                                style={{
                                    padding: 0,
                                }}
                                placeholder="Description"
                            />
                            {createTaskForm.formState.errors.description && (
                                <FormErrorMessage>
                                    {
                                        createTaskForm.formState.errors
                                            .description.message
                                    }
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        {!isNaN(amount) && (
                            <Message showIcon type="info" header="Note">
                                You need to stake <b>{amount} Ⓝ </b> to prepay
                                user rewards.
                            </Message>
                        )}
                    </VStack>
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
            </form>
        </Modal>
    );
};
