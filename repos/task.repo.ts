import { TaskApi } from '../apis';
import { GetListInput } from '../core/types';
import { DB } from '../db';
import { TaskCreateInput, TaskDto } from '../dtos';

export class TaskRepo {
  static async create(input: TaskCreateInput): Promise<void> {
    await TaskApi.create(input);
  }

  static async getList(input: GetListInput<TaskDto>): Promise<TaskDto[]> {
    const { docs } = await DB.client.task.db.find({
      ...input,
      selector: input.selector ?? {},
    });

    return docs;
  }
}
