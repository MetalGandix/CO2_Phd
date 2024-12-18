import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [FormsModule, RouterLink, RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isAuthenticated: boolean = false; // Stato di autenticazione
  isAdmin: boolean = false; // Stato amministratore
  userEmail: string | null = null; // Email dell'utente autenticato

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthentication(); // Controlla lo stato di autenticazione durante l'inizializzazione
  }

  checkAuthentication() {
    if (typeof window !== 'undefined' && sessionStorage) {
      // Verifica se il token esiste
      const token = sessionStorage.getItem('authToken');
      const role = sessionStorage.getItem('role'); // Recupera il ruolo dell'utente
      const email = sessionStorage.getItem('email'); // Recupera l'email dell'utente

      this.isAuthenticated = !!token; // Converte il token in un booleano
      this.isAdmin = role === 'admin'; // Imposta isAdmin solo se il ruolo è 'admin'
      this.userEmail = email; // Imposta l'email dell'utente
    } else {
      // Imposta come non autenticato se non siamo nel contesto del browser
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.userEmail = null;
    }
  }

  logout() {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.removeItem('authToken'); // Rimuove il token dalla sessione
      sessionStorage.removeItem('role'); // Rimuove il ruolo dalla sessione
      sessionStorage.removeItem('email'); // Rimuove l'email dalla sessione
    }
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.userEmail = null;
    this.router.navigate(['/login']); // Reindirizza al login
  }

  toggleMenu(nav: HTMLElement, hamburger: HTMLElement) {
    nav.classList.toggle('active'); // Mostra o nasconde il menu
    hamburger.classList.toggle('active'); // Anima l'icona hamburger
  }
}
