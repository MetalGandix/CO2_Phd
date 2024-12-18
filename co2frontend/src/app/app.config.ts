import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()), // Abilita il routing basato su hash
    provideClientHydration(withEventReplay()), // Configura l'idratazione con "Event Replay"
    provideHttpClient(withFetch()), // Abilita il supporto per fetch
    AuthGuard, // Fornisce il servizio AuthGuard
  ],
};
