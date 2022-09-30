import { AccountApi } from '../apis';

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
}
