export interface Feedback {
  feedbackId?: number;
  userId: number;
  batchId: number;
  rating: number;
  feedbackText: string;
}
