import { useHookstate } from '@hookstate/core';
import { AccountState } from '../../store';

export const useAccount = () => {
  const accountState = useHookstate(AccountState);

  return {
    accountState,
  };
};
