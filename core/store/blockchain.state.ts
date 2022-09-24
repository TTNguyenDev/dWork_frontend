import { hookstate, State } from '@hookstate/core';

export type BlockChainState = {
  loading: boolean;
  ready: boolean;
  wallet: {
    loading: boolean;
    logged: boolean;
  };
};
export const BlockchainState: State<BlockChainState> = hookstate({
  loading: true,
  ready: false,
  wallet: {
    loading: true,
    logged: false,
  },
} as BlockChainState);
