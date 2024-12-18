import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  age: number | null = null;
  gender: string = '';
  residence: string = '';
  education: string = '';
  isStudying: boolean | null = null;
  newEducation: string = '';
  successMessage: string = ''; // Messaggio di successo
  errorMessage: string = ''; // Messaggio di errore

  constructor(private authService: AuthService, private router: Router) {} // Inietta il servizio

  onRegister() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.isEmailValid(this.email)) {
      this.errorMessage = 'Inserisci un\'email valida.';
      return;
    }

    if (!this.isPasswordValid(this.password)) {
      this.errorMessage = 'La password deve avere almeno 8 caratteri, una lettera maiuscola e un carattere alfanumerico.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Le password non corrispondono.';
      return;
    }

    if (!this.age || !this.gender || !this.residence || !this.education) {
      this.errorMessage = 'Compila tutti i campi richiesti.';
      return;
    }

    const userData = {
      email: this.email,
      password: this.password,
      age: this.age,
      gender: this.gender,
      residence: this.residence,
      education: this.education,
      isStudying: this.isStudying,
      newEducation: this.isStudying ? this.newEducation : null,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Registrazione completata:', response);
        this.successMessage = 'Registrazione completata con successo!';
        this.errorMessage = '';
        this.router.navigate(['/co2-input']);
      },
      error: (error) => {
        console.error('Errore durante la registrazione:', error);
        if (error.status === 409) {
          this.errorMessage = 'L\'email è già registrata.';
        } else {
          this.errorMessage = 'Errore durante la registrazione. Riprova.';
        }
        this.successMessage = '';
      },
    });
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
}
