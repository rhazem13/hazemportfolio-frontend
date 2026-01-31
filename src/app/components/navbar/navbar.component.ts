import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./styles/navbar.component.scss'],
})
export class NavbarComponent {
  isDark = false;

  // Translation signals
  currentLang = computed(() => this.translationService.lang());
  isRTL = computed(() => this.translationService.isRTL());

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

  t(key: string): string {
    return this.translationService.t(key);
  }
}
