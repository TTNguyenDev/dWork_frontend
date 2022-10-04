import { useHookstate } from '@hookstate/core';
import { AccountState } from '../../store';

export const useIsAdmin = () => {
  const accountState = useHookstate(AccountState);

  return {
    isAdmin: accountState.isAdmin.value ?? null,
  };
};
