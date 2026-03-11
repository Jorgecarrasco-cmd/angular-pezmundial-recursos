import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  UserResponse,
} from '../interfaces/auth.interface';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { PaginatedResponse } from '../../common/interfaces/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  private _user = signal<User | null>(this.getUserFromToken());

  user = this._user.asReadonly();

  isAuthenticated = computed(() => this._user() !== null);

  register(dto: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, dto)
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  login(dto: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, dto)
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);

    const user = jwtDecode<User>(token);

    this._user.set(user);
  }

  private getUserFromToken(): User | null {
    const token = localStorage.getItem('token');

    if (!token) return null;

    try {
      return jwtDecode<User>(token);
    } catch {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this._user.set(null);
  }

  getUsers(page = 1, limit = 12) {
    return this.http.get<PaginatedResponse<UserResponse>>(`${this.apiUrl}/auth`, {
      params: {
        page,
        limit,
      },
    });
  }
}
