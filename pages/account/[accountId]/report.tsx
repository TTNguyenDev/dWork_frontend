import { Box, Flex, HStack, Select, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { AccountLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';
import { useAccountLayout, useAccountPage } from '../../../hooks';
import { ListReports } from '../../../components/list-reports';
import { TaskCategories } from '../../../components';
import { TaskOrderByOptions } from '../../../constants';
import { reactSelectStyles } from '../../../styles';

const AccountPage: NextPageWithLayout = () => {
  const {
    accountPageState: { defaultOrderBy },
    accountPageMethods: { taskQueryMethods },
  } = useAccountPage();
  
  const {
    accountLayoutState: { isAdmin },
  } = useAccountLayout();

  return (
    <>
      <Stack
        spacing="30px"
        alignItems="stretch"
        direction={{ base: 'column', md: 'row' }}
      >
        <Box flex="1">
          {
            isAdmin ? (
              <ListReports />
            ) : (
              <Text>
                Not available to access this page
              </Text>
            ) 
          }
        </Box>
      </Stack>
    </>
  );
};

AccountPage.getLayout = (page: ReactElement) => {
  return <AccountLayout tab="report">{page}</AccountLayout>;
};

export default AccountPage;
