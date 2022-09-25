export type LockedBalance = {
  amount: string;
  release_at: number;
};

export type Account = {
  account_id: string;
  bio: string;
  total_spent: string;
  total_earn: string;
  balance: string;
  locked_balance: Record<string, LockedBalance>;
  current_jobs: string[];
  completed_jobs: string[];
  pos_point: number;
  neg_point: number;
};