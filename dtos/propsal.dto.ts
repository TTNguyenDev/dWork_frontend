export enum ProposalStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Reporting = 'Reporting',
  RejectedByAdmin = 'RejectedByAdmin',
}

export type ProposalStatusRejected = {
  Rejected: {
    reason: string;
    reject_at: string;
    report_id?: string;
  };
};

export type ProposalDto = {
  account_id: string;
  submit_time: number;
  proof_of_work: string;
  status: ProposalStatus | ProposalStatusRejected;
};
