import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentaBancariaService {
  private baseUrl = 'http://localhost:8095/api/v1/cuenta';
  private productoBaseUrl = 'http://localhost:8095/api/v1/producto';

  constructor(private http: HttpClient) { }

  obtenerToken(): string {
    return localStorage.getItem('token') || '';
  }

  getHeaders(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  crearCuentaBancaria(cuenta: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear`, cuenta, {
      headers: this.getHeaders(),
    });
  }

  listarCuentasBancarias(): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/listar`, { headers });
  }
  
  listarCuentasBancariasPorId(id:number): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  subirComprobante(idProducto: number, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', archivo);
    return this.http.post<any>(`${this.productoBaseUrl}/${idProducto}/uploadPaymentProof`, formData, {
      headers: this.getHeaders(),
    });
  }
}
