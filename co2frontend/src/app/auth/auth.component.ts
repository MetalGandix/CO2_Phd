import { Component } from '@angular/core';
import { Co2Service } from '../co2.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

  deleteCo2Data(co2Id: string) {
    this.co2Service.deleteCo2Data(co2Id).subscribe({
      next: () => {
        console.log(`CO2 data with ID ${co2Id} deleted successfully.`);
        this.fetchAllCo2(); // Aggiorna la lista dei dati CO₂
      },
      error: (error) => {
        console.error(`Error deleting CO2 data with ID ${co2Id}:`, error);
      },
    });
  }
  
  deleteUser(userId: string) {
    this.co2Service.deleteUser(userId).subscribe({
      next: () => {
        console.log(`User with ID ${userId} deleted successfully.`);
        this.fetchAllUsers(); // Aggiorna la lista degli utenti
      },
      error: (error) => {
        console.error(`Error deleting user with ID ${userId}:`, error);
      },
    });
  }

  exportToExcel() {
    // Combina utenti e dati CO₂ in un unico oggetto
    const usersSheet = XLSX.utils.json_to_sheet(this.users);
    const co2Sheet = XLSX.utils.json_to_sheet(this.co2Data);

    // Crea un workbook e aggiungi i fogli
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, usersSheet, 'Users');
    XLSX.utils.book_append_sheet(workbook, co2Sheet, 'CO2 Data');

    // Scrive il file e lo scarica
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Report_CO2_Tracker.xlsx');
  }
}