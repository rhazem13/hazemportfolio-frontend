import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

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

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme$.subscribe(
      (isDark) => (this.isDark = isDark),
    );
  }

  toggleTheme() {
    this.themeService.toggleTheme();
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

}
