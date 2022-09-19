import { hookstate, State } from '@hookstate/core';

export type BlockChainState = {
    loading: boolean;
    ready: boolean;
};
export const BlockchainState: State<BlockChainState> = hookstate({
    loading: true,
    ready: false,
} as BlockChainState);
