import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onLogin() {
    if (this.username && this.password) {
      console.log('Login successful:', { username: this.username, password: this.password });
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  }
}