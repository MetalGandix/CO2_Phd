import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tips',
  imports: [FormsModule, CommonModule],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent {
  tips = [
    {
      title: 'Usa i mezzi pubblici',
      description: 'Riduci le emissioni di CO₂ utilizzando autobus o treni invece dell’auto.',
    },
    {
      title: 'Riduci l’uso della plastica',
      description: 'Opta per alternative riutilizzabili come borracce e borse in tessuto.',
    },
    {
      title: 'Spegni le luci',
      description: 'Risparmia energia spegnendo le luci quando esci da una stanza.',
    },
    {
      title: 'Pianta un albero',
      description: 'Contribuisci a compensare le emissioni piantando alberi.',
    },
    {
      title: 'Compra locale',
      description: 'Riduci le emissioni scegliendo prodotti locali per evitare trasporti lunghi.',
    },
  ];
}
