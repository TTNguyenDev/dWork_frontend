import BN from 'bn.js';
import { Task } from './jobType';

export enum AccountTypes {
    REQUESTER = 'Requester',
    WORKER = 'Worker',
}

export type Account = {
    accountId: string;
    bio: string;
    type: AccountTypes;
    totalStake: BN;
    currentRequests: number;
    completedJobs: Task[];
};
