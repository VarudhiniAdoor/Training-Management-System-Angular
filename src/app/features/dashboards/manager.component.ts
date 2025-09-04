import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-manager',
  template: `
    <div class="card">
      <h2>Manager Dashboard</h2>
      <p>Manage enrollment approvals, view team training, and post feedback summaries.</p>
    </div>
  `
})
export class ManagerComponent {}
