import BN from 'bn.js';
import { transactions } from 'near-api-js';
import { NearConfig } from '../config';
import { BlockChainConnector } from './blockchain';
import { ModalsController } from './modalsController';

export const batchTransactions = async (
    trans: {
        methodName: string;
        body: any;
        gas?: string;
        deposit?: string;
    }[],
    checkOnly?: boolean
): Promise<boolean> => {
    if (!BlockChainConnector.instance.account.accountId) {
        ModalsController.controller.openConnectWalletModal();
        return false;
    }

    const actions = trans.map(
        ({ methodName, body, gas = '30000000000000', deposit = '0' }) =>
            transactions.functionCall(
                methodName,
                body,
                new BN(gas),
                new BN(deposit)
            )
    );

    if (!checkOnly) {
        // @ts-ignore
        await BlockChainConnector.instance.account.signAndSendTransaction({
            receiverId: NearConfig.contractName,
            actions,
        });

        return true;
    }

    return true;
};
