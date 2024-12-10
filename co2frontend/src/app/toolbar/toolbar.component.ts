import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  toggleMenu(nav: HTMLElement, hamburger: HTMLElement) {
    nav.classList.toggle('active'); // Mostra o nasconde il menu
    hamburger.classList.toggle('active'); // Anima l'icona hamburger
  }
}
