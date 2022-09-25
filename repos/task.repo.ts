import { RepoGetListInput } from '../core/types';
import { DB } from '../db';
import { TaskDto } from '../dtos';

export class TaskRepo {
  static async getList(input: RepoGetListInput<TaskDto>): Promise<TaskDto[]> {
    const { docs } = await DB.client.task.db.find({
      ...input,
      selector: input.selector ?? {},
    });

    return docs;
  }
}
