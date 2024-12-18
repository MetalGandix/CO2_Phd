import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Co2Service } from '../services/co2.service';

@Component({
  selector: 'app-co2-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './co2-input.component.html',
  styleUrl: './co2-input.component.css',
})
export class Co2InputComponent {
  dataAmount: number | null = null; // Consumo di dati inserito dall'utente
  dataUnit: 'Mb' | 'Gb' = 'Gb'; // Tipo esplicito per l'unità selezionata
  co2Result: number | null = null; // Risultato della conversione in CO2
  currentDate: string = ''; // Data corrente
  userId: string | null = null; // ID dell'utente, inizialmente vuoto
  successMessage: string = ""; // Messaggio di successo

  equivalences = [
    { max: 10, text: "Equivale a un viaggio in auto di 50 km." },
    { max: 20, text: "Equivale a caricare uno smartphone per un anno." },
    { max: 50, text: "Equivale a un viaggio in auto di 200 km." },
    { max: 100, text: "Equivale all'uso di un laptop per un mese." },
    { max: 150, text: "Equivale a tre ore di volo su un aereo commerciale." },
    { max: 200, text: "Equivale all'uso di un forno elettrico per due mesi." },
    { max: 300, text: "Equivale a un viaggio in treno da Roma a Berlino." },
    { max: 400, text: "Equivale al consumo di una lampadina LED per cinque anni." },
    { max: 500, text: "Equivale all'uso di un frigorifero per un anno." },
    { max: 600, text: "Equivale a fare 10 lavatrici con acqua calda." },
    { max: 700, text: "Equivale al consumo energetico di un router Wi-Fi per tre anni." },
    { max: 800, text: "Equivale a un mese di riscaldamento domestico medio." },
    { max: 900, text: "Equivale a guardare 400 ore di streaming in HD." },
    { max: 1000, text: "Equivale a un viaggio andata e ritorno in auto da Milano a Napoli." },
    { max: 1200, text: "Equivale a lasciare il computer acceso per un anno." },
    { max: 1400, text: "Equivale a cucinare con un forno elettrico per 50 ore." },
    { max: 1600, text: "Equivale all'energia consumata da una famiglia in una settimana." },
    { max: 1800, text: "Equivale a un anno di ricarica di un'auto elettrica per 10.000 km." },
    { max: 2000, text: "Equivale al consumo di energia di una casa per un mese." },
  ];

  errorMessage: string = ""; // Messaggio di errore

  constructor(private co2Service: Co2Service) { }

  onSubmit() {
    // Reset messaggi
    this.errorMessage = "";
    this.successMessage = "";
  
    // Validazione dei dati inseriti
    if (this.dataAmount !== null && this.dataAmount > 0 && this.dataAmount <= 2000 && this.dataUnit) {
      // Calcolo aggiornato della CO2
      this.co2Result = this.dataUnit === 'Mb'
        ? (this.dataAmount / 1024) * 0.02 * 475
        : this.dataAmount * 0.02 * 475;
  
      // Aggiunta della data corrente
      const now = new Date();
      this.currentDate = now.toISOString();
  
      // Creazione del payload per salvare i dati
      const co2Data = {
        user_id: sessionStorage.getItem('userId'),
        co2_amount: this.co2Result,
        date: this.currentDate,
      };
  
      // Salvataggio dei dati e gestione della risposta
      this.co2Service.saveCo2Data(co2Data).subscribe({
        next: (response) => {
          this.co2Result = response.co2_amount; // Aggiorna il risultato
          this.successMessage = "CO₂ salvata!"; // Mostra il messaggio di successo
          this.errorMessage = ''; // Resetta eventuali errori
        },
        error: (err) => {
          console.error('Errore durante il salvataggio dei dati:', err);
          if (err.status === 409) {
            // Errore specifico: già presente un dato CO2 per oggi
            this.errorMessage = 'Hai già inserito un valore di CO₂ per oggi.';
          } else {
            this.errorMessage = 'Errore durante il salvataggio dei dati. Riprova.';
          }
        },
      });
    } else {
      if (this.dataAmount !== null && this.dataAmount > 2000) {
        this.errorMessage = "Devi rimanere nei limiti di 2000 GB.";
      } else {
        this.errorMessage = "Per favore, compila tutti i campi correttamente.";
      }
    }
  }

  getEquivalence(): string {
    // Determina l'equivalenza basata sul risultato della CO2
    if (this.co2Result !== null) {
      for (const equivalence of this.equivalences) {
        if (this.co2Result <= equivalence.max) {
          return equivalence.text;
        }
      }
    }
    return "";
  }
}
