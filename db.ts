import Dexie, { Table } from 'dexie';
import { Proposal } from './models/types/jobType';

type Task = {
    id: number;
    taskId: string;
    owner: string;
    title: string;
    description: string;
    maxParticipants: number;
    price: string;
    availableUntil: number;
    categoryId: string;
    proposals: Proposal[];
};

export class MySubClassedDexie extends Dexie {
    // 'tasks' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    tasks!: Table<Task>;

    constructor() {
        super('myDatabase');
        this.version(1).stores({
            tasks: '++id', // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();
