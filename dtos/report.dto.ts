export enum ReportStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export type ReportDto = {
  report_id: string;
  account_id: string;
  task_id: string;
  report: string;
  status: ReportStatus;
};

export type ReportCreateInput = {
  task_id: string;
  report: string;
};

export type ReportApproveInput = { report_id: string };

export type ReportRejectInput = { report_id: string };
