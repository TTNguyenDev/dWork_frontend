import { ReportApi } from '../apis/report.api';
import { GetListInput } from '../core/types';
import {
  ReportApproveInput,
  ReportCreateInput,
  ReportDto,
  ReportRejectInput,
} from '../dtos';

export class ReportRepo {
  static async create(input: ReportCreateInput): Promise<void> {
    await ReportApi.create(input);
  }

  static async approve(input: ReportApproveInput): Promise<void> {
    await ReportApi.approve(input);
  }

  static async reject(input: ReportRejectInput): Promise<void> {
    await ReportApi.reject(input);
  }

  ///
  static async getList(input: GetListInput<ReportDto>): Promise<ReportDto[]> {
    return ReportApi.getList({
      from_index: input.skip ?? 0,
      limit: input.limit ?? 100,
    });
  }
}
