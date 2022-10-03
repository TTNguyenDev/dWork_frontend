import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { CachePrefixKeys } from '../constants';
import { useWalletAccountId } from '../core/hooks';
import { AccountRepo } from '../repos';

export const useAccountLayout = () => {
  const router = useRouter();
  const { accountId: walletAccountId } = useWalletAccountId();

  const accountId = useMemo(
    () => router.query.accountId as string,
    [router.query.accountId]
  );

  const isOwner = useMemo(
    () => router.query.accountId === walletAccountId,
    [router.query.accountId, walletAccountId]
  );

  const accountQuery = useQuery(
    [CachePrefixKeys.ACCOUNT, accountId],
    () => AccountRepo.getUserInfo(accountId),
    {
      enabled: !!accountId,
    }
  );

  return {
    accountLayoutState: {
      accountId,
      isOwner,
      profile: accountQuery.data,
      isLoading: accountQuery.isLoading,
    },
    accountLayoutMethods: {},
  };
};
