import { TaskApi } from '../apis';
import { CategoryCache, TaskCache } from '../cache';
import { GetListInput } from '../core/types';
import { DB } from '../db';
import {
  ProposalDto,
  SubmitWorkInput,
  TaskCreateInput,
  TaskDto,
} from '../dtos';

export class TaskRepo {
  static async create(input: TaskCreateInput): Promise<void> {
    await TaskApi.create(input);
    await Promise.all([TaskCache.cache(), CategoryCache.cache()]);
  }

  static async submitWork(input: SubmitWorkInput): Promise<void> {
    await TaskApi.submitWork(input);
  }

  ///

  static async getList(input: GetListInput<TaskDto>): Promise<TaskDto[]> {
    const { docs } = await DB.client.task.db.find({
      ...input,
      selector: input.selector ?? {},
    });

    return docs;
  }

  static async get(id: string): Promise<TaskDto | undefined> {
    const { docs } = await DB.client.task.db.find({
      skip: 0,
      limit: 1,
      selector: {
        id: { $eq: id },
      },
    });

    return docs[0];
  }

  static async getProposals(taskId: string): Promise<ProposalDto[]> {
    return TaskApi.getProposals({ task_id: taskId });
  }
}
