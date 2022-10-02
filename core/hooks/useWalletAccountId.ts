import { useHookstate } from '@hookstate/core';
import { BlockchainState } from '../store';
import { parseToUsername } from '../utils';

export const useWalletAccountId = () => {
  const blockchainState = useHookstate(BlockchainState);

  return {
    accountId: blockchainState.accountId.value ?? null,
    username: blockchainState.accountId.value
      ? parseToUsername(blockchainState.accountId.value)
      : null,
  };
};
