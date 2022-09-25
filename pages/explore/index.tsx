import {
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { MainLayout } from '../../layouts';
import { NextPageWithLayout } from '../_app';
import { TaskCategories, TaskSearchBox } from '../../components';
import { ListTasks } from '../../components/list-tasks';

const ExplorePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Explore - dWork</title>
        <meta name="description" content="dWork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="50px" />
      <Box maxW="1200px" margin="auto" p="0 15px">
        <HStack spacing="20px">
          <Box minW="256px">
            <Text fontSize="36px" fontWeight="700">
              Explore
            </Text>
          </Box>
          <Flex w="100%" justifyContent="end">
            <Box maxW="300px" w="100%">
              <TaskSearchBox />
            </Box>
          </Flex>
        </HStack>
        <Divider opacity="0.1" margin="35px 0" />
        <HStack spacing="20px">
          <Box minW="256px">Sort</Box>
          <Box w="100%">
            <Flex justifyContent="end">
              <Flex w="100%" maxW="500px" justifyContent="end">
                <TaskCategories />
              </Flex>
            </Flex>
            <HStack></HStack>
          </Box>
        </HStack>
        <HStack spacing="20px">
          <Box minW="256px">Filter</Box>
          <Box w="100%">
            <Flex justifyContent="end">
              <Flex w="100%" maxW="500px" justifyContent="end">
                <ListTasks />
              </Flex>
            </Flex>
            <HStack></HStack>
          </Box>
        </HStack>
      </Box>
      <Box h="150px" />
    </>
  );
};

ExplorePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default ExplorePage;
