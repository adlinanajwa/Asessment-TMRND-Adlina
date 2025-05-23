// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl, { username, password });
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
