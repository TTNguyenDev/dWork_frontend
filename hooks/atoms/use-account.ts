import { useHookstate } from '@hookstate/core';
import { useCallback } from 'react';
import { useWalletAccountId } from '../../core/hooks';
import { AccountRepo } from '../../repos';
import { AccountState } from '../../store';

export const useAccount = () => {
  const accountState = useHookstate(AccountState);
  const { accountId } = useWalletAccountId();

  const fetchProfile = useCallback(async () => {
    if (accountId) {
      const profile = await AccountRepo.getUserInfo(accountId);
      console.log('fetchProfile', profile);
      accountState.profile.set(profile);
    }
  }, [accountId]);

  return {
    accountState,
    accountMethods: {
      fetchProfile,
    },
  };
};
