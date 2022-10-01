import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { TaskOrderByOptions } from '../constants';
import { useBlockchain } from '../core/hooks';
import { ExploreTaskQueryState } from '../store';
import { useTaskQuery } from './atoms';

export const useAccountPage = () => {
  const router = useRouter();
  const { blockchainState } = useBlockchain();

  const accountId = useMemo(
    () => router.query.accountId,
    [router.query.accountId]
  );

  const isOwner = useMemo(
    () => router.query.accountId === blockchainState.accountId.value,
    [router.query.accountId, blockchainState.accountId.value]
  );

  const { taskQueryState, taskQueryMethods } = useTaskQuery({
    state: ExploreTaskQueryState,
  });

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
    },
    accountPageMethods: {
      taskQueryMethods,
    },
  };
};
