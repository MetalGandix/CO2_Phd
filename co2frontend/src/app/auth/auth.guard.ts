import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId'); // Recupera l'ID utente dal sessionStorage

    if (token) {
      // Controlla se il percorso richiede privilegi di admin
      if (route.routeConfig?.path === 'admin' && userId !== '1') {
        alert('Accesso riservato solo agli amministratori.');
        this.router.navigate(['/login']);
        return false;
      }
      return true; // Permetti l'accesso
    } else {
      alert('La pagina può essere vista solo dagli autenticati.');
      this.router.navigate(['/login']); // Reindirizza al login
      return false; // Blocca l'accesso
    }
  }
}
