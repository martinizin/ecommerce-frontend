import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MisVentasService {
  private baseUrl = 'https://backk.fly.dev/api/v1/detallefactura';

  constructor(private http: HttpClient) { }

  private obtenerToken(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  getFacturaById(): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/listar`, { headers });
  }
  listarVentaporId(): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/listar`, { headers });
  }
  // En MisVentasService
verificarVenta(id: number): Observable<any> {
  const token = this.obtenerToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post(`${this.baseUrl}/verify/${id}`, {}, { headers });
}

}
