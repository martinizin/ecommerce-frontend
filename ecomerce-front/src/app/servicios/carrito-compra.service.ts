import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoCompraService {
  private baseUrl: string = 'http://localhost:8095/api/v1/producto';
  private carrito = new BehaviorSubject<any[]>([]);
  
  carrito$ = this.carrito.asObservable();

  constructor(private httpClient: HttpClient) {}

  obtenerToken(): string {
    return localStorage.getItem('token') || '';
  }

  getHeaders(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  agregarProducto(producto: any): void {
    const currentCart = this.carrito.value;
    currentCart.push(producto);
    this.carrito.next(currentCart);
  }
  
  quitarProducto(producto: any): void {
    const currentCart = this.carrito.value;
    const index = currentCart.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      currentCart.splice(index, 1);
      this.carrito.next(currentCart);
    }
  }

  obtenerProductoPorId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}

  
