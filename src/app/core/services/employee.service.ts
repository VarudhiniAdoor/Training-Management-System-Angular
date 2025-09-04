import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Batch } from '../../models/batch';
import { Enrollment } from '../../models/enrollment';
import { Feedback } from '../../models/feedback';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getActiveBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${this.api}/api/atches`);
  }

  getMyEnrollments(userId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.api}/api/enrollments/user/${userId}`);
  }

  requestEnrollment(userId: number, batchId: number): Observable<any> {
    return this.http.post(`${this.api}/api/enrollments`, { userId, batchId });
  }

  submitFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.api}/api/feedback`, feedback);
  }
}
