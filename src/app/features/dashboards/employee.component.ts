import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import { Batch } from '../../models/batch';
import { Enrollment } from '../../models/enrollment';

@Component({
  standalone: true,
  selector: 'app-employee',
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>Employee Dashboard</h2>
      <p>Welcome {{auth.getCurrentUser()?.username}}</p>

      <h3>Active Batches</h3>
      <div *ngFor="let b of batches" class="card small">
        <h4>{{b.batchName}} ({{b.courseName}})</h4>
        <p>{{b.startDate}} → {{b.endDate}}</p>
        <button *ngIf="!b.status" class="btn btn-primary" (click)="enroll(b.batchId)">Enroll</button>
        <span *ngIf="b.status">Status: {{b.status}}</span>
      </div>

      <h3>My Enrollments</h3>
      <ul>
        <li *ngFor="let e of enrollments">
          {{e.courseName}} - {{e.batchName}} ({{e.status}})
        </li>
      </ul>
    </div>
  `
})
export class EmployeeComponent implements OnInit {
  private service = inject(EmployeeService);
  auth = inject(AuthService);

  batches: Batch[] = [];
  enrollments: Enrollment[] = [];

  ngOnInit() {
    const userId = this.auth.getCurrentUser()?.userId!;
    this.service.getActiveBatches().subscribe(res => this.batches = res);
    this.service.getMyEnrollments(userId).subscribe(res => this.enrollments = res);
  }

  enroll(batchId: number) {
    const userId = this.auth.getCurrentUser()?.userId!;
    this.service.requestEnrollment(userId, batchId).subscribe(() => {
      alert('Enrollment request sent');
      this.ngOnInit(); // reload lists
    });
  }
}
