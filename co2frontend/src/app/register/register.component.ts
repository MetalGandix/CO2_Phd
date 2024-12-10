import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Le password non corrispondono.');
      return;
    }

    if (this.username && this.email && this.password) {
      console.log('Registrazione completata:', {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  }
}
