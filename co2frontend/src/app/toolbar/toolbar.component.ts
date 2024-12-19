import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../services/auth-state.service'; // Importa il servizio di stato condiviso
import { filter } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  imports: [FormsModule, RouterLink, RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  userEmail: string | null = null;

  constructor(private router: Router, private authStateService: AuthStateService) {}

  ngOnInit() {
    // Sottoscrivi agli osservabili del servizio di autenticazione
    this.authStateService.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isAuthenticated = isAuthenticated)
    );
    this.authStateService.isAdmin$.subscribe(
      (isAdmin) => (this.isAdmin = isAdmin)
    );
    this.authStateService.userEmail$.subscribe(
      (email) => (this.userEmail = email)
    );

    // Ascolta i cambiamenti di rotta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthentication();
      });

    // Esegui un controllo iniziale
    this.checkAuthentication();
  }

  checkAuthentication() {
    // Verifica lo stato dell'autenticazione da sessionStorage o il servizio
    const token = sessionStorage.getItem('authToken');
    const role = sessionStorage.getItem('role');
    const email = sessionStorage.getItem('email');

    this.isAuthenticated = !!token;
    this.isAdmin = role === 'admin';
    this.userEmail = email;
  }

  logout() {
    sessionStorage.clear(); // Cancella i dati di sessione
    this.authStateService.clearAuthState(); // Aggiorna lo stato tramite il servizio
    this.router.navigate(['/login']); // Reindirizza al login
  }

  toggleMenu(nav: HTMLElement, hamburger: HTMLElement) {
    nav.classList.toggle('active'); // Mostra o nasconde il menu
    hamburger.classList.toggle('active'); // Anima l'icona hamburger
  }
}
