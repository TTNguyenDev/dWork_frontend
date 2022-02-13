import BN from 'bn.js';
import { Job } from '../models/types/jobType';
import { BlockChainConnector } from '../utils/blockchain';

export class JobService {
    static async createTask(payload: {
        title: string;
        description: string;
        hourRate: string;
        hourEstimation: string;
        maxParticipants: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.new_task(
            {
                title: payload.title,
                description: payload.description,
                hour_rate: Number.parseInt(payload.hourRate),
                hour_estimation: Number.parseInt(payload.hourEstimation),
                max_participants: Number.parseInt(payload.maxParticipants)
            }
        );
    }

    static async fetchJobs(): Promise<Job[]> {
        const res =
            await BlockChainConnector.instance.contract.available_tasks({
                from_index: 0,
                limit: 100
            });

        return res.map((raw: any) => JobService.mapToModel({
            task_id: raw[0],
            ...raw[1]
        }));
    }

    private static mapToModel(raw: any): Job {
        return {
            taskId: raw.task_id,
            owner: raw.owner,
            title: raw.title,
            description: raw.description,
            maxParticipants: raw.max_participants,
            hourRate: raw.hour_rate,
            hourEstimation: raw.hour_estimation,
            proposals: raw.proposals,
            status: raw.status.type
        };
    }
}
