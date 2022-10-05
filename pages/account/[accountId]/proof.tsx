import { Box, Flex, HStack, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { AccountLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';
import { ListTasks } from '../../../components/list-tasks';
import { Select } from 'chakra-react-select';
import { reactSelectStyles } from '../../../styles';
import { TaskOrderByOptions, TaskStatusOptions } from '../../../constants';
import { useAccountPage } from '../../../hooks';
import { AccountTaskQueryState } from '../../../store';
import { TaskProposals } from '../../../components';

const AccountPage: NextPageWithLayout = () => {
  const {
    accountPageState: { defaultOrderBy, defaultStatus },
    accountPageMethods: { taskQueryMethods },
  } = useAccountPage();

  return (
    <>
      <Stack spacing="30px" direction={{ base: 'column', md: 'row' }}>
        <TaskProposals isMyProofs />
      </Stack>
    </>
  );
};

AccountPage.getLayout = (page: ReactElement) => {
  return <AccountLayout tab="proof">{page}</AccountLayout>;
};

export default AccountPage;
