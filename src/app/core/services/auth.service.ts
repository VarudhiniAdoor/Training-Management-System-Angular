import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiBaseUrl}/api/auth`; // expected endpoints: /login & /register
  private authSubject = new BehaviorSubject<AuthResponse | null>(this.getAuthFromStorage());

  auth$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest): Observable<any> {
    // backend may return created user or message; adapt if needed
    return this.http.post(`${this.api}/register`, payload);
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, payload).pipe(
      tap(res => {
        this.setAuthToStorage(res);
        this.authSubject.next(res);
      })
    );
  }

  logout() {
    localStorage.removeItem('tms_auth');
    this.authSubject.next(null);
  }

  getAccessToken(): string | null {
    const auth = this.getAuthFromStorage();
    return auth ? auth.accessToken : null;
  }

  getCurrentUser(): AuthResponse | null {
    return this.getAuthFromStorage();
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private setAuthToStorage(res: AuthResponse) {
    localStorage.setItem('tms_auth', JSON.stringify(res));
  }

  private getAuthFromStorage(): AuthResponse | null {
    const raw = localStorage.getItem('tms_auth');
    return raw ? JSON.parse(raw) as AuthResponse : null;
  }
}
export interface User {
  username: string;
  role: string;
}