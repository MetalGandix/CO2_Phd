import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Co2Service } from '../services/co2.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  users: any[] = []; // Tutti gli utenti
  co2Data: any[] = []; // Tutti i dati CO₂
  filteredCo2Data: any[] = []; // Dati CO₂ filtrati per utente
  filterUserId: string = ''; // ID utente per filtro
  activeTab: string = 'users'; // Tab attivo

  // Paginazione utenti
  currentPageUsers: number = 1;
  itemsPerPageUsers: number = 10;
  paginatedUsers: any[] = [];
  totalPagesUsers: number = 0;

  // Paginazione CO₂
  currentPageCo2: number = 1;
  itemsPerPageCo2: number = 10;
  paginatedCo2Data: any[] = [];
  totalPagesCo2: number = 0;

  constructor(private co2Service: Co2Service) {}

  fetchAllUsers() {
    this.co2Service.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.updatePaginatedUsers();
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
        this.updatePaginatedCo2();
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
        this.fetchAllCo2();
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
        this.fetchAllUsers();
      },
      error: (error) => {
        console.error(`Error deleting user with ID ${userId}:`, error);
      },
    });
  }

  exportToExcel() {
    const usersSheet = XLSX.utils.json_to_sheet(this.users);
    const co2Sheet = XLSX.utils.json_to_sheet(this.co2Data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, usersSheet, 'Users');
    XLSX.utils.book_append_sheet(workbook, co2Sheet, 'CO2 Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Report_CO2_Tracker.xlsx');
  }

  updatePaginatedUsers() {
    this.totalPagesUsers = Math.ceil(this.users.length / this.itemsPerPageUsers);
    const startIndex = (this.currentPageUsers - 1) * this.itemsPerPageUsers;
    const endIndex = startIndex + this.itemsPerPageUsers;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  updatePaginatedCo2() {
    this.totalPagesCo2 = Math.ceil(this.co2Data.length / this.itemsPerPageCo2);
    const startIndex = (this.currentPageCo2 - 1) * this.itemsPerPageCo2;
    const endIndex = startIndex + this.itemsPerPageCo2;
    this.paginatedCo2Data = this.co2Data.slice(startIndex, endIndex);
  }

  prevPage(type: string) {
    if (type === 'users' && this.currentPageUsers > 1) {
      this.currentPageUsers--;
      this.updatePaginatedUsers();
    } else if (type === 'co2' && this.currentPageCo2 > 1) {
      this.currentPageCo2--;
      this.updatePaginatedCo2();
    }
  }

  nextPage(type: string) {
    if (type === 'users' && this.currentPageUsers < this.totalPagesUsers) {
      this.currentPageUsers++;
      this.updatePaginatedUsers();
    } else if (type === 'co2' && this.currentPageCo2 < this.totalPagesCo2) {
      this.currentPageCo2++;
      this.updatePaginatedCo2();
    }
  }
}
