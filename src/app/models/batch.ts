// batch.ts
export interface Batch {
  batchId: number;
  batchName: string;
  calendarId?: number;
  createdOn: string;
  isActive: boolean;
  courseName?: string;   // we’ll join in API DTO if available
  startDate?: string;
  endDate?: string;
  status?: string;       // "Requested" | "Approved" | "Rejected" | null
}
