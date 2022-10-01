import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { CachePrefixKeys, TaskOrderByOptions } from '../constants';
import { useBlockchain } from '../core/hooks';
import { AccountRepo } from '../repos';
import { AccountTaskQueryState } from '../store';
import { useTaskQuery } from './atoms';

export const useAccountPage = () => {
  const router = useRouter();
  const { blockchainState } = useBlockchain();

  const accountId = useMemo(
    () => router.query.accountId as string,
    [router.query.accountId]
  );

  const isOwner = useMemo(
    () => router.query.accountId === blockchainState.accountId.value,
    [router.query.accountId, blockchainState.accountId.value]
  );

  const { taskQueryState, taskQueryMethods } = useTaskQuery({
    state: AccountTaskQueryState,
    defaultQuery: {
      ownerId: accountId,
    },
  });

  const accountQuery = useQuery(
    [CachePrefixKeys.ACCOUNT, accountId],
    () => AccountRepo.getUserInfo(accountId),
    {
      enabled: !!accountId,
    }
  );

  const defaultOrderBy = useMemo(
    () =>
      TaskOrderByOptions.find((i) => i.value === taskQueryState.orderBy.value),
    [taskQueryState.orderBy.value]
  );

  return {
    accountPageState: {
      taskQueryState,
      defaultOrderBy,
      accountId,
      isOwner,
      profile: accountQuery.data,
      isLoading: accountQuery.isLoading,
    },
    accountPageMethods: {
      taskQueryMethods,
    },
  };
};
