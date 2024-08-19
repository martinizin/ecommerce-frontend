import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentaBancariaService {
  private baseUrl = 'https://backcom.fly.dev/api/v1/cuenta';
  private productoBaseUrl = 'https://backcom.fly.dev/api/v1/producto/uploadPaymentProof';

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
  verificarCuentaExistente(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verificar?username=${username}`, {
      headers: this.getHeaders(),
    });
  }

  subirComprobante(productos: number[], valorTotal: number, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', archivo);
  
    // Crear el objeto de datos y convertirlo a string JSON
    const datos = JSON.stringify({
      productos: productos,
      valorTotal: valorTotal
    });
    formData.append('compraRequest', new Blob([datos], { type: 'application/json' }));
  
    return this.http.post<any>(this.productoBaseUrl, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.obtenerToken()}`
      })
    });
  }
}
