import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { AuthStateService } from '../services/auth-state.service';

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
  isLoading: boolean = false; // Controlla lo spinner

  constructor(private authService: AuthService, private router: Router, private errorService: ErrorService, private authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.errorMessage = this.errorService.getErrorMessage();
    this.errorService.clearErrorMessage(); // Cancella il messaggio di errore dopo averlo mostrato
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Per favore, compila tutti i campi.';
      return;
    }
  
    this.isLoading = true;
  
    const loginData = { email: this.email, password: this.password };
  
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
  
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('role', response.role);
        sessionStorage.setItem('email', this.email);
        sessionStorage.setItem('userId', response.userId);
  
        // Aggiorna lo stato dell'autenticazione
        this.authStateService.updateAuthState(true, response.role === 'admin', this.email);
  
        this.isLoading = false;
        this.router.navigate(['/co2-input']);
      },
      error: (error) => {
        console.error('Errore durante il login:', error);
        this.errorMessage = 'Credenziali non valide. Riprova.';
        this.isLoading = false;
      },
    });
  }
}