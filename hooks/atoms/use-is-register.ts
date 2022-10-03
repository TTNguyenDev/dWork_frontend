import { useHookstate } from '@hookstate/core';
import { AccountState } from '../../store';

export const useIsRegistered = () => {
  const accountState = useHookstate(AccountState);

  return {
    isRegistered: accountState.isRegistered.value ?? null,
  };
};
