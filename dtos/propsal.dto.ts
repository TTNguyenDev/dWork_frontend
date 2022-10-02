export enum ProposalStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  RejectedByAdmin = 'RejectedByAdmin',
}

export type ProposalDto = {
  account_id: string;
  submit_time: number;
  proof_of_work: string;
  status:
    | ProposalStatus
    | {
        Rejected: {
          reason: string;
          reject_at: string;
          report_id?: string;
        };
      };
};
