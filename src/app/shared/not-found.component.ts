import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-not-found',
  template: `
    <div class="card center">
      <h2>Page not found</h2>
      <p class="small">The page you are looking for doesn't exist.</p>
      <a routerLink="/">Go home</a>
    </div>
  `,
  imports: [RouterLink]
})
export class NotFoundComponent {}
