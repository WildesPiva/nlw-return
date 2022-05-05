export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface Feedback {
  id: string;
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  get: () => Promise<Feedback[]>;
}
