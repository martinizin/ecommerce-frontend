import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListadoProductosService {
  private baseUrl: string = 'http://localhost:8095/api/v1/producto';

  constructor(private httpClient: HttpClient) {}

  listarProductos(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any[]>(`${this.baseUrl}/listar`, { headers });
    
  }

  comprarProducto(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(`${this.baseUrl}/comprar/${id}`, {}, { headers });
  }
}
