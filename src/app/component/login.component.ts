import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="container mt-5" style="max-width:420px;">
      <h3>Login</h3>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input class="form-control" formControlName="username" />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" formControlName="password" />
        </div>

        <div *ngIf="error" class="alert alert-danger">{{error}}</div>

        <button class="btn btn-primary" [disabled]="form.invalid">Login</button>
        <a class="btn btn-link" routerLink="/auth/register">Register</a>
      </form>
    </div>
  `
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;
  returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const q = this.route.snapshot.queryParamMap.get('returnUrl');
    if (q) this.returnUrl = q;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.error = null;

    this.auth.login(this.form.value).subscribe({
      next: res => {
        // role-based redirect
        if (res.role === 'Administrator') this.router.navigate(['/admin']);
        else if (res.role === 'Manager') this.router.navigate(['/manager']);
        else this.router.navigate(['/employee']);
      },
      error: err => {
        console.error(err);
        this.error = err?.error?.message || 'Login failed. Check credentials.';
      }
    });
  }
}
