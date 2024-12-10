import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  constructor(private authService: AuthService) {} // Inietta il servizio

  onRegister() {
    if (!this.isEmailValid(this.email)) {
      alert('Inserisci un\'email valida.');
      return;
    }

    if (!this.isPasswordValid(this.password)) {
      alert('La password deve avere almeno 8 caratteri, una lettera maiuscola e un carattere alfanumerico.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Le password non corrispondono.');
      return;
    }

    if (!this.age || !this.gender || !this.residence || !this.education) {
      alert('Compila tutti i campi richiesti.');
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
        alert('Registrazione completata con successo!');
      },
      error: (error) => {
        console.error('Errore durante la registrazione:', error);
        alert('Errore durante la registrazione. Riprova.');
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
