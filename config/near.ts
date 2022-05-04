export const NearConfig = Object.freeze({
    networkId: process.env.REACT_APP_NEAR_NETWORK_ID || 'testnet',
    nodeUrl:
        process.env.REACT_APP_NEAR_NODE_URL || 'https://rpc.testnet.near.org',
    archivalNodeUrl:
        process.env.REACT_APP_NEAR_ARCHIVAL_NODE_URL ||
        'https://rpc.testnet.internal.near.org',
    contractName:
        process.env.REACT_APP_NEAR_CONTRACT_NAME ||
        'dev-1651681871186-11343001711726',
    walletUrl:
        process.env.REACT_APP_NEAR_WALLET_URL ||
        'https://wallet.testnet.near.org',
    appTitle: process.env.REACT_APP_NEAR_APP_TITLE || 'dWork',
});
