import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/about.component.scss'],
})
export class AboutComponent {
  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.t(key);
  }
}
