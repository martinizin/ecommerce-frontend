import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {
  private baseUrl = 'http://localhost:8095/api/v1/producto';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.obtenerToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  private obtenerToken(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  list(): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/listar`, { headers });
  }

  listarporId(): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/listar`, { headers });
  }

  get(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  create(producto: FormData): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/crear`, producto, { headers });
  }

  update(id: number, producto: FormData): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.baseUrl}/${id}`, producto, { headers });
  }

  // Métodos para actualizar productos
  private idProductoActualizando = new BehaviorSubject<number>(0);

  // Se enviará el identificador adquirido al registro del usuario
  enviarIdentificador(dato: number): void {
    this.idProductoActualizando.next(dato);
  }

  // Recibe el identificador adquirido en registro
  obtenerIdentificador(): Observable<number> {
    return this.idProductoActualizando.asObservable();
  }

  delete(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}
