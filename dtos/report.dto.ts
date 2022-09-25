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
