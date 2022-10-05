export enum ProposalStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Reporting = 'Reporting',
  RejectedByAdmin = 'Rejected By Admin',
}

export type ProposalStatusRejected = {
  Rejected?: {
    reason: string;
    reject_at: string;
    report_id?: string;
  };
  RejectedByAdmin?: {
    account_id: string;
  };
};

export type ProposalDto = {
  task_id?: string;
  account_id: string;
  submit_time: number;
  proof_of_work: string;
  status: ProposalStatus | ProposalStatusRejected;
};
