import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AgregarCategoriasService {

  private baseUrl = 'https://backk.fly.dev/api/v1/categoria';

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


  listarCategorias(): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/listar`, { headers });
  }
  

  agregarCategoria(nombre: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/add/${nombre}`, null, { headers, responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          console.error('Error al agregar categoría:', error);
          throw error;
        })
      );
  }

  eliminarCategoria(nombreCategoria: string): Observable<any> {
    const token = localStorage.getItem('token') || ''; // Obtener el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/delete/${nombreCategoria}`, null, { headers });
  }

  
  // Función que maneja la eliminación y recarga de la página
  
  
}
