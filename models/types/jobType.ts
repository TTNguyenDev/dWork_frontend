export enum TaskStatus {
    AVAILABLE = 'available',
    COMPLETED = 'completed',
    EXPIRED = 'expired',
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
    price: number;
    proposals: Proposal[];
    availableUntil: number;
    categoryId: string;
};

export type TaskType = 'available' | 'processing' | 'completed' | 'pending';
