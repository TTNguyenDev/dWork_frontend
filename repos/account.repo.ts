import { AccountApi } from '../apis';
import { AccountDto } from '../dtos';

export class AccountRepo {
  static async storageDeposit(): Promise<void> {
    return AccountApi.storageDeposit();
  }
  ///
  static async isRegistered(): Promise<boolean> {
    return AccountApi.isRegistered();
  }
  static async storageMinimumBalance(): Promise<number> {
    return AccountApi.storageMinimumBalance();
  }
  static async getUserInfo(account_id: string): Promise<AccountDto> {
    return AccountApi.getUserInfo(account_id);
  }
}
