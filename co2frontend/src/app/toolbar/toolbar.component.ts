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

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthentication(); // Controlla lo stato di autenticazione durante l'inizializzazione
  }

  checkAuthentication() {
    if (typeof window !== 'undefined' && sessionStorage) {
      // Verifica se il token esiste
      const token = sessionStorage.getItem('authToken');
      this.isAuthenticated = !!token; // Converte il token in un booleano
    } else {
      // Imposta come non autenticato se non siamo nel contesto del browser
      this.isAuthenticated = false;
    }
  }

  logout() {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.removeItem('authToken'); // Rimuove il token dalla sessione
    }
    this.isAuthenticated = false;
    this.router.navigate(['/login']); // Reindirizza al login
  }
  toggleMenu(nav: HTMLElement, hamburger: HTMLElement) {
    nav.classList.toggle('active'); // Mostra o nasconde il menu
    hamburger.classList.toggle('active'); // Anima l'icona hamburger
  }
}
