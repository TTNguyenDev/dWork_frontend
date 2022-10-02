import { BN } from 'bn.js';
import {
  connect,
  keyStores,
  Near,
  transactions,
  WalletConnection,
} from 'near-api-js';
import {
  ChangeFunctionCallOptions,
  ViewFunctionCallOptions,
} from 'near-api-js/lib/account';
import { NearConfig } from 'near-api-js/lib/near';
import { TransactionAction } from '../../types';
import { IBlockchainConnector } from '../blockchain.connector';

export type NearConnectorConfig = NearConfig & {
  contractId: string;
};
export class NearConnector implements IBlockchainConnector<Near> {
  constructor(config: NearConnectorConfig) {
    this._config = config;
  }

  private _config: NearConnectorConfig;
  get config(): NearConnectorConfig {
    return this._config;
  }

  private _conn?: Near;
  get conn(): Near {
    if (!this._conn)
      throw new Error(`${this.constructor.name}: conn not initialize`);
    return this._conn;
  }

  private _wallet?: WalletConnection;
  get wallet(): WalletConnection {
    if (!this._wallet)
      throw new Error(`${this.constructor.name}: wallet not initialize`);
    return this._wallet;
  }

  async connect(): Promise<Near> {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    this._conn = await connect({
      ...this._config,
      keyStore,
    });
    this._wallet = new WalletConnection(this.conn, '');
    return this.conn;
  }

  async signIn() {
    return this.wallet.requestSignIn({
      contractId: this._config.contractId,
    });
  }

  async signOut() {
    return this.wallet.signOut();
  }

  async isSignedIn() {
    return this.wallet.isSignedInAsync();
  }

  async callViewMethod(
    payload: Omit<ViewFunctionCallOptions, 'contractId'> & {
      contractId?: string;
    }
  ) {
    return this.wallet.account().viewFunctionV2({
      ...payload,
      contractId: payload.contractId ?? this._config.contractId,
    });
  }

  async callChangeMethod(
    payload: Omit<ChangeFunctionCallOptions, 'contractId'> & {
      contractId?: string;
    }
  ) {
    return this.wallet.account().functionCall({
      ...payload,
      contractId: payload.contractId ?? this._config.contractId,
    });
  }

  async transaction(payload: {
    contractId?: string;
    actions: TransactionAction[];
    walletMeta?: string;
    walletCallbackUrl?: string;
    returnError?: boolean;
  }) {
    const { walletMeta, walletCallbackUrl, returnError } = payload;
    const actions = payload.actions.map(
      ({ methodName, args: body, gas = '30000000000000', deposit = '0' }) =>
        transactions.functionCall(
          methodName,
          body,
          new BN(gas),
          new BN(deposit)
        )
    );

    // @ts-ignore
    return this.wallet.account().signAndSendTransaction({
      receiverId: payload.contractId ?? this._config.contractId,
      actions,
      walletMeta,
      walletCallbackUrl,
      returnError,
    });
  }
}
