import { Task, TaskStatus } from '../models/types/jobType';
import { BlockChainConnector } from '../utils/blockchain';
import { utils } from 'near-api-js';
import BN from 'bn.js';
import { db } from '../db';

export const FETCH_TASKS_LIMIT = 1;

export type CreateTaskInput = {
    title: string;
    description: string;
    price: string;
    maxParticipants: string;
    duration: number;
    categoryId: string;
};

export enum TaskSortTypes {
    NEWEST = 'newest',
    OLDEST = 'oldest',
    HIGH_PRICE = 'high_price',
    LOW_PRICE = 'low_price',
}

export class TaskService {
    static async createTask(payload: CreateTaskInput): Promise<void> {
        const maxParticipants = Number.parseInt(payload.maxParticipants);
        await BlockChainConnector.instance.contract.new_task(
            {
                title: payload.title,
                description: payload.description,
                price: utils.format.parseNearAmount(payload.price),
                max_participants: maxParticipants,
                duration: (payload.duration * 1000000).toString(),
                category_id: payload.categoryId,
            },
            '30000000000000',
            utils.format.parseNearAmount(
                new BN(payload.price).mul(new BN(maxParticipants)).toString()
            )
        );
    }

    static async submitWork(payload: {
        taskId: string;
        proof: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.submit_work(
            {
                task_id: payload.taskId,
                proof: payload.proof,
            },
            '30000000000000',
            utils.format.parseNearAmount('0.01')
        );
    }

    static async approveWork(payload: {
        taskId: string;
        workerId: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.approve_work({
            task_id: payload.taskId,
            worker_id: payload.workerId,
        });
    }

    static async rejectWork(payload: {
        taskId: string;
        workerId: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.reject_work({
            task_id: payload.taskId,
            worker_id: payload.workerId,
        });
    }

    static async markATaskAsCompleted(payload: {
        taskId: string;
    }): Promise<void> {
        await BlockChainConnector.instance.contract.mark_task_as_completed({
            task_id: payload.taskId,
        });
    }

    static async fetchAvailableJobs(): Promise<Task[]> {
        const res = await BlockChainConnector.instance.contract.available_tasks(
            {
                from_index: 0,
                limit: 12,
            }
        );

        return res.map((raw: any) =>
            TaskService.mapToModel({
                task_id: raw[0],
                ...raw[1],
            })
        );
    }

    static async fetchJobsInfinity({
        offset = 0,
        fromBlockId,
        filter,
    }: {
        offset?: number;
        filter?: {
            status?: TaskStatus;
            sort?: string;
            categories?: string[];
            title?: string;
            owner?: string;
        };
        fromBlockId?: number;
    }): Promise<Task[]> {
        let query;

        switch (filter?.sort) {
            case TaskSortTypes.HIGH_PRICE:
                query = db.tasks.orderBy('price').reverse();
                break;
            case TaskSortTypes.LOW_PRICE:
                query = db.tasks.orderBy('price');
                break;
            case TaskSortTypes.OLDEST:
                query = db.tasks.orderBy('id');
                break;
            case TaskSortTypes.NEWEST:
            default:
                query = db.tasks.orderBy('id').reverse();
        }

        if (filter) {
            if (filter.categories) {
                query.filter((item) =>
                    filter.categories!.includes(item.categoryId)
                );
            }

            if (filter.title) {
                query.filter((item) =>
                    item.title
                        .toLocaleLowerCase()
                        .includes(filter.title!.toLowerCase())
                );
            }

            if (filter.owner) {
                query.filter((item) => item.owner === filter.owner);
            }
        }

        const queryRes = await query.toArray();

        if (filter?.status === TaskStatus.AVAILABLE) {
            const ids = queryRes.map((q) => q.taskId);

            let isCompleted = false;

            let offset = 0;
            if (fromBlockId) {
                offset = queryRes.findIndex((q) => q.id === fromBlockId) + 1;
            }

            const LIMIT = 20;

            let availableTasks: Task[] = [];

            while (!isCompleted) {
                const batchIds = ids.slice(offset, (offset += LIMIT));
                const res =
                    await BlockChainConnector.instance.contract.tasks_by_ids({
                        ids: batchIds,
                    });

                const tasks: Task[] = res
                    .map((raw: any, index: number) =>
                        TaskService.mapToModel({
                            task_id: raw[0],
                            ...raw[1],
                        })
                    )
                    .filter(
                        (item: Task) =>
                            item.proposals.filter((p) => p.isApproved).length <
                                item.maxParticipants &&
                            item.availableUntil > Date.now()
                    );

                const validTasks = tasks.slice(
                    0,
                    FETCH_TASKS_LIMIT - availableTasks.length
                );

                availableTasks = [...availableTasks, ...validTasks];

                if (
                    availableTasks.length === FETCH_TASKS_LIMIT ||
                    offset > ids.length - 1
                )
                    isCompleted = true;
            }

            return availableTasks;
        }

        return queryRes;
    }

    static async fetchJobByAccountId(accountId?: string): Promise<Task[]> {
        const res = await BlockChainConnector.instance.contract.current_tasks({
            account_id:
                accountId ?? BlockChainConnector.instance.account.accountId,
            from_index: 0,
            limit: 50,
        });

        return res.map((raw: any) =>
            TaskService.mapToModel({
                task_id: raw[0],
                ...raw[1],
            })
        );
    }

    static async fetchJobCompletedByAccountId(
        accountId?: string
    ): Promise<Task[]> {
        const res = await BlockChainConnector.instance.contract.completed_tasks(
            {
                account_id:
                    accountId ?? BlockChainConnector.instance.account.accountId,
                from_index: 0,
                limit: 50,
            }
        );

        return res.map((raw: any) =>
            TaskService.mapToModel({
                task_id: raw[0],
                ...raw[1],
            })
        );
    }

    static async fetchTaskById(taskId?: string): Promise<Task> {
        const res = await BlockChainConnector.instance.contract.task_by_id({
            task_id: taskId,
        });

        return this.mapToModel({ ...res, task_id: taskId });
    }

    private static mapToModel(raw: any): Task {
        const arr = raw.task_id.split('_');
        const id = Number.parseInt(arr[arr.length - 1]);

        return {
            id,
            taskId: raw.task_id,
            owner: raw.owner,
            title: raw.title,
            description: raw.description,
            maxParticipants: raw.max_participants,
            price: Number(utils.format.formatNearAmount(raw.price)),
            proposals: raw.proposals?.map((p: any) => ({
                accountId: p.account_id,
                proofOfWork: p.proof_of_work,
                isApproved: p.is_approved,
            })),
            availableUntil: Number.parseInt(raw.available_until.substr(0, 13)),
            categoryId: raw.category_id,
        };
    }

    static async fetchAndCacheTasks(): Promise<void> {
        const firstRecord = (
            await db.tasks.toCollection().reverse().sortBy('id')
        )[0];

        console.log(
            'allRecords',
            await db.tasks.toCollection().reverse().sortBy('id')
        );

        const LIMIT = 20;
        let currentIndex = 0;
        let isCompleted = false;

        while (!isCompleted) {
            const res =
                await BlockChainConnector.instance.contract.available_tasks({
                    from_index: currentIndex,
                    limit: LIMIT,
                });

            if (res.length === 0) {
                isCompleted = true;
                break;
            }

            const data: Task[] = res.map((raw: any) =>
                TaskService.mapToModel({
                    task_id: raw[0],
                    ...raw[1],
                    proposals: [],
                })
            );

            if (firstRecord) {
                const firstRecordIndex = data.findIndex(
                    (item) => item.id === firstRecord.id
                );

                if (firstRecordIndex !== -1) {
                    await db.tasks.bulkAdd(data.slice(0, firstRecordIndex));
                    isCompleted = true;
                    break;
                }
            }

            await db.tasks.bulkAdd(data);

            currentIndex += LIMIT;

            console.log(data);
        }
    }
}
