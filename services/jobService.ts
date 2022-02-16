import { Job } from '../models/types/jobType';
import { BlockChainConnector } from '../utils/blockchain';
import { utils } from 'near-api-js';

export class JobService {
    static async createTask(payload: {
        title: string;
        description: string;
        price: string;
        maxParticipants: string;
    }): Promise<void> {
        console.log({
            title: payload.title,
            description: payload.description,
            price: utils.format.parseNearAmount(payload.price),
            max_participants: Number.parseInt(payload.maxParticipants),
        });
        await BlockChainConnector.instance.contract.new_task({
            title: payload.title,
            description: payload.description,
            price: utils.format.parseNearAmount(payload.price),
            max_participants: Number.parseInt(payload.maxParticipants),
        });
    }

    static async submitProposal(payload: {
        taskId: string;
        coverLetter: string;
        price: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.submit_proposal({
            task_id: payload.taskId,
            cover_letter: payload.coverLetter,
            price: utils.format.parseNearAmount(payload.price),
        });
    }

    static async selectProposal(payload: {
        taskId: string;
        index: number;
        totalReceived: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.select_proposal(
            {
                task_id: payload.taskId,
                index: payload.index,
            },
            '30000000000000',
            payload.totalReceived
        );
    }

    static async submitWork(payload: {
        taskId: string;
        url: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.submit_work({
            task_id: payload.taskId,
            url: payload.url,
        });
    }

    static async validateWork(payload: { taskId: string }): Promise<void> {
        await BlockChainConnector.instance.contract.validate_work({
            task_id: payload.taskId,
        });
    }

    static async rejectWork(payload: { taskId: string }): Promise<void> {
        await BlockChainConnector.instance.contract.reject_work({
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
                coverLetter: p.cover_letter,
                price: utils.format.formatNearAmount(p.price),
                totalReceived: utils.format.formatNearAmount(p.total_received),
                proofOfWork: p.proof_of_work,
            })),
            status: raw.status.type,
        };
    }
}
