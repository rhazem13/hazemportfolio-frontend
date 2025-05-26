import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./styles/navbar.component.scss'],
})
export class NavbarComponent {
  isDark = false;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme$.subscribe(
      (isDark) => (this.isDark = isDark)
    );
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
