import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  TaskOrderByOptions,
  TaskStatus,
  TaskStatusOptions,
} from '../constants';
import { useWalletAccountId } from '../core/hooks';
import { AccountTaskQueryState } from '../store';
import { useTaskQuery } from './atoms';

export const useAccountPage = () => {
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

  const { taskQueryState, taskQueryMethods } = useTaskQuery({
    state: AccountTaskQueryState,
    defaultQuery: {
      ownerId: accountId,
    },
  });

  const defaultOrderBy = useMemo(
    () =>
      TaskOrderByOptions.find((i) => i.value === taskQueryState.orderBy.value),
    [taskQueryState.orderBy.value]
  );

  const defaultStatus = useMemo(
    () =>
      TaskStatusOptions.find((i) => i.value === taskQueryState.status.value),
    [taskQueryState.status.value]
  );

  return {
    accountPageState: {
      taskQueryState,
      defaultOrderBy,
      defaultStatus,
      isOwner,
    },
    accountPageMethods: {
      taskQueryMethods,
    },
  };
};
