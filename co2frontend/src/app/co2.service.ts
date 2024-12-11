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

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    });
  }

  
  getAllCo2(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllco2`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    });
  }


  getCo2ByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/co2/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    });
  }
}
