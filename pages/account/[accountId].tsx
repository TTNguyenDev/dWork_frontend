import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { MainLayout } from '../../layouts';
import { NextPageWithLayout } from '../_app';
import { TaskCategories, TaskSearchBox } from '../../components';
import { ListTasks } from '../../components/list-tasks';
import { Select } from 'chakra-react-select';
import { reactSelectStyles } from '../../styles';
import { TaskOrderByOptions } from '../../constants';
import { useAccountPage } from '../../hooks';
import ProfileCoverDefaultImg from '../../assets/profile-cover.jpg';
import { ProfileCard } from '../../components/profile-card';

const AccountPage: NextPageWithLayout = () => {
  const {
    accountPageState: {
      defaultOrderBy,
      accountId,
      isOwner,
      profile,
      isLoading,
    },
    accountPageMethods: { taskQueryMethods },
  } = useAccountPage();

  return (
    <>
      <Head>
        <title>Account - dWork</title>
        <meta name="description" content="dWork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box height="350px" overflow="hidden">
        <Image
          w="100%"
          h="100%"
          src={ProfileCoverDefaultImg.src}
          alt="cover"
          objectFit="cover"
        />
      </Box>
      <Box h="50px" />
      <Stack
        maxW="1200px"
        margin="auto"
        p="0 15px"
        spacing="30px"
        direction={{ base: 'column', md: 'row' }}
      >
        <Box minW="256px">
          <Box mt="-150px" zIndex="10">
            {profile ? <ProfileCard accountId={accountId} /> : null}
          </Box>
        </Box>
        <VStack alignItems="stretch" spacing="30px" flex={1}>
          <Stack spacing="30px" direction={{ base: 'column', md: 'row' }}>
            <Box minW="256px">
              <Select
                {...reactSelectStyles}
                useBasicStyles
                onChange={async (payload: any) => {
                  taskQueryMethods.setOrderBy(payload.value);
                }}
                options={TaskOrderByOptions}
                defaultValue={defaultOrderBy}
              />
            </Box>
            <Box flex="1">
              <Flex justifyContent="end">
                <Flex w="100%" maxW="500px" justifyContent="end">
                  <TaskCategories />
                </Flex>
              </Flex>
              <HStack></HStack>
            </Box>
          </Stack>
          <Stack
            spacing="30px"
            alignItems="stretch"
            direction={{ base: 'column', md: 'row' }}
          >
            <Box flex="1">
              <ListTasks />
            </Box>
          </Stack>
        </VStack>
      </Stack>
      <Box h="150px" />
    </>
  );
};

AccountPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default AccountPage;
