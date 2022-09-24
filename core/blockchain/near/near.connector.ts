import { connect, keyStores, Near, WalletConnection } from 'near-api-js';
import { NearConfig } from 'near-api-js/lib/near';
import { IBlockchainConnector } from '../blockchain.connector';

export type NearConnectorConfig = NearConfig & {
  contractId: string;
};
export class NearConnector implements IBlockchainConnector<Near> {
  constructor(config: NearConnectorConfig) {
    this._config = config;
  }

  private _config: NearConnectorConfig;

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
}
