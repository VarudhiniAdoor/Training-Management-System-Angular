export interface Feedback {
  feedbackId?: number;
  feedbackText: string;
  rating: number;
  submittedOn?: string;
  batchId: number;
  userId: number;
}
