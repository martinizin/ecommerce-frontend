import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetContrasenaService {
  private apiUrl = 'http://localhost:8095/send-reset';

  constructor(private http: HttpClient) { }

  resetPassword(email: string, newPassword: string): Observable<any> {
    const body = { email: email, newPassword: newPassword };
    return this.http.post(this.apiUrl, body);
  }
}
