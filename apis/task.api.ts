import { BN } from 'bn.js';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { Container } from '../core';
import { ApiGetListInput, TransactionAction } from '../core/types';
import {
  ProposalDto,
  SubmitWorkInput,
  TaskCreateInput,
  TaskDto,
} from '../dtos';

enum ContractMethods {
  // commands
  new_task = 'new_task',
  approve_work = 'approve_work',
  reject_work = 'reject_work',
  mark_task_as_completed = 'mark_task_as_completed',
  submit_work = 'submit_work',
  report_rejection = 'report_rejection',
  claim = 'claim',
  new_category = 'new_category',

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
    const actions: TransactionAction[] = [];

    if (payload.new_category)
      actions.push({
        methodName: ContractMethods.new_category,
        args: {
          topic_name: payload.new_category,
        },
      });

    actions.push({
      methodName: ContractMethods.new_task,
      args: {
        ...payload,
        price: parseNearAmount(payload.price),
      },
    });

    await Container.bcConnector.transaction({
      actions,
    });
  },
  async submitWork(payload: SubmitWorkInput): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.submit_work,
      args: payload,
      attachedDeposit: new BN(parseNearAmount('0.01')!),
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

    return tasks;
  },

  async get(payload: { task_id: string }): Promise<TaskDto> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.task_by_id,
      args: payload,
    });

    return res;
  },

  async getProposals(payload: { task_id: string }): Promise<ProposalDto[]> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.task_by_id,
      args: payload,
    });

    console.log('getProposals', res);

    return res?.proposals;
  },
});
