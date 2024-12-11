import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Per favore, compila tutti i campi.';
      return;
    }

    const loginData = { email: this.email, password: this.password };

    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);

        // Salva il token e l'ID utente nel sessionStorage
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('userId', response.userId);

        this.errorMessage = '';
        this.router.navigate(['/co2-input']).then(() => {
          window.location.reload(); // Ricarica la pagina per aggiornare la toolbar
        });
      },
      error: (error) => {
        console.error('Errore durante il login:', error);
        this.errorMessage = 'Credenziali non valide. Riprova.';
      },
    });
  }
}
