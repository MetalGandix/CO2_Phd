import { Routes } from '@angular/router';
import { TipsComponent } from './tips/tips.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tips', component: TipsComponent },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'co2-input',
    loadComponent: () => import('./co2-input/co2-input.component').then((m) => m.Co2InputComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'myco2',
    loadComponent: () => import('./myco2/myco2.component').then((m) => m.Myco2Component),
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AuthComponent, canActivate: [AuthGuard] },
];
