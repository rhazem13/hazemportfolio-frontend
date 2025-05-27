import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Wait for the document to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () =>
          this.initializeTheme()
        );
      } else {
        this.initializeTheme();
      }
    }
  }

  private initializeTheme(): void {
    const initialTheme = this.getInitialTheme();
    this.setDarkTheme(initialTheme);

    // Listen for system theme changes
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            this.setDarkTheme(e.matches);
          }
        });
    }
  }

  private getInitialTheme(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // First check localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }

      // Then check system preference
      if (window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return false;
  }

  setDarkTheme(isDark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Update state
    this.isDarkTheme.next(isDark);

    // Save to localStorage
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
      console.warn('Failed to save theme preference:', e);
    }

    // Update DOM
    requestAnimationFrame(() => {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    });
  }

  toggleTheme(): void {
    const currentTheme = this.isDarkTheme.value;
    this.setDarkTheme(!currentTheme);
  }
}
