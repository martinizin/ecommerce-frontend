import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private httpClient = inject(HttpClient);
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:8095';
  }

  register(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/create`, formValue)
    );
  }

  login(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formValue)
      
    );
  }

  verifyOtp(email: string, otp: string) {
    const body = { email, otp }; // Crea un objeto con los datos a enviar en el cuerpo de la solicitud
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/verify-account`, body)
    );
  }
  
}
