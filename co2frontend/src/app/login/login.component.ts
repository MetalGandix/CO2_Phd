import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

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

  constructor(private authService: AuthService, private router: Router, private errorService: ErrorService, private toolbar: ToolbarComponent) {}

  ngOnInit(): void {
    this.errorMessage = this.errorService.getErrorMessage();
    this.errorService.clearErrorMessage(); // Cancella il messaggio di errore dopo averlo mostrato
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Per favore, compila tutti i campi.';
      return;
    }

    this.isLoading = true; // Mostra lo spinner
  
    const loginData = { email: this.email, password: this.password };
  
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
  
        // Salva il token, l'ID utente e il ruolo nel sessionStorage
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('userId', response.userId);
        sessionStorage.setItem('role', response.role); // Salva il ruolo
        sessionStorage.setItem('email', this.email);
  
        this.errorMessage = '';
        this.isLoading = false; // Nascondi lo spinner
        this.router.navigate(['/co2-input']).then(() => {
          this.toolbar.checkAuthentication();
        });
      },
      error: (error) => {
        console.error('Errore durante il login:', error);
        this.errorMessage = 'Credenziali non valide. Riprova.';
        this.isLoading = false;
      },
    });
  }
}