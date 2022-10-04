import { Box, Flex, HStack, Select, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { AccountLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';
import { useAccountPage } from '../../../hooks';
import { ListReports } from '../../../components/list-reports';
import { TaskCategories } from '../../../components';
import { TaskOrderByOptions } from '../../../constants';
import { reactSelectStyles } from '../../../styles';

const AccountPage: NextPageWithLayout = () => {
  const {
    accountPageState: { defaultOrderBy },
    accountPageMethods: { taskQueryMethods },
  } = useAccountPage();

  return (
    <>
      <Stack
        spacing="30px"
        alignItems="stretch"
        direction={{ base: 'column', md: 'row' }}
      >
        <Box flex="1">
          <ListReports />
        </Box>
      </Stack>
    </>
  );
};

AccountPage.getLayout = (page: ReactElement) => {
  return <AccountLayout tab="report">{page}</AccountLayout>;
};

export default AccountPage;
