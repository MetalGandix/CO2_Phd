import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [FormsModule, RouterLink, RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  isAuthenticated: boolean = false; // Stato di autenticazione
  isAdmin: boolean = false; // Stato amministratore

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthentication(); // Controlla lo stato di autenticazione durante l'inizializzazione
  }

  checkAuthentication() {
    if (typeof window !== 'undefined' && sessionStorage) {
      // Verifica se il token esiste
      const token = sessionStorage.getItem('authToken');
      const role = sessionStorage.getItem('role'); // Recupera il ruolo dell'utente

      this.isAuthenticated = !!token; // Converte il token in un booleano
      this.isAdmin = role === 'admin'; // Imposta isAdmin solo se il ruolo è 'admin'
    } else {
      // Imposta come non autenticato se non siamo nel contesto del browser
      this.isAuthenticated = false;
      this.isAdmin = false;
    }
  }

  logout() {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.removeItem('authToken'); // Rimuove il token dalla sessione
      sessionStorage.removeItem('role'); // Rimuove il ruolo dalla sessione
    }
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.router.navigate(['/login']); // Reindirizza al login
  }

  toggleMenu(nav: HTMLElement, hamburger: HTMLElement) {
    nav.classList.toggle('active'); // Mostra o nasconde il menu
    hamburger.classList.toggle('active'); // Anima l'icona hamburger
  }
}
