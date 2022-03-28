import { Account } from '../models/types/accountType';
import { BlockChainConnector } from '../utils/blockchain';

export class AccountService {
    static async fetchUser(accountId: string): Promise<Account> {
        const res = await BlockChainConnector.instance.contract.user_info({
            account_id: accountId,
        });

        return AccountService.mapToModel(res);
    }

    private static mapToModel(raw: any): Account {
        return {
            accountId: raw.account_id,
            bio: raw.bio,
            type: raw.user_type.type,
            totalStake: raw.user_type.total_stake,
            currentRequests: raw.user_type.current_requests,
            completedJobs: raw.completed_jobs,
        };
    }

    static async register(requester: boolean): Promise<void> {
        const res = await BlockChainConnector.instance.contract.register(
            {
                requester,
            },
            '30000000000000',
            '500000000000000000000000'
        );
    }

    static async updateBio(bio: string): Promise<void> {
        await BlockChainConnector.instance.contract.update_bio({
            bio,
        });
    }
}
