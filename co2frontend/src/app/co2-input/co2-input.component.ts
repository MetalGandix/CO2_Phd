import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { AuthService } from '../auth.service';
import { Co2Service } from '../co2.service';

@Component({
  selector: 'app-co2-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './co2-input.component.html',
  styleUrl: './co2-input.component.css'
})
export class Co2InputComponent {
  dataAmount: number | null = null; // Consumo di dati inserito dall'utente
  dataUnit: 'Kb' | 'Mb' | 'Gb' = 'Kb'; // Tipo esplicito per l'unità selezionata
  co2Result: number | null = null; // Risultato della conversione in CO2
  currentDate: string = ''; // Data corrente
  userId: string | null = null; // ID dell'utente, inizialmente vuoto

  // Fattori di conversione
  conversionRates = {
    Kb: 0.00002,
    Mb: 0.02,
    Gb: 20,
  };

  constructor(private co2Service: Co2Service) {}

  onSubmit() {
    if (this.dataAmount !== null && this.dataUnit) {
      const conversionRate = this.conversionRates[this.dataUnit];
      this.co2Result = this.dataAmount * conversionRate;
  
      const now = new Date();
      this.currentDate = now.toISOString();
  
      const co2Data = {
        user_id: sessionStorage.getItem('userId'),
        co2_amount: this.co2Result,
        date: this.currentDate,
      };
  
      this.co2Service.saveCo2Data(co2Data).subscribe({
        next: (response) => {
          console.log('Dati salvati con successo:', response);
          alert('Dati salvati con successo!');
        },
        error: (err) => {
          console.error('Errore durante il salvataggio dei dati:', err);
          // Gestisci messaggi non JSON
          if (err.error instanceof Object) {
            alert(`Errore: ${err.error.error || 'Errore sconosciuto'}`);
          } else {
            alert('Errore durante il salvataggio dei dati. Riprova.');
          }
        },
      });
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  }
}
