import { BN } from 'bn.js';
import { MIN_ENOUGH_STORAGE_BALANCE } from '../constants';
import { Balance } from '../models/balanceModel';
import { BlockChainConnector } from '../utils/blockchain';

export class BalanceService {
    static async fetchBalance(): Promise<Balance> {
        const res =
            await BlockChainConnector.instance.contract.storage_balance_of({
                account_id: BlockChainConnector.instance.account.accountId,
            });

        return this.mapToBalance(res);
    }

    private static mapToBalance(raw: any): Balance {
        const total = new BN(raw.total);
        const available = new BN(raw.available);

        return {
            total,
            available,
            isEnough: available.gt(MIN_ENOUGH_STORAGE_BALANCE),
        };
    }

    static async storageDeposit(): Promise<void> {
        await BlockChainConnector.instance.contract.storage_deposit(
            {},
            '30000000000000',
            '100000000000000000000000'
        );
    }
}
