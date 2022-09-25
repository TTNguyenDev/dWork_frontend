import { Container } from '../core';
import { ApiGetListInput } from '../core/types';
import { TaskDto } from '../dtos';

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
  commands: {
    async create(payload: {
      title: string;
      description: string;
      price: string;
      max_participants: string;
      duration: string;
      category_id: string;
    }): Promise<void> {
      await Container.bcConnector.callChangeMethod({
        methodName: ContractMethods.new_task,
        args: payload,
      });
    },
  },
  queries: {
    async getList(payload: ApiGetListInput): Promise<TaskDto[]> {
      const res = await Container.bcConnector.callViewMethod({
        methodName: ContractMethods.available_tasks,
        args: payload,
      });
      return res;
    },
  },
});
