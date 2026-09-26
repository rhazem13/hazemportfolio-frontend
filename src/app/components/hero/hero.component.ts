import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/hero.component.scss'],
})
export class HeroComponent {
  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.t(key);
  }
}
