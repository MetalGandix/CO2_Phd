import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      return true; // Permetti l'accesso
    } else {
      alert('La pagina può essere vista solo dagli autenticati.');
      this.router.navigate(['/login']); // Reindirizza al login
      return false; // Blocca l'accesso
    }
  }
}
