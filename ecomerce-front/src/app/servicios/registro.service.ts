import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private userData: any = null;
  userLoginOn(): any {
    throw new Error('Method not implemented.');
  }
  
  private httpClient = inject(HttpClient);
  private baseUrl: string;
  
  constructor(private _router: Router) {
    this.baseUrl = 'https://backcom.fly.dev';
  }

  register(formValue: any) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/create`, formValue));
  }

  login(formValue: any) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/login`, formValue)).then(response => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.Username);
        localStorage.setItem('rol',response.Roles[0]);
        localStorage.setItem('id',response.id)
      }
      return response;
    });
  }

  logoutUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    this._router.navigate(['/login']);
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUsername() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username');
    }
    return null;
  }
  setUserData(userData: any) {
    this.userData = userData;
  }
  getRoles(): string[] {
    return this.userData ? this.userData.Roles : [];
  }

  loggedIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  verifyOtp(email: string, otp: string) {
    const url = `${this.baseUrl}/verify-account?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;
    return firstValueFrom(this.httpClient.put(url, {}, { responseType: 'text' }));
  }
  
  requestPasswordReset(email: string): Observable<any> {
    return this.httpClient.post<any>('https://backcom.fly.dev/send-reset', { email })
      .pipe(
        catchError(error => {
          throw error; // Puedes manejar el error aquí o simplemente lanzarlo para manejarlo en el componente
        })
      );
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>('https://backcom.fly.dev/reset-password', { email, password })
      .pipe(
        catchError(error => {
          throw error; // Puedes manejar el error aquí o simplemente lanzarlo para manejarlo en el componente
        })
      );
  }
}
