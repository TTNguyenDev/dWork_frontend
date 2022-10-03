import { useHookstate } from '@hookstate/core';
import { BlockchainState } from '../store';

export const useWallet = () => {
  const blockchainState = useHookstate(BlockchainState);

  return {
    wallet: blockchainState.wallet.value,
  };
};
