import BN from 'bn.js';
import { Container } from '../core';
import { ApiGetListInput } from '../core/types';
import { TaskCreateInput, TaskDto } from '../dtos';

enum ContractMethods {
  // commands
  new_task = 'new_task',
  approve_work = 'approve_work',
  reject_work = 'reject_work',
  mark_task_as_completed = 'mark_task_as_completed',
  submit_work = 'submit_work',
  report_rejection = 'report_rejection',
  claim = 'claim',
  // queries
  available_tasks = 'available_tasks',
  current_tasks = 'current_tasks',
  completed_tasks = 'completed_tasks',
  task_by_id = 'task_by_id',
  tasks_by_ids = 'tasks_by_ids',
  maximum_participants_per_task = 'maximum_participants_per_task',
}

export const TaskApi = Object.freeze({
  async create(payload: TaskCreateInput): Promise<void> {
    console.log('Create task payload: ', payload);
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.new_task,
      args: {
        ...payload,
        price: `${Number(payload.price) * 1000}000000000000000000000`,
      },
      attachedDeposit: new BN(
        `${
          payload.max_participants * Number(payload.price) * 1000
        }000000000000000000000`
      ),
    });
  },
  ///
  async getList(payload: ApiGetListInput): Promise<TaskDto[]> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.available_tasks,
      args: payload,
    });

    let tasks = res.map((value: any) => {
      return {
        id: value[0],
        ...value[1],
      };
    });

    console.log('tinguyen view', res, tasks);

    return tasks;
  },
});
