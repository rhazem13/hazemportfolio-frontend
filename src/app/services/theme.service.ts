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
        document.addEventListener(
          'DOMContentLoaded',
          () => this.initializeTheme(),
          { once: true },
        );
      } else {
        this.initializeTheme();
      }
    }
  }

  private initializeTheme(): void {
    this.applyTheme(this.getInitialTheme());

    // Listen for system theme changes
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!this.getStoredTheme()) {
            this.applyTheme(e.matches);
          }
        });
    }
  }

  private getInitialTheme(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // First check localStorage
      const savedTheme = this.getStoredTheme();
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

  private getStoredTheme(): string | null {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      if (error instanceof DOMException) {
        return null;
      }
      throw error;
    }
  }

  setDarkTheme(isDark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (error) {
      if (!(error instanceof DOMException)) {
        throw error;
      }
    }

    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);

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
