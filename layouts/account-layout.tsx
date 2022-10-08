import {
  Box,
  Button,
  Divider,
  Image,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ProfileCard } from '../components/profile-card';
import { useAccountLayout } from '../hooks';
import ProfileCoverDefaultImg from '../assets/profile-cover.jpg';
import Link from 'next/link';
import { MainLayout } from './main-layout';
import { AccountState } from '../store';

export function AccountLayout({
  children,
  tab,
}: PropsWithChildren<{ tab: 'task' | 'proof' | 'report' }>) {
  const {
    accountLayoutState: { accountId, profile, isAdmin },
  } = useAccountLayout();

  return (
    <MainLayout>
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
          <Box>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap="20px" mb="5px">
              <Link href={`/account/${accountId}`}>
                <Button
                  variant="ghost"
                  borderRadius="md"
                  isActive={tab === 'task'}
                >
                  TASK
                </Button>
              </Link>

              <Link href={`/account/${accountId}/proof`}>
                <Button
                  variant="ghost"
                  borderRadius="md"
                  isActive={tab === 'proof'}
                  hidden={AccountState.profile.value?.account_id != accountId}
                >
                  PROOF
                </Button>
              </Link>
              <Link href={`/account/${accountId}/report`}>
                <Button
                  variant="ghost"
                  borderRadius="md"
                  isActive={tab === 'report'}
                  hidden={!isAdmin}
                >
                  REPORT
                </Button>
              </Link>
            </SimpleGrid>
            <Divider />
          </Box>
          {children}
        </VStack>
      </Stack>
      <Box h="150px" />
    </MainLayout>
  );
}
