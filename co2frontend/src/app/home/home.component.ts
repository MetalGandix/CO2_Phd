import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authStateService: AuthStateService) {}

  ngOnInit() {
    // Sottoscrivi lo stato di autenticazione dal servizio
    this.authStateService.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isAuthenticated = isAuthenticated)
    );

    // Oppure verifica direttamente da sessionStorage (meno consigliato)
    const token = sessionStorage.getItem('authToken');
    this.isAuthenticated = !!token;
  }
}
