import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
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
  DepositToView,
  LoginToView,
  SumitWorkForm,
  TaskProposals,
  TaskSearchBox,
} from '../../../components';
import { useTaskDetailPage, useTaskProposals } from '../../../hooks';
import { ProfileCard } from '../../../components/profile-card';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import moment from 'moment';
import { ProposalCard } from '../../../components/proposal-card';
import { MdCheck, MdCheckCircleOutline } from 'react-icons/md';

const TaskDetailPage: NextPageWithLayout = () => {
  const {
    taskDetailPageState: {
      taskId,
      ownerId,
      isOwner,
      isLoading,
      data,
      taskProposalsState,
      isFullApproved,
      ownerProposal,
      isRegistered,
      logged,
      markTaskCompleteState,
      isCompletable,
    },
    taskDetailPageMethods: { markTaskCompleteMethods },
  } = useTaskDetailPage();

  if (!data || taskProposalsState.isLoading)
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
        <Stack
          spacing="30px"
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Text fontSize="36px" fontWeight="700">
            {data.title}
          </Text>
          {isCompletable && (
            <Button
              isLoading={markTaskCompleteState.isLoading}
              onClick={markTaskCompleteMethods.submit}
              variant="outline"
              colorScheme="green"
            >
              MARK AS COMPLETED
            </Button>
          )}
          {markTaskCompleteState.isCompleted && (
            <Center>
              <Badge colorScheme="green" p="5px 10px" borderRadius="2xl">
                <HStack>
                  <MdCheck size="20px" />
                  <Text fontSize="18px">COMPLETED</Text>
                </HStack>
              </Badge>
            </Center>
          )}
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
                    {moment(data.available_until).format('DD-MM-YYYY HH:mm')}
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
                    {`${taskProposalsState.approvedItems.length ?? 0}/${
                      data.max_participants
                    }`}
                  </Text>
                  <Text fontSize="12px">TARGET</Text>
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
              <LoginToView />
              <DepositToView />
              {logged &&
                isRegistered &&
                !isOwner &&
                !markTaskCompleteState.isCompleted &&
                !isFullApproved &&
                !ownerProposal && (
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
              {ownerProposal && (
                <>
                  <Text fontSize="20px" fontWeight="600" mb="20px">
                    MY PROOF
                  </Text>
                  <Box>
                    <ProposalCard
                      data={ownerProposal}
                      taskId={taskId}
                      isWorker
                    />
                  </Box>
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
