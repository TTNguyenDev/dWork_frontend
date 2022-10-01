import { hookstate, State } from '@hookstate/core';
import { AccountBalance } from 'near-api-js/lib/account';

export type BlockChainState = {
  loading: boolean;
  ready: boolean;
  wallet: {
    loading: boolean;
    logged: boolean;
    account?: {
      id: string;
      username: string;
      balance: AccountBalance;
    };
  };
  accountId?: string;
};
export const BlockchainState: State<BlockChainState> = hookstate({
  loading: true,
  ready: false,
  wallet: {
    loading: true,
    logged: false,
  },
} as BlockChainState);
