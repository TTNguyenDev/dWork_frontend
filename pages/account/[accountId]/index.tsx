import { Box, Flex, HStack, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { AccountLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';
import { TaskCategories } from '../../../components';
import { ListTasks } from '../../../components/list-tasks';
import { Select } from 'chakra-react-select';
import { reactSelectStyles } from '../../../styles';
import { TaskOrderByOptions } from '../../../constants';
import { useAccountPage } from '../../../hooks';
import { AccountTaskQueryState } from '../../../store';

const AccountPage: NextPageWithLayout = () => {
  const {
    accountPageState: { defaultOrderBy },
    accountPageMethods: { taskQueryMethods },
  } = useAccountPage();

  return (
    <>
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
          <ListTasks state={AccountTaskQueryState} />
        </Box>
      </Stack>
    </>
  );
};

AccountPage.getLayout = (page: ReactElement) => {
  return <AccountLayout tab="task">{page}</AccountLayout>;
};

export default AccountPage;
