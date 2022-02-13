import BN from 'bn.js';

export enum JobStatus {
    READY_FOR_APPLY = 'ReadyForApply'
}

export type Job = {
    taskId: string,
    owner: string,
    title: string,
    description: string,
    maxParticipants: number,
    hourRate: number,
    hourEstimation: number,
    proposals: {
        account_id: string,
        cover_letter: string,
        hour_estimation: number,
        total_received: BN,
        proof_of_work: string,
    }[],
    status: JobStatus
}

