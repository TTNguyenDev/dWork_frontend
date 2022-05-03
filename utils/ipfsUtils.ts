import { create as ipfsClient, IPFSHTTPClient } from 'ipfs-http-client';
import { IPFS_BASE_URL } from '../constants';
export class IPFSUtils {
    private static _client: IPFSHTTPClient;

    static get client(): IPFSHTTPClient {
        if (this._client) return this._client;

        this._client = ipfsClient({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
        });

        return this._client;
    }

    public static uploadFileToIPFS({
        file,
        onSuccess,
        onError,
    }: {
        file: File;
        onSuccess?: (url: string) => any;
        onError?: any;
    }) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onloadend = () => {
                // @ts-ignore
                const result = new Buffer(reader.result);
                // @ts-ignore
                IPFSUtils.client
                    .add(result)
                    .then(async (res) => {
                        const url = IPFS_BASE_URL + res.path;

                        if (onSuccess) await onSuccess(url);

                        resolve(url);
                    })
                    .catch(async (err) => {
                        if (onError) await onError(err);
                        reject();
                    });
            };
        });
    }

    public static async getDataByCID(cid: string) {
        const stream = IPFSUtils.client.cat(cid);
        let data = '';
        // eslint-disable-next-line no-restricted-syntax
        for await (const chunk of stream) {
            data += new TextDecoder().decode(chunk);
        }

        return data;
    }
}
