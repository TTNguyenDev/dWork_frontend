import { NearConfig } from "../config";
import { BlockChainConnector } from "../utils/blockchain";

export class AuthService {
    static async logIn(): Promise<void> {
        await BlockChainConnector.instance.walletConnection.requestSignIn(
            NearConfig.contractName,
            NearConfig.appTitle
        );
    }

    static async logOut(): Promise<void> {
        await BlockChainConnector.instance.walletConnection.signOut();
    }
}
