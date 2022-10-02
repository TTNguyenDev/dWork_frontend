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
  available_until: string;
  category_id: string;
};

export type TaskCreateInput = {
  title: string;
  description: string;
  price: string;
  max_participants: number;
  duration: string;
  category_id: string;
  new_category?: string;
};

export type SubmitWorkInput = {
  task_id: string;
  proof: string;
};
