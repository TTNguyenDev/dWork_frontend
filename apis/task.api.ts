import { BN } from 'bn.js';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { RATIO_AMOUT_TO_CREATE_TASK } from '../constants';
import { Container } from '../core';
import { ApiGetListInput, TransactionAction } from '../core/types';
import {
  ApproveWorkInput,
  MarkTaskAsCompletedInput,
  ProposalDto,
  RejectWorkInput,
  SubmitWorkInput,
  TaskCreateInput,
  TaskDto,
} from '../dtos';
import { calcAmountToCreateTask } from '../utils';

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
      deposit: parseNearAmount(
        calcAmountToCreateTask({
          price: payload.price,
          max_participants: payload.max_participants,
        }).toString()
      )!,
    });

    await Container.bcConnector.transaction({
      actions,
      walletCallbackUrl:
        window.location.origin +
        '/account/' +
        Container.bcConnector.wallet.getAccountId(),
    });
  },
  async submitWork(payload: SubmitWorkInput): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.submit_work,
      args: payload,
      attachedDeposit: new BN(parseNearAmount('0.01')!),
    });
  },
  async approveWork(payload: ApproveWorkInput): Promise<void> {
    console.log('approve work', {
      methodName: ContractMethods.approve_work,
      args: payload,
    });
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.approve_work,
      args: payload,
    });
  },
  async rejectWork(payload: RejectWorkInput): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.reject_work,
      args: payload,
    });
  },
  async markTaskAsCompleted(payload: MarkTaskAsCompletedInput): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.mark_task_as_completed,
      args: payload,
    });
  },
  ///
  async getList(payload: ApiGetListInput): Promise<TaskDto[]> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.available_tasks,
      args: payload,
    });

    let tasks = res.map((value: any) => {
      return mapToTask({
        id: value[0],
        ...value[1],
      });
    });

    return tasks;
  },

  async get(payload: { task_id: string }): Promise<TaskDto> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.task_by_id,
      args: payload,
    });

    return mapToTask(res);
  },

  async getProposals(payload: { task_id: string }): Promise<ProposalDto[]> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.task_by_id,
      args: payload,
    });

    return res?.proposals;
  },
});

const mapToTask = (data: any) => ({
  ...data,
  available_until: Number(
    data.available_until.substring(0, data.available_until.length - 6)
  ),
});
