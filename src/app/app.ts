import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgIf],
  template: `
    <nav>
      <div>
        <a routerLink="/">TMS</a>
      </div>
      <div class="nav-right" *ngIf="auth.user$ | async as user; else guest">
        <span class="role-pill">{{ user.role }}</span>
        <span>{{ user.username }}</span>
        <button class="ghost" (click)="logout()">Logout</button>
      </div>
      <ng-template #guest>
        <div class="nav-right">
          <a routerLink="/auth/login">Login</a>
          <a routerLink="/auth/register">Register</a>

        </div>
      </ng-template>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  
  auth = inject(AuthService);
  logout() { this.auth.logout(); }
}
