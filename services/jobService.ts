import { Job } from '../models/types/jobType';
import { BlockChainConnector } from '../utils/blockchain';

export class JobService {
    static async fetchJobs(): Promise<Job[]> {
        const res =
            await BlockChainConnector.instance.contract.available_tasks({
                from_index: 0,
                limit: 10
            });

        return res.map((raw: any) => JobService.mapToModel(raw));
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
