import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
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
  private verifyAccountUrl:string;
  private resetPasswordUrl:string;
  constructor(private _router: Router,
    private http: HttpClient
  ) {
    this.baseUrl = 'https://backk.fly.dev';
    this.verifyAccountUrl = 'https://backk.fly.dev/verify-account';
    this.resetPasswordUrl = 'https://backk.fly.dev/reset-password'
  }

  register(formValue: any) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/create`, formValue)); // Enviar el formulario al endpoint de registro
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
  
  verifyAccount(email: string, otp: string): Observable<any> {
    const body = { email, otp };
    return this.http.put<any>(this.verifyAccountUrl, body);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.httpClient.post<any>('https://backk.fly.dev/send-reset', { email })
      .pipe(
        catchError(error => {
          throw error; // Puedes manejar el error aquí o simplemente lanzarlo para manejarlo en el componente
        })
      );
  }

  // resetPassword(email: string, password: string): Observable<any> {
  //   return this.httpClient.post<any>('https://backk.fly.dev/reset-password', { email, password })
  //     .pipe(
  //       catchError(error => {
  //         throw error; // Puedes manejar el error aquí o simplemente lanzarlo para manejarlo en el componente
  //       })
  //     );
  // }
  resetPassword(email: string, password: string, newPassword: string): Observable<any> {
    const body = { password: newPassword }; // Enviar la nueva contraseña en el cuerpo
    const url = `${this.resetPasswordUrl}?email=${email}&password=${password}`;
    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  resetPasswordNew(email: string, hashedPassword: string, newPassword: string): Observable<any> {
    const body = { password: newPassword };
    return this.http.post<any>(`${this.resetPasswordUrl}?email=${email}&password=${hashedPassword}`, body);
  }
}
