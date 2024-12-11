import { Component, OnInit } from '@angular/core';
import { Co2Service } from '../co2.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myco2',
  imports: [FormsModule, CommonModule],
  templateUrl: './myco2.component.html',
  styleUrls: ['./myco2.component.css']
})
export class Myco2Component implements OnInit {
  co2Data: any[] = []; // Contenitore per i dati CO₂ dell'utente
  userId: string | null = null; // ID dell'utente

  constructor(private co2Service: Co2Service) {}

  ngOnInit(): void {
    // Recupera l'ID utente dal sessionStorage
    this.userId = sessionStorage.getItem('userId');

    if (this.userId) {
      this.fetchUserCo2Data(this.userId);
    } else {
      console.error('ID utente non trovato nel sessionStorage');
    }
  }

  fetchUserCo2Data(userId: string): void {
    this.co2Service.getCo2ByUserId(userId).subscribe({
      next: (data) => {
        this.co2Data = data;
        console.log('Dati CO₂ per l\'utente:', this.co2Data);
      },
      error: (error) => {
        console.error('Errore durante il recupero dei dati CO₂:', error);
      }
    });
  }
}
