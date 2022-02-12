import { NearConnector } from './NearConnector';

export class BlockChainConnector {
    private static _connector: NearConnector;

    static get instance(): NearConnector {
        if (!this._connector) this._connector = new NearConnector();
        return this._connector;
    }
}
