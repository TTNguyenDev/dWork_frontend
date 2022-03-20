export enum TaskStatus {
    READY_FOR_APPLY = 'ReadyForApply',
    FOUND_WORKER = 'FoundWorker',
    WORKER_SUBMITTED = 'WorkSubmitted',
    PAYOUT = 'Payout',
    DELETED = 'Deleted',
    PENDING = 'Pending',
}

export type Proposal = {
    accountId: string;
    proofOfWork: string;
    isApproved: boolean;
};

export type Task = {
    id: number;
    taskId: string;
    owner: string;
    title: string;
    description: string;
    maxParticipants: number;
    price: string;
    proposals: Proposal[];
    availableUntil: number;
    categoryId: string;
};

export type TaskType = 'available' | 'processing' | 'completed' | 'pending';
