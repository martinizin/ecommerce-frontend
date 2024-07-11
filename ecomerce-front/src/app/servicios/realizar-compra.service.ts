import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealizarCompraService {
  private baseUrl = 'https://backk.fly.dev/api/v1/producto/';
  private imagenUrl = 'https://backk.fly.dev/api/v1/imagen/crear';

  constructor(private http: HttpClient) { }

  getProductDetails(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}${id}`);
  }

  subirComprobante(imagen: File): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticación faltante');
      return throwError('Token de autenticación faltante');
    }
  
    const formData: FormData = new FormData();
    formData.append('idimagen', 'bueno');
    formData.append('nombreimagen', 'gold');
    formData.append('file', imagen);
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(this.imagenUrl, formData, { headers });
  }
}
