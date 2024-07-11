import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetContrasenaService {
  private apiUrl = 'https://backk.fly.dev';

  constructor(private http: HttpClient) { }

  sendResetLink(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-reset`, { email, password });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password?email=${encodeURIComponent(email)}`, { password: newPassword });
  }
}
