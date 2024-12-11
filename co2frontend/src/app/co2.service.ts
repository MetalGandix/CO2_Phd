import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Co2Service {
  private apiUrl = 'http://localhost:3000/data'

  constructor(private http: HttpClient) {}

  saveCo2Data(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/co2`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`, // Prefisso Bearer richiesto
      },
    });
  }
}
