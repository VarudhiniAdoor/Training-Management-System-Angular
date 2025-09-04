import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.auth.isLoggedIn()) {
      return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url }});
    }

    const expectedRole = route.data['role'] as string | undefined;
    const user = this.auth.getCurrentUser();
    if (expectedRole && user?.role !== expectedRole) {
      // unauthorized, send to their dashboard or login
      // redirect to role-appropriate page
      if (user?.role === 'Administrator') return this.router.createUrlTree(['/admin']);
      if (user?.role === 'Manager') return this.router.createUrlTree(['/manager']);
      return this.router.createUrlTree(['/employee']);
    }

    return true;
  }
}
