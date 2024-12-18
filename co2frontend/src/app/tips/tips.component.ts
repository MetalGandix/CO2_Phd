import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tips',
  imports: [FormsModule, CommonModule],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css',
})
export class TipsComponent {
  tips = [
    {
      title: 'Non moltiplicare le comunicazioni interne',
      description: 'Evita l’invio di email o messaggi inutili o la duplicazione di messaggi tra i membri del team.',
    },
    {
      title: 'Archiviare articoli e materiali non organizzati',
      description: 'Mantieni gli archivi ordinati e cancella file obsoleti per risparmiare spazio e risorse.',
    },
    {
      title: 'Inviare allegati pesanti via email',
      description: 'Usa link a piattaforme di condivisione sicure come Drive o Dropbox invece di inviare file pesanti.',
    },
    {
      title: 'Non ottimizzare il formato dei file',
      description: 'Riduci la qualità di immagini e grafici per bozze e revisioni per risparmiare energia.',
    },
    {
      title: 'Eccessivo uso del cloud per backup frequenti',
      description: 'Evita backup automatici troppo frequenti nel cloud per i file in lavorazione.',
    },
    {
      title: 'Ripetere ricerche bibliografiche non mirate',
      description: 'Sii preciso nelle ricerche su database accademici per evitare duplicazioni e sprechi di tempo.',
    },
    {
      title: 'Stampare bozze inutili',
      description: 'Usa strumenti di annotazione digitale invece di stampare ogni revisione.',
    },
    {
      title: 'Includere risorse multimediali non ottimizzate',
      description: 'Usa video e animazioni compressi e riduci lo streaming quando possibile.',
    },
    {
      title: 'Attenzione a generare fotografie e video con AI',
      description: 'Generare contenuti con AI ha un alto impatto ambientale. Preferisci banche dati open access o scatta foto reali.',
    },
    {
      title: 'Apertura videocamera durante le videochiamate',
      description: 'Se non necessario, evita di aprire la videocamera per ridurre le emissioni operative.',
    },
    {
      title: 'Link per meeting',
      description: 'Riutilizza lo stesso link per i meeting per ridurre la duplicazione di dati.',
    },
    {
      title: 'Messaggistica di gruppo',
      description: 'Invia messaggi sintetici e completi per ridurre l’impatto energetico e di dati.',
    },
    {
      title: 'Recuperare le informazioni di gruppo',
      description: 'Usa la funzione di ricerca nei gruppi invece di riscrivere informazioni già condivise.',
    },
    {
      title: 'Impatto delle ricerche online',
      description: 'Ogni ricerca online ha un costo per il pianeta. Evita ricerche superflue e usa parole chiave specifiche.',
    },
    {
      title: 'Riduci il peso delle email',
      description: 'Comprimi i documenti, usa link ipertestuali invece di allegati, e svuota regolarmente il cestino delle email.',
    },
    {
      title: 'Evita l’inquinamento dormiente',
      description: 'Pulisci regolarmente la tua casella email e il cloud per ridurre il consumo di energia nei data center.',
    },
    {
      title: 'Limita lo streaming video',
      description: 'Scarica i contenuti che guardi spesso e usa lo streaming solo quando necessario.',
    },
    {
      title: 'Organizza una pulizia digitale',
      description: 'Coinvolgi il tuo team per ridurre i dati inutili, pulire il cloud e ottimizzare i dispositivi.',
    },
    {
      title: 'Sfrutta browser ecologici',
      description: 'Usa browser come Ecosia o Lilo per compensare il tuo impatto ambientale.',
    },
  ];
}
