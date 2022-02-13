import BN from 'bn.js';
import { Job } from './jobType';

export enum AccountTypes {
    REQUESTER = 'Requester',
    WORKER = 'Worker',
}

export type Account = {
    accountId: string;
    type: AccountTypes;
    totalStake: BN;
    currentRequests: number;
    completedJobs: Job[]
}

