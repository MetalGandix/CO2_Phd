import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  onSubmit() {
    if (this.dataAmount !== null && this.dataUnit) {
      // Conversione in CO2
      const conversionRate = this.conversionRates[this.dataUnit];
      this.co2Result = this.dataAmount * conversionRate;

      // Ottieni la data corrente formattata
      const now = new Date();
      this.currentDate = now.toLocaleDateString();

      // Crea un oggetto JSON con l'ID utente incluso
      const resultJson = {
        idUtente: this.userId, // Può essere null o popolato in seguito
        valore: this.dataAmount,
        unità: this.dataUnit,
        CO2: this.co2Result,
        data: this.currentDate,
      };

      // Stampa l'oggetto JSON nel console log
      console.log(resultJson);
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  }
}
