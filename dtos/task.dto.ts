export type TaskDto = {
  id: string;
  owner: string;
  title: string;
  description: string;
  max_participants: number;
  price: string;
  budget: string;
  proposals: string[];
  created_at: number;
  last_rejection_published_at?: number;
  submit_available_until: number;
  category_id: string;
};

export type TaskCreateInput = {
  title: string;
  description: string;
  price: string;
  max_participants: number;
  duration: string;
  category_id: string;
};
