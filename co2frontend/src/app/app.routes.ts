import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { Co2InputComponent } from './co2-input/co2-input.component';
import { TipsComponent } from './tips/tips.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'co2-input', component: Co2InputComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
