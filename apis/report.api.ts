import { Container } from '../core';
import { ApiGetListInput } from '../core/types';
import {
  ReportDto,
  ReportCreateInput,
  ReportApproveInput,
  ReportRejectInput,
} from '../dtos';

enum ContractMethods {
  report_rejection = 'report_rejection',
  approve_report = 'approve_report',
  reject_report = 'reject_report',
  ///
  get_reports = 'get_reports',
}

export const ReportApi = Object.freeze({
  async create(payload: ReportCreateInput): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.report_rejection,
      args: payload,
    });
  },
  async approve(payload: ReportApproveInput): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.approve_report,
      args: payload,
    });
  },
  async reject(payload: ReportRejectInput): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.reject_report,
      args: payload,
    });
  },
  ///
  async getList(payload: ApiGetListInput): Promise<ReportDto[]> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.get_reports,
      args: payload,
    });
    return res;
  },
});
