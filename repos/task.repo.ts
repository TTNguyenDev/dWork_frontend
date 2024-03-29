import { TaskApi } from '../apis';
import { CategoryCache, TaskCache } from '../cache';
import { GetListInput } from '../core/types';
import { DB } from '../db';
import {
  ApproveWorkInput,
  MarkTaskAsCompletedInput,
  ProposalDto,
  RejectWorkInput,
  SubmitWorkInput,
  TaskCreateInput,
  TaskDto,
} from '../dtos';
import { AccountState } from '../store';

export class TaskRepo {
  static async create(input: TaskCreateInput): Promise<void> {
    await TaskApi.create(input);
    await Promise.all([TaskCache.cache(), CategoryCache.cache()]);
  }

  static async submitWork(input: SubmitWorkInput): Promise<void> {
    await TaskApi.submitWork(input);
  }

  static async approveWork(input: ApproveWorkInput): Promise<void> {
    await TaskApi.approveWork(input);
  }

  static async rejectWork(input: RejectWorkInput): Promise<void> {
    await TaskApi.rejectWork(input);
  }

  static async markTaskAsCompleted(
    input: MarkTaskAsCompletedInput
  ): Promise<void> {
    await TaskApi.markTaskAsCompleted(input);
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

  static async getMyProofs(): Promise<ProposalDto[]> {
    const accountId = AccountState.profile.value?.account_id;
    const current_jobs =
      AccountState.profile.value?.current_jobs.filter(
        (i) => !i.includes(accountId ?? '')
      ) ?? [];
    const res = (await TaskApi.getListByIds(current_jobs))
      .map((item) => {
        const data = item.proposals.find((p) => p.account_id === accountId);
        if (data)
          return {
            ...data,
            task_id: item.id,
          };
      })
      .filter((i) => !!i) as ProposalDto[];

    return res;
  }
}
