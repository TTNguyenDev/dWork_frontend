import { BN } from 'bn.js';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { Container } from '../core';
import { AccountDto } from '../dtos';

enum ContractMethods {
  storage_deposit = 'storage_deposit',
  storage_withdraw = 'storage_withdraw',
  deposit = 'deposit',
  withdraw = 'withdraw',
  update_bio = 'update_bio',
  ///
  is_registered = 'is_registered',
  user_info = 'user_info',
  storage_minimum_balance = 'storage_minimum_balance',
  storage_balance_of = 'storage_balance_of',
  is_admin = 'is_admin',
}

export const AccountApi = Object.freeze({
  async storageDeposit(): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.storage_deposit,
      args: {},
      attachedDeposit: new BN(parseNearAmount('0.2') ?? 0),
    });
  },
  ///
  async isRegistered(account_id: string): Promise<boolean> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.is_registered,
      args: {
        account_id,
      },
    });
    return res;
  },
  async storageMinimumBalance(): Promise<number> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.storage_minimum_balance,
      args: {},
    });
    return res;
  },
  async getUserInfo(account_id: string): Promise<AccountDto> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.user_info,
      args: {
        account_id,
      },
    });
    return res;
  },
  async isAdmin(account_id: string): Promise<boolean> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.is_admin,
      args: {
        account_id,
      },
    });
    return res;
  },
});
