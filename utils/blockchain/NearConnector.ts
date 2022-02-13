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
    'get_account',
    'get_accounts',
    'get_num_accounts',
    'get_followers',
    'get_following',
    'get_post',
    'storage_minimum_balance',
    'storage_balance_of',
    'get_post_likes',
    'get_num_likes',
    'already_like',
    'get_comments',
    'get_num_post_comments',
    'topics',

    'available_tasks',
    'user_info'
];

const ChangeMethods: string[] = [
    'storage_deposit',
    'storage_withdraw',
    'post',
    'follow',
    'unfollow',
    'like_post',
    'unlike_post',
    'comment',
    'new_topic',
    'set_avatar',
    'set_thumbnail',
    'set_bio',

    'register',
    'new_task'
];

type ContractMethodType<K = any> = (...args: any) => K;
type ContractMethodsType = {
    get_account: ContractMethodType;
    get_accounts: ContractMethodType;
    get_num_accounts: ContractMethodType;
    get_followers: ContractMethodType;
    get_following: ContractMethodType;
    get_post: ContractMethodType;
    storage_minimum_balance: ContractMethodType;
    storage_balance_of: ContractMethodType;
    get_post_likes: ContractMethodType;
    get_num_likes: ContractMethodType;
    already_like: ContractMethodType;
    get_comments: ContractMethodType;
    get_num_post_comments: ContractMethodType;
    topics: ContractMethodType;
    storage_deposit: ContractMethodType;
    storage_withdraw: ContractMethodType;
    post: ContractMethodType;
    follow: ContractMethodType;
    unfollow: ContractMethodType;
    like_post: ContractMethodType;
    unlike_post: ContractMethodType;
    comment: ContractMethodType;
    new_topic: ContractMethodType;
    nftContract: any;
    set_avatar: ContractMethodType;
    set_thumbnail: ContractMethodType;
    set_bio: ContractMethodType;

    available_tasks: ContractMethodType;
    user_info: ContractMethodType;
    register: ContractMethodType;
    new_task: ContractMethodType;
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
