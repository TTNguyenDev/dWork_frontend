import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { MainLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';
import {
  SumitWorkForm,
  TaskProposals,
  TaskSearchBox,
} from '../../../components';
import { useTaskDetailPage, useTaskProposals } from '../../../hooks';
import { ProfileCard } from '../../../components/profile-card';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import moment from 'moment';

const TaskDetailPage: NextPageWithLayout = () => {
  const {
    taskDetailPageState: { taskId, ownerId, isOwner, isLoading, data },
    taskDetailPageMethods: {},
  } = useTaskDetailPage();

  const { taskProposalsState } = useTaskProposals({ taskId });
  console.log(data);
  console.log(taskProposalsState);

  if (!data)
    return (
      <Center h="300px">
        <Spinner />
      </Center>
    );

  return (
    <>
      <Head>
        <title>Task {taskId} - dWork</title>
        <meta name="description" content="dWork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="50px" />
      <VStack
        maxW="1200px"
        margin="auto"
        p="0 15px"
        alignItems="stretch"
        spacing="30px"
      >
        <Stack spacing="30px" direction={{ base: 'column', md: 'row' }}>
          <Text fontSize="36px" fontWeight="700">
            {data.title}
          </Text>
        </Stack>
        <Stack spacing="30px" direction={{ base: 'column', md: 'row' }}>
          <VStack flex="1" alignItems="stretch" spacing="20px">
            <Box>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
                spacing="20px"
              >
                <VStack
                  justifyContent="space-around"
                  borderRadius="2xl"
                  bg="rgba(150, 150, 150, 0.1)"
                  backdropFilter="auto"
                  backdropBlur="100px"
                  padding="20px"
                >
                  <Text fontWeight="800" fontSize="20px">
                    {formatNearAmount(data.price) + ' Ⓝ'}
                  </Text>
                  <Text fontSize="12px">BOUNTY PRIZE</Text>
                </VStack>
                <VStack
                  justifyContent="space-around"
                  borderRadius="2xl"
                  bg="rgba(150, 150, 150, 0.1)"
                  backdropFilter="auto"
                  backdropBlur="100px"
                  padding="20px"
                >
                  <Text fontWeight="800" fontSize="20px">
                    {data.max_participants}
                  </Text>
                  <Text fontSize="12px">MAX PARTICIPANTS</Text>
                </VStack>
                <VStack
                  justifyContent="space-around"
                  borderRadius="2xl"
                  bg="rgba(150, 150, 150, 0.1)"
                  backdropFilter="auto"
                  backdropBlur="100px"
                  padding="20px"
                >
                  <Text fontWeight="800" fontSize="20px">
                    {moment(
                      Number(data.available_until.substring(0, 13))
                    ).format('DD-MM-YYYY HH:mm')}
                  </Text>
                  <Text fontSize="12px">DEADLINE</Text>
                </VStack>
                <VStack
                  justifyContent="space-around"
                  borderRadius="2xl"
                  bg="rgba(150, 150, 150, 0.1)"
                  backdropFilter="auto"
                  backdropBlur="100px"
                  padding="20px"
                >
                  <Text fontWeight="800" fontSize="20px">
                    {`${data.proposals.length}/${data.max_participants}`}
                  </Text>
                  <Text fontSize="12px">PROPOSALS</Text>
                </VStack>
              </SimpleGrid>
            </Box>
            <Box>
              <Text fontSize="20px" fontWeight="600">
                DESCRIPTION
              </Text>
              <Text
                fontSize="16px"
                color="textSecondary"
                noOfLines={4}
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </Box>
            <Divider />
            <Box>
              {!isOwner && (
                <>
                  <Text fontSize="20px" fontWeight="600" mb="20px">
                    SUBMIT WORK
                  </Text>
                  <SumitWorkForm taskId={taskId} />
                </>
              )}
              {isOwner && (
                <>
                  <Text fontSize="20px" fontWeight="600" mb="20px">
                    PROPOSALS
                  </Text>
                  <TaskProposals taskId={taskId} />
                </>
              )}
            </Box>
          </VStack>
          <Box minW="256px">
            <ProfileCard accountId={data.owner} />
          </Box>
        </Stack>
      </VStack>
      <Box h="150px" />
    </>
  );
};

TaskDetailPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TaskDetailPage;
