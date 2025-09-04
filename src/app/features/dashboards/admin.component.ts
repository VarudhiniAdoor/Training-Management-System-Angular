import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-admin',
  template: `
    <div class="card">
      <h2>Admin Dashboard</h2>
      <p>Manage users, roles, courses, calendars, batches, feedback, etc.</p>
    </div>
  `
})
export class AdminComponent {}
