export interface Enrollment {
  enrollmentId: number;
  employeeName: string;
  courseName: string;
  batchName: string;
  status: string;
  approvedBy?: string | null;
}
