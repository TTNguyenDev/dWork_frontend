export type LockedBalance = {
  amount: string;
  release_at: number;
};

export type AccountDto = {
  account_id: string;
  bio: string;
  total_spent: string;
  total_earn: string;
  balance: {
    available: string;
    total: string;
  };
  locked_balance: Record<string, LockedBalance>;
  current_jobs: string[];
  completed_jobs: string[];
  pos_point: number;
  neg_point: number;
};
