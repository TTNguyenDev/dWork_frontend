import { useHookstate } from '@hookstate/core';
import { AccountState } from '../../store';

export const useProfile = () => {
  const accountState = useHookstate(AccountState);

  return {
    profile: accountState.profile.value ?? null,
  };
};
