import { Component } from '@angular/core';
import { Co2Service } from '../co2.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [CommonModule,FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  users: any[] = []; // Contenitore per tutti gli utenti
  co2Data: any[] = []; // Contenitore per tutti i dati CO2
  filteredCo2Data: any[] = []; // Contenitore per i dati CO2 filtrati
  filterUserId: string = ''; // ID utente per il filtro
  activeTab: string = 'users'; // Imposta il tab attivo iniziale

  constructor(private co2Service: Co2Service) {}

  fetchAllUsers() {
    this.co2Service.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('All users:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  fetchAllCo2() {
    this.co2Service.getAllCo2().subscribe({
      next: (co2) => {
        this.co2Data = co2;
        console.log('All CO2 data:', this.co2Data);
      },
      error: (error) => {
        console.error('Error fetching CO2 data:', error);
      }
    });
  }

  fetchCo2ForUser() {
    if (!this.filterUserId.trim()) {
      console.warn('User ID is required to filter CO2 data');
      return;
    }

    this.co2Service.getCo2ByUserId(this.filterUserId).subscribe({
      next: (co2Data) => {
        this.filteredCo2Data = co2Data;
        console.log(`CO2 data for user ${this.filterUserId}:`, this.filteredCo2Data);
      },
      error: (error) => {
        console.error(`Error fetching CO2 data for user ${this.filterUserId}:`, error);
      }
    });
  }
}