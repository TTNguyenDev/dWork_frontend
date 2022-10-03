import { Box, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { MainLayout } from '../../layouts';
import { NextPageWithLayout } from '../_app';
import { TaskCategories, TaskSearchBox } from '../../components';
import { ListTasks } from '../../components/list-tasks';
import { Select } from 'chakra-react-select';
import { reactSelectStyles } from '../../styles';
import { TaskOrderByOptions } from '../../constants';
import { useExplore } from '../../hooks';
import { ExploreTaskQueryState } from '../../store';

const ExplorePage: NextPageWithLayout = () => {
  const {
    exploreState: { defaultOrderBy },
    exploreMethods: { taskQueryMethods },
  } = useExplore();
  return (
    <>
      <Head>
        <title>Explore - dWork</title>
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
          <Box minW="256px">
            <Text fontSize="36px" fontWeight="700">
              Explore
            </Text>
          </Box>
          <Flex flex="1" justifyContent="end">
            <Box maxW={{ base: 'unset', md: '300px' }} w="100%">
              <TaskSearchBox />
            </Box>
          </Flex>
        </Stack>
        <Stack spacing="30px" direction={{ base: 'column', md: 'row' }}>
          <Box minW="256px">
            <Select
              {...reactSelectStyles}
              useBasicStyles
              isSearchable={false}
              options={TaskOrderByOptions}
              defaultValue={defaultOrderBy}
              onChange={async (payload: any) => {
                taskQueryMethods.setOrderBy(payload.value);
              }}
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
          {/* <Box minW="256px">Filter</Box> */}
          <Box flex="1">
            <ListTasks state={ExploreTaskQueryState} />
          </Box>
        </Stack>
      </VStack>
      <Box h="150px" />
    </>
  );
};

ExplorePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default ExplorePage;
