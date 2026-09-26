import { Component, HostListener, computed, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/navbar.component.scss'],
})
export class NavbarComponent {
  isDark = false;
  isMenuOpen = false;

  currentLang = computed(() => this.translationService.lang());

  constructor(
    private themeService: ThemeService,
    public translationService: TranslationService,
  ) {
    this.themeService.isDarkTheme$.subscribe(
      (isDark) => (this.isDark = isDark),
    );
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleLanguage() {
    this.translationService.toggleLanguage();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  closeMenuOnEscape(): void {
    this.closeMenu();
  }

  t(key: string): string {
    return this.translationService.t(key);
  }
}
