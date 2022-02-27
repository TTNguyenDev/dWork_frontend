import { Job } from '../models/types/jobType';
import { BlockChainConnector } from '../utils/blockchain';
import { utils } from 'near-api-js';
import BN from 'bn.js';

export type CreateTaskInput = {
    title: string;
    description: string;
    price: string;
    maxParticipants: string;
    duration: string;
};
export class JobService {
    static async createTask(payload: CreateTaskInput): Promise<void> {
        const maxParticipants = Number.parseInt(payload.maxParticipants);
        await BlockChainConnector.instance.contract.new_task(
            {
                title: payload.title,
                description: payload.description,
                price: utils.format.parseNearAmount(payload.price),
                max_participants: maxParticipants,
                duration: (
                    Number.parseInt(payload.duration) *
                    60 *
                    1000000000
                ).toString(),
            },
            '30000000000000',
            utils.format.parseNearAmount(
                new BN(payload.price).mul(new BN(maxParticipants)).toString()
            )
        );
    }

    static async submitWork(payload: {
        taskId: string;
        proof: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.submit_work(
            {
                task_id: payload.taskId,
                proof: payload.proof,
            },
            '30000000000000',
            utils.format.parseNearAmount('0.01')
        );
    }

    static async approveWork(payload: {
        taskId: string;
        workerId: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.approve_work({
            task_id: payload.taskId,
            worker_id: payload.workerId,
        });
    }

    static async rejectWork(payload: {
        taskId: string;
        workerId: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.reject_work({
            task_id: payload.taskId,
            worker_id: payload.workerId,
        });
    }

    static async markATaskAsCompleted(payload: {
        taskId: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.mark_task_as_completed({
            task_id: payload.taskId,
        });
    }

    static async fetchAvailableJobs(): Promise<Job[]> {
        const res = await BlockChainConnector.instance.contract.available_tasks(
            {
                from_index: 0,
                limit: 100,
            }
        );

        return res.map((raw: any) =>
            JobService.mapToModel({
                task_id: raw[0],
                ...raw[1],
            })
        );
    }

    static async fetchJobByAccountId(accountId?: string): Promise<Job[]> {
        const res = await BlockChainConnector.instance.contract.current_tasks({
            account_id:
                accountId ?? BlockChainConnector.instance.account.accountId,
            from_index: 0,
            limit: 100,
        });

        return res.map((raw: any) =>
            JobService.mapToModel({
                task_id: raw[0],
                ...raw[1],
            })
        );
    }

    static async fetchJobCompletedByAccountId(
        accountId?: string
    ): Promise<Job[]> {
        const res = await BlockChainConnector.instance.contract.completed_tasks(
            {
                account_id:
                    accountId ?? BlockChainConnector.instance.account.accountId,
                from_index: 0,
                limit: 100,
            }
        );

        return res.map((raw: any) =>
            JobService.mapToModel({
                task_id: raw[0],
                ...raw[1],
            })
        );
    }

    private static mapToModel(raw: any): Job {
        return {
            taskId: raw.task_id,
            owner: raw.owner,
            title: raw.title,
            description: raw.description,
            maxParticipants: raw.max_participants,
            price: utils.format.formatNearAmount(raw.price),
            proposals: raw.proposals.map((p: any) => ({
                accountId: p.account_id,
                proofOfWork: p.proof_of_work,
                isApproved: p.is_approved,
            })),
            availableUntil: Number.parseInt(raw.available_until.substr(0, 13)),
        };
    }
}
