import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./styles/hero.component.scss'],
})
export class HeroComponent {
  heroImageLoaded = false;

  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.t(key);
  }

  onHeroImageLoad(): void {
    this.heroImageLoaded = true;
  }
}
