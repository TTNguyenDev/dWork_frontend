import { AccountApi } from '../apis';
import { AccountDto } from '../dtos';

export class AccountRepo {
  static async storageDeposit(): Promise<void> {
    return AccountApi.storageDeposit();
  }
  ///
  static async isRegistered(accountId: string): Promise<boolean> {
    return AccountApi.isRegistered(accountId);
  }
  static async storageMinimumBalance(): Promise<number> {
    return AccountApi.storageMinimumBalance();
  }
  static async getUserInfo(accountId: string): Promise<AccountDto> {
    return AccountApi.getUserInfo(accountId);
  }
  static async isAdmin(accountId: string): Promise<boolean> {
    return AccountApi.isAdmin(accountId);
  }
}
