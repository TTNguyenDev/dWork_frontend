import {
    connect,
    ConnectedWalletAccount,
    Connection,
    Contract,
    keyStores,
    Near,
    WalletConnection,
} from 'near-api-js';
import { BrowserLocalStorageKeyStore } from 'near-api-js/lib/key_stores';
import { NearConfig } from 'near-api-js/lib/near';
import { NearConfig as config } from '../../config';

// 4 epochs
const NUM_BLOCKS_NON_ARCHIVAL = 4 * 12 * 3600;

const ViewMethods: string[] = [
    'available_tasks',
    'current_tasks',
    'completed_tasks',
    'user_info',
    'task_by_id',
    'categories',
    'tasks_by_ids',
    'maximum_participants_per_task',
];

const ChangeMethods: string[] = [
    'storage_deposit',
    'storage_balance_of',
    'register',
    'new_task',
    'submit_proposal',
    'select_proposal',
    'submit_work',
    'approve_work',
    'reject_work',
    'mark_task_as_completed',
    'new_category',
    'update_bio',
];

type ContractMethodType<K = any> = (...args: any) => K;
type ContractMethodsType = {
    storage_deposit: ContractMethodType;
    storage_balance_of: ContractMethodType;
    available_tasks: ContractMethodType;
    current_tasks: ContractMethodType;
    completed_tasks: ContractMethodType;
    user_info: ContractMethodType;
    register: ContractMethodType;
    new_task: ContractMethodType;
    submit_proposal: ContractMethodType;
    select_proposal: ContractMethodType;
    submit_work: ContractMethodType;
    approve_work: ContractMethodType;
    reject_work: ContractMethodType;
    mark_task_as_completed: ContractMethodType;
    task_by_id: ContractMethodType;
    new_category: ContractMethodType;
    categories: ContractMethodType;
    tasks_by_ids: ContractMethodType;
    update_bio: ContractMethodType;
    maximum_participants_per_task: ContractMethodType;
};

export class NearConnector {
    private _keyStore: BrowserLocalStorageKeyStore;

    private _config: NearConfig;

    private _near!: Near;

    private _contract!: Contract;

    private _archivalConnection!: Connection;

    private _walletConnection!: WalletConnection;

    private _lastBlockHeight!: number;

    private _storageMinimumBalance!: number;

    private _account!: ConnectedWalletAccount;

    constructor() {
        const keyStore = new keyStores.BrowserLocalStorageKeyStore();
        this._keyStore = keyStore;
        this._config = { deps: { keyStore }, headers: {}, ...config };
    }

    public get near(): Near {
        return this._near;
    }

    public get contract(): Contract & ContractMethodsType {
        return this._contract as any;
    }

    public get archivalConnection(): Connection {
        return this._archivalConnection;
    }

    public get walletConnection(): WalletConnection {
        return this._walletConnection;
    }

    public get storageMinimumBalance(): number {
        return this._storageMinimumBalance;
    }

    public get account(): ConnectedWalletAccount {
        return this._account;
    }

    private async connectToNear() {
        this._near = await connect(this._config);
        this._archivalConnection = Connection.fromConfig({
            networkId: config.networkId,
            provider: {
                type: 'JsonRpcProvider',
                args: { url: config.archivalNodeUrl },
            },
            signer: { type: 'InMemorySigner', keyStore: this._keyStore },
        });

        this._walletConnection = new WalletConnection(
            this.near,
            config.contractName
        );

        this._account = this._walletConnection.account();
    }

    private async initContract() {
        this._contract = new Contract(this.account, config.contractName, {
            viewMethods: ViewMethods,
            changeMethods: ChangeMethods,
        });
    }

    public async initNear() {
        await this.connectToNear();
        await this.initContract();
        const block = await this.account.connection.provider.block({
            finality: 'final',
        });

        this._lastBlockHeight = block.header.height;

        // this._storageMinimumBalance =
        //     // @ts-ignore
        //     await this.contract.storage_minimum_balance();
    }

    async getBlock(payload: {
        blockId: number;
        methodName: string;
        args: Record<string, any>;
    }) {
        const { blockId, methodName, args } = payload;

        // @ts-ignore
        this.account.validateArgs(args || {});

        const connection =
            blockId + NUM_BLOCKS_NON_ARCHIVAL < this._lastBlockHeight
                ? this.archivalConnection
                : this.account.connection;

        const res: any = await connection.provider.query({
            request_type: 'call_function',
            // @ts-ignore
            block_id: blockId,
            account_id: config.contractName,
            method_name: methodName,
            args_base64: new Buffer(JSON.stringify(args), 'utf8').toString(
                'base64'
            ),
        });

        return (
            res.result &&
            res.result.length > 0 &&
            JSON.parse(Buffer.from(res.result).toString())
        );
    }
}
