import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://backcom.fly.dev/api/users';

  getUser(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<any>(`${this.baseUrl}/me`, { params });
  }
}
