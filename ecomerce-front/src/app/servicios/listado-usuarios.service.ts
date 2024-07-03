import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListadoUsuariosService {
  private baseUrl = 'https://backcom.fly.dev';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      }
    }
    return new HttpHeaders();
  }
  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }


  listarUsuarios(): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/users`, { headers });
  }
  
  eliminarUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('token') || ''; // Obtener el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.baseUrl}/user/${id}`);
    
  }
}
