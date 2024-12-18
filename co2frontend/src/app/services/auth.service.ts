import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root', // Configurazione per la disponibilità globale
})
export class AuthService {
  private apiUrl = 'https://co2-unimore.glitch.me/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap((response: any) => {
        // Non è più necessario salvare il token qui, poiché viene fatto nel componente
        console.log('Login response:', response);
      })
    );
  }
  
}