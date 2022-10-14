import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement, useMemo } from 'react';
import { NavigationLayout } from '../../layouts';
import { NextPageWithLayout } from '../_app';
import { useCreateTask } from '../../hooks';
import { CreatableSelect } from 'chakra-react-select';
import { Editor } from '../../core/components';
import * as dateFns from 'date-fns';
import { DatePicker } from 'rsuite';
import { reactSelectStyles } from '../../styles';
import { RATIO_AMOUT_TO_CREATE_TASK } from '../../constants';
import { calcAmountToCreateTask } from '../../utils';

const MAX_PARTICIPANTS_PER_TASK = 100;
const PRICE_DECIMAL_LENGTH = 2;

const TaskCreatePage: NextPageWithLayout = () => {
  const toast = useToast();
  const {
    createTaskState: {
      form,
      isLoading,
      taskCategoriesState,
      isAllowedToCreateTask,
    },
    createTaskMethods: { onSubmit },
  } = useCreateTask({
    options: {
      onSuccess: () => {
        toast({
          title: 'Create task successfully',
          status: 'success',
          position: 'top',
        });
      },
      onError: () => {
        toast({
          title: 'Create task failed',
          status: 'error',
          position: 'top',
        });
      },
    },
  });

  const amount = useMemo(
    () =>
      calcAmountToCreateTask({
        price: form.getValues('price'),
        max_participants: form.getValues('max_participants'),
      }),
    [form.watch('price'), form.watch('max_participants')]
  );

  return (
    <>
      <Head>
        <title>Create task - dWork</title>
        <meta name="description" content="dWork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="50px" />
      <Box maxW="800px" margin="auto" p="0 15px">
        <Text fontSize="36px" fontWeight="700">
          Create task
        </Text>
        <Box h="50px" />
        <Box>
          <form onSubmit={onSubmit}>
            <Box>
              <VStack spacing="30px" align="stretch">
                <FormControl isInvalid={!!form.formState.errors.title}>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    {...form.register('title', {
                      required: 'This is required',
                    })}
                  />
                  {form.formState.errors.title && (
                    <FormErrorMessage>
                      {form.formState.errors.title.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!form.formState.errors.price}>
                  <FormLabel>Bounty prize Ⓝ</FormLabel>
                  <Input
                    hidden
                    {...form.register('price', {
                      required: 'Bounty prize is a required field',
                    })}
                  />
                  <NumberInput
                    defaultValue={1}
                    min={0.01}
                    precision={2}
                    onChange={(value) => form.setValue('price', value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  {form.formState.errors.price && (
                    <FormErrorMessage>
                      {form.formState.errors.price.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={!!form.formState.errors.max_participants}
                >
                  <FormLabel>Max participants</FormLabel>
                  <Input
                    hidden
                    {...form.register('max_participants', {
                      required: 'Max participants is a required field',
                    })}
                  />
                  {MAX_PARTICIPANTS_PER_TASK && (
                    <NumberInput
                      defaultValue={1}
                      min={1}
                      max={MAX_PARTICIPANTS_PER_TASK}
                      precision={0}
                      onChange={(value) => {
                        form.setValue('max_participants', Number(value));
                        form.trigger('max_participants');
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                  {form.formState.errors.max_participants && (
                    <FormErrorMessage>
                      {form.formState.errors.max_participants.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!form.formState.errors.duration}>
                  <FormLabel>Deadline</FormLabel>
                  <Input
                    hidden
                    {...form.register('duration', {
                      required: 'Deadline is a required field',
                    })}
                  />
                  <Box h="40px">
                    <DatePicker
                      className={`date-picker rs-theme-dark ${
                        !!form.formState.errors.duration
                          ? 'date-picker-invalid'
                          : ''
                      }`}
                      menuClassName="date-picker-menu rs-theme-dark"
                      onChange={(value) => {
                        form.setValue(
                          'duration',
                          value
                            ? (value as Date).getTime() - Date.now() + '000000'
                            : (undefined as any)
                        );
                        form.trigger('duration');
                      }}
                      format="yyyy-MM-dd HH:mm"
                      style={{ width: '100%', marginBottom: -15 }}
                      disabledDate={(date) =>
                        dateFns.isBefore(date!, dateFns.subDays(new Date(), 1))
                      }
                      disabledHours={(hour, date) => {
                        if (
                          dateFns.getDate(date) === dateFns.getDate(new Date())
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
                      placeholder="Please choose deadline"
                    />
                  </Box>
                  {form.formState.errors.duration && (
                    <FormErrorMessage>
                      {form.formState.errors.duration.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!form.formState.errors.category_id}>
                  <FormLabel>Category</FormLabel>
                  <Input
                    hidden
                    {...form.register('category_id', {
                      required: 'Category is a required field',
                    })}
                  />
                  <Box h="40px">
                    <CreatableSelect
                      {...reactSelectStyles}
                      useBasicStyles
                      onChange={async (payload: any) => {
                        const value = payload?.value.trim();
                        if (value !== null && payload.__isNew__)
                          form.setValue('new_category', value);
                        else form.setValue('new_category', undefined);

                        form.setValue(
                          'category_id',
                          (value + '').replaceAll(' ', '_').toLocaleLowerCase()
                        );
                        form.trigger('category_id');
                      }}
                      options={taskCategoriesState.data?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      isLoading={taskCategoriesState.isLoading}
                      isDisabled={taskCategoriesState.isLoading}
                      placeholder="Choose category"
                    />
                  </Box>
                  {form.formState.errors.category_id && (
                    <FormErrorMessage>
                      {form.formState.errors.category_id.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!form.formState.errors.description}>
                  <FormLabel mb={0}>Description</FormLabel>
                  <Input
                    hidden
                    {...form.register('description', {
                      required: 'Description is a required field',
                    })}
                  />
                  <Editor
                    onChange={(value) => {
                      form.setValue('description', value);
                      form.trigger('description');
                    }}
                    style={{
                      padding: 0,
                    }}
                    isInvalid={!!form.formState.errors.description}
                    placeholder="Description"
                  />
                  {form.formState.errors.description && (
                    <FormErrorMessage>
                      {form.formState.errors.description.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                {!isNaN(amount) && (
                  <Text fontSize="16px" bg="#2b4c85" p="20px" borderRadius="xl">
                    You need to stake <b>{amount} Ⓝ </b> to prepay user rewards.
                  </Text>
                )}
              </VStack>
            </Box>
            <Divider opacity="0.5" margin="35px 0" />
            <Flex justifyContent="end">
              <Button
                type="submit"
                variant="connectWallet"
                w="200px"
                isLoading={isLoading}
                isDisabled={isLoading || !isAllowedToCreateTask}
              >
                CREATE
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
      <Box h="150px" />
    </>
  );
};

TaskCreatePage.getLayout = (page: ReactElement) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default TaskCreatePage;
