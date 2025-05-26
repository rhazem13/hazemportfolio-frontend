import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ThemeService } from './services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ThemeService],
};
