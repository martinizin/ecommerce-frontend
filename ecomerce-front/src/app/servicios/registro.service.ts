import { Injectable, inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  
  private httpClient=inject(HttpClient);
  private baseUrl:string;

  constructor() { 
    this.baseUrl='http://localhost:8095';
  }
  register(formValue:any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/create`,formValue)
    )

    
    
}
 login(formValue:any){
  return firstValueFrom(
    this.httpClient.post<any>(`${this.baseUrl}/login`,formValue)
  )
  }
   }
  
