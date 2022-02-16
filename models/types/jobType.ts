import BN from 'bn.js';

export enum JobStatus {
    READY_FOR_APPLY = 'ReadyForApply',
    FOUND_WORKER = 'FoundWorker',
    WORKER_SUBMITTED = 'WorkSubmitted',
    PAYOUT = 'Payout',
    DELETED = 'Deleted',
    PENDING = 'Pending',
}

export type Proposal = {
    accountId: string;
    coverLetter: string;
    price: string;
    totalReceived: string;
    proofOfWork: string;
};

export type Job = {
    taskId: string;
    owner: string;
    title: string;
    description: string;
    maxParticipants: number;
    price: string;
    proposals: Proposal[];
    status: JobStatus;
};
