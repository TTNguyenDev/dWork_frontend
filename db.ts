import Dexie, { Table } from 'dexie';
import { Proposal } from './models/types/jobType';

type Task = {
    id: number;
    taskId: string;
    owner: string;
    title: string;
    description: string;
    maxParticipants: number;
    price: number;
    availableUntil: number;
    categoryId: string;
    proposals: Proposal[];
    createdAt: number;
};

export class MySubClassedDexie extends Dexie {
    tasks!: Table<Task>;
    accountTasks!: Table<Task>;
    accountCompletedTasks!: Table<Task>;

    constructor() {
        super('d_work');
        this.version(1).stores({
            tasks: 'id, price',
            accountTasks: 'id, price',
            accountCompletedTasks: 'id, price',
        });
    }
}

export const db = new MySubClassedDexie();
