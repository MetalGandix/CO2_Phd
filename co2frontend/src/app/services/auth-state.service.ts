import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Fornisce il servizio a livello di applicazione
})
export class AuthStateService {
  // Stato dell'autenticazione
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  private isAdminSource = new BehaviorSubject<boolean>(false);
  private userEmailSource = new BehaviorSubject<string | null>(null);

  // Osservabili pubblici
  isAuthenticated$ = this.isAuthenticatedSource.asObservable();
  isAdmin$ = this.isAdminSource.asObservable();
  userEmail$ = this.userEmailSource.asObservable();

  updateAuthState(isAuthenticated: boolean, isAdmin: boolean, email: string | null) {
    this.isAuthenticatedSource.next(isAuthenticated);
    this.isAdminSource.next(isAdmin);
    this.userEmailSource.next(email);
  }

  clearAuthState() {
    this.isAuthenticatedSource.next(false);
    this.isAdminSource.next(false);
    this.userEmailSource.next(null);
  }
}
