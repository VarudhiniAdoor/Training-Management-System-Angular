import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-employee',
  template: `
    <div class="card">
      <h2>Employee Dashboard</h2>
      <p>Welcome! After authentication, you'll see the course calendar here and enroll in active batches.</p>
      <ul class="small">
        <li>Upcoming: calendar view</li>
        <li>Enroll to active batches</li>
        <li>Your enrollments & feedback</li>
      </ul>
    </div>
  `
})
export class EmployeeComponent {
  
}


