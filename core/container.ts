import { NearConnector } from './blockchain/near/near.connector';

export const Container = {
  bcConnector: new NearConnector({
    networkId: process.env.NEXT_PUBLIC_NEAR_NETWORK_ID!,
    nodeUrl: process.env.NEXT_PUBLIC_NEAR_NODE_URL!,
    walletUrl: process.env.NEXT_PUBLIC_NEAR_WALLET_URL!,
    helperUrl: process.env.NEXT_PUBLIC_NEAR_HELPER_URL!,
    contractId: process.env.NEXT_PUBLIC_NEAR_CONTRACT_NAME!,
  }),
};
